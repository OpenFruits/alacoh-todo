import { VFC } from "react";
import { ThemeChamger } from "src/components/theme/ThemeChanger";
import { styled } from "src/styles/stitches.config";

export const Header: VFC = () => {
  return (
    <Container>
      <H1>Alacoh TODO</H1>
      <div>
        <ThemeChamger />
      </div>
    </Container>
  )
}

const Container = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  gap: "2rem"
})

const H1 = styled("h1", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  margin: 0
})

