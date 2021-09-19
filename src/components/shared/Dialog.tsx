import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState, VFC } from "react";
import { styled, keyframes } from "src/styles/stitches.config";
import { blackA } from "@radix-ui/colors";
import { Button } from "src/components/shared/Button";
import type { Task } from "@prisma/client";
import { useQueryClient, useMutation } from "react-query";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const DialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "320px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: "transform",
  },
  "&:focus": { outline: "none" },
});

const DialogTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  fontSize: 17,
});

const DialogDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  fontSize: 15,
  lineHeight: 1.5,
});

const IconButton = styled("button", {
  all: "unset",
  fontSize: "2rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 10,
  right: 24,
  cursor: "pointer",
});

type Props = {
  task: Task;
};

export const EditModal: VFC<Props> = (props) => {
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState({
    id: props.task.id,
    title: props.task.title,
    content: props.task.content,
    type: props.task.type,
  });

  const { mutate } = useMutation(
    () => {
      return fetch("/api/v1/todos", {
        method: "PUT",
        body: JSON.stringify(todo),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const updateTodo = () => mutate();

  const SetTypeButton: VFC<{ type: string }> = (props) => {
    return (
      <SelectType
        onClick={() => setTodo({ ...todo, type: props.type })}
        selected={todo.type === props.type}
      >
        {props.type}
      </SelectType>
    );
  };

  return (
    <DialogPrimitive.Root>
      <StyledOverlay />
      <DialogPrimitive.Trigger asChild>
        <Button>Edit</Button>
      </DialogPrimitive.Trigger>
      <DialogContent>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogDescription>Make changes to your task here.</DialogDescription>
        <FormBlock>
          <Label>todo name</Label>
          <Input
            type="text"
            id="todo"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </FormBlock>
        <FormBlock>
          <Label>comment</Label>
          <Input
            type="text"
            id="todo"
            value={todo.content || ""}
            onChange={(e) => setTodo({ ...todo, content: e.target.value })}
          />
        </FormBlock>
        <FormBlock>
          <Label>type</Label>
          <SetTypeButton type="TODAY" />
          <SetTypeButton type="NEXT" />
          <SetTypeButton type="LATER" />
          <DialogPrimitive.Close asChild>
            <Button
              onClick={updateTodo}
              css={{ marginLeft: "1rem" }}
              type="submit"
            >
              Update
            </Button>
          </DialogPrimitive.Close>
        </FormBlock>
        <DialogPrimitive.Close asChild>
          <IconButton>×</IconButton>
        </DialogPrimitive.Close>
      </DialogContent>
    </DialogPrimitive.Root>
  );
};

const Label = styled("p", {
  margin: 0,
  fontSize: "0.8rem",
  color: "$gray10",
});

const Input = styled("input", {
  width: "300px",
  height: "1rem",
  padding: "0 4px",
  resize: "none",
  border: "1px solid $gray8",
});

const SelectType = styled("button", {
  fontSize: "0.8rem",
  padding: "0.3rem 0.5rem",
  marginTop: "4px",
  border: "1px solid $gray8",
  backgroundColor: "$gray2",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$teal4",
  },

  variants: {
    selected: {
      true: {
        backgroundColor: "$teal7",
      },
    },
  },
});

const FormBlock = styled("div", {
  margin: "0.2rem 0",

  [`& ${SelectType}+${SelectType}`]: {
    borderLeft: "none",
  },
});
