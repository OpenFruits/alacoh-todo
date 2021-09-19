import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import { Layout } from "src/components/layout";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { NewTodoForm } from "src/components/shared/NewTodoForm";
import { TodoList } from "src/components/shared/TodoList";
import { ThemeChamger } from "src/components/theme/ThemeChanger";
import { styled } from "src/styles/stitches.config";

const Home: NextPage = () => {
  const [session, loading] = useSession();

  if (loading) return <Layout>スケルトンろーでぃんぐ！！</Layout>;

  return (
    <Layout>
      {!session && (
        <div>
          <p>サインインしてください</p>
          <button onClick={() => signIn("line")}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          <Header>
            <Avatar
              userName={session.user?.name as string}
              avatarImage={session.user?.image as string}
            />
            <Button onClick={() => signOut()}>Sign Out</Button>
            <ThemeChamger />
          </Header>
          <NewTodoForm />
          <TodoList />
        </div>
      )}
    </Layout>
  );
};

const Header = styled("div", {
  display: "flex",
  gap: "2rem",
  alignItems: "center",
});

export default Home;
