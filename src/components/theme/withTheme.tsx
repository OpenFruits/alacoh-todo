import type { CustomAppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import type { VFC } from "react";
import { useEffect } from "react";
import { dark } from "../../styles/dark";

type AppPage = (props: CustomAppProps) => JSX.Element;

export const withTheme = (Component: AppPage) => {
  const WithTheme = (props: CustomAppProps) => {
    return (
      <ThemeProvider attribute="class" value={{ light: "light", dark }}>
        <InitTheme>
          <Component {...props} />
        </InitTheme>
      </ThemeProvider>
    );
  };

  return WithTheme;
};

const InitTheme: VFC<{ children: JSX.Element }> = (props) => {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.setAttribute("class", resolvedTheme ?? "");
  }, [resolvedTheme]);

  return props.children;
};