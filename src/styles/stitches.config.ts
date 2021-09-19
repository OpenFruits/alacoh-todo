import { createStitches } from "@stitches/react";
import { colors } from "./colors";
import { utils } from "./utils";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
} = createStitches({
  utils,
  media: {
    bp1: "(min-width: 480px)",
    bp2: "(min-width: 800px)",
  },
  theme: {
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
      4: "20px",
    },
    colors,
  },
});

globalCss({
  html: { fontSize: "$4" },
  "@bp1": { html: { fontSize: "$4" } },
  body: {
    lineHeight: 1,
    color: "$gray12",
    backgroundColor: "$gray2",

    li: {
      listStyle: "none",
    },
  },
})();
