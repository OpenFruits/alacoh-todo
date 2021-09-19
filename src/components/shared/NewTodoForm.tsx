import { useState, VFC, FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "src/components/shared/Button";
import { styled } from "src/styles/stitches.config";

export const NewTodoForm: VFC = () => {
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    type: "TODAY",
  });

  const { mutate } = useMutation(
    () => {
      return fetch("/api/v1/todos", {
        method: "POST",
        body: JSON.stringify(todo),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodo({ title: "", content: "", type: "TODAY" });
    mutate();
  };

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
    <FormContainer onSubmit={addTodo}>
      <FormBlock>
        <Label>todo name</Label>
        <Input
          type="text"
          id="todo"
          placeholder="go to XXX and buy XXX"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </FormBlock>
      <FormBlock>
        <Label>comment</Label>
        <Input
          type="text"
          id="todo"
          placeholder="$100 , deadline:11-15 , etc."
          value={todo.content}
          onChange={(e) => setTodo({ ...todo, content: e.target.value })}
        />
      </FormBlock>
      <FormBlock>
        <Label>type</Label>
        <SetTypeButton type="TODAY" />
        <SetTypeButton type="NEXT" />
        <SetTypeButton type="LATER" />
        <Button css={{ marginLeft: "1rem" }} type="submit">
          Add
        </Button>
      </FormBlock>
    </FormContainer>
  );
};

const FormContainer = styled("form", {
  border: "1px solid $gray8",
  padding: "10px",
  width: "320px",
});

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
