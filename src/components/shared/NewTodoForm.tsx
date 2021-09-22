import { useState, VFC, FormEvent, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "src/components/shared/Button";
import { styled } from "src/styles/stitches.config";

export const NewTodoForm: VFC = () => {
  const queryClient = useQueryClient();
  const [todoTitle, setTodoTitle] = useState({
    tag: "✅",
    name: "",
  });
  const [todo, setTodo] = useState({
    title: `${todoTitle.tag} ${todoTitle.name}`,
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
    setTodoTitle({ tag: "✅", name: "" });
    setTodo({ title: "", content: "", type: "TODAY" });
    mutate();
  };

  useEffect(() => {
    setTodo({ ...todo, title: `${todoTitle.tag} ${todoTitle.name}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoTitle]);

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
        <Label>New TODO</Label>
        <Flex>
          <SelectTag
            name=""
            id=""
            value={todoTitle.tag}
            onChange={(e) =>
              setTodoTitle({ ...todoTitle, tag: e.target.value })
            }
          >
            <option value="✅">✅</option>
            <option value="🚀">🚀</option>
            <option value="🛍">🛍</option>
            <option value="🏥">🏥</option>
          </SelectTag>
          <Input
            size="md"
            type="text"
            id="todo"
            placeholder="go to XXX and buy XXX"
            value={todoTitle.name}
            onChange={(e) =>
              setTodoTitle({ ...todoTitle, name: e.target.value })
            }
          />
        </Flex>
      </FormBlock>
      <FormBlock>
        <Label>Comment</Label>
        <Input
          type="text"
          id="todo"
          placeholder="$100 , deadline:11-15 , etc."
          value={todo.content}
          onChange={(e) => setTodo({ ...todo, content: e.target.value })}
        />
      </FormBlock>
      <FormBlock>
        <Label>Type</Label>
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

const Flex = styled("div", {
  display: "flex",
});

const Label = styled("p", {
  margin: "0.4rem 0 0.2rem",
  fontSize: "0.8rem",
  color: "$gray10",
});

const SelectTag = styled("select", {
  border: "1px solid $gray8",
  width: "40px",
});

const Input = styled("input", {
  width: "300px",
  height: "1.2rem",
  padding: "0 4px",
  border: "1px solid $gray8",

  variants: {
    size: {
      md: {
        width: "260px",
      },
      lg: {
        width: "300px",
      },
    },
  },
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
