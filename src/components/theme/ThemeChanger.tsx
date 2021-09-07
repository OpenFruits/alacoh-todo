import { VFC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { styled } from "src/styles/stitches.config";

export const ThemeChamger: VFC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) null;

  const oppositeColor = resolvedTheme === "dark" ? "light" : "dark";
  const handleClick = () => setTheme(oppositeColor);


  return (
    <Button onClick={handleClick}>
      {resolvedTheme === "dark" ? "🌅" : "🌃"}
    </Button>
  );
};

const Button = styled("button", {
  fontSize: "2rem",
  size: "80px",
  cursor: "pointer"
})
