import { styled } from "src/styles/stitches.config";

export const Button = styled("button", {
  color: "$gray12",
  backgroundColor: "$gray2",
  fontSize: "0.8rem",
  fontWeight: "bold",
  padding: "0.5rem",
  borderRadius: 50,
  border: "3px solid $teal11",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$teal9",
  },
});
