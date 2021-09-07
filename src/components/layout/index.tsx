import { VFC } from "react";
import { Header } from "src/components/layout/header";
import { styled } from "src/styles/stitches.config";

type Props = {
  children: React.ReactNode;
}

export const Layout: VFC<Props> = (props) => {
  return (
    <Container>
      <Header />
      <Main>
        {props.children}
      </Main>
    </Container>
  )
}

const Container = styled("div", {
  display: "grid",
  gap: "2rem",
  paddingY: "2rem",
  paddingLeft: "1.5rem",
  paddingRight: "1rem",
  marginX: "auto",
  maxWidth: "600px",
});

const Main = styled("main", {});