import { VFC } from "react";
import type { Task } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "src/components/shared/Button";
import { styled } from "src/styles/stitches.config";
import { EditModal } from "src/components/shared/Dialog";

export const TodoList: VFC = () => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery<Task[]>("todos", async () => {
    const res = await fetch("/api/v1/todos");

    return res.json();
  });

  const { mutate } = useMutation(
    (id: number) => {
      return fetch("/api/v1/todos", {
        method: "DELETE",
        body: JSON.stringify(id),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const deleteTodo = (todoId: number) => {
    if (confirm("完了したTODOを削除します。よろしいですか？")) {
      console.log("Delete");
      mutate(todoId);
    }
  };

  if (isLoading || !todos) return <div>Loading...</div>;
  if (todos?.length === 0) return <div>no todos</div>;

  const todaysTodo = todos.filter((todo) => todo.type === "TODAY");
  const nextTodo = todos.filter((todo) => todo.type === "NEXT");
  const laterTodo = todos.filter((todo) => todo.type === "LATER");

  return (
    <div>
      <Headline>TODAY&apos;S TODO</Headline>
      {todaysTodo.length === 0 ? (
        <p>no today&apos;s todos</p>
      ) : (
        todaysTodo.map((todo) => (
          <TaskItem key={todo.id}>
            <TaskContent>
              <TaskName>{todo.title}</TaskName>
              <TaskComment>
                <p>💬</p>
                <p>{todo.content}</p>
              </TaskComment>
            </TaskContent>
            <div>
              <Button onClick={() => deleteTodo(todo.id)}>Done</Button>
              <EditModal task={todo} />
            </div>
          </TaskItem>
        ))
      )}

      <Headline>NEXT DAY</Headline>
      {nextTodo.length === 0 ? (
        <p>no next todos</p>
      ) : (
        nextTodo.map((todo) => (
          <TaskItem key={todo.id}>
            <TaskContent>
              <TaskName>{todo.title}</TaskName>
              <TaskComment>
                <p>💬</p>
                <p>{todo.content}</p>
              </TaskComment>
            </TaskContent>
            <div>
              <Button onClick={() => deleteTodo(todo.id)}>Done</Button>
              <EditModal task={todo} />
            </div>
          </TaskItem>
        ))
      )}

      <Headline>LATER</Headline>
      {laterTodo.length === 0 ? (
        <p>no later todos</p>
      ) : (
        laterTodo.map((todo) => (
          <TaskItem key={todo.id}>
            <TaskContent>
              <TaskName>{todo.title}</TaskName>
              <TaskComment>
                <p>💬</p>
                <p>{todo.content}</p>
              </TaskComment>
            </TaskContent>
            <div>
              <Button onClick={() => deleteTodo(todo.id)}>Done</Button>
              <EditModal task={todo} />
            </div>
          </TaskItem>
        ))
      )}
    </div>
  );
};

const Headline = styled("h2", {
  color: "$teal11",
  marginBottom: "0",
});

const TaskItem = styled("div", {
  border: "1px solid $gray8",
  borderRadius: "1rem",
  padding: "0.5rem 0.8rem",
  margin: "0.5rem 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  [`${Button}+${Button}`]: {
    marginLeft: "0.3rem",
  },
});

const TaskContent = styled("div", {
  maxWidth: "75%",
});

const TaskName = styled("p", {
  margin: 0,
  marginBottom: "0.2rem",
});

const TaskComment = styled("span", {
  fontSize: "0.8rem",
  display: "flex",
  gap: "0.2rem",

  p: {
    margin: 0,
  },
});
