import type Stitches from "@stitches/react";

export const utils = {
  marginX: (value: Stitches.PropertyValue<`margin`>) => {
    return {
      marginLeft: value,
      marginRight: value,
    };
  },
  paddingY: (value: Stitches.PropertyValue<`padding`>) => {
    return {
      paddingTop: value,
      paddingBottom: value,
    };
  },
  size: (value: Stitches.PropertyValue<`width`>) => {
    return {
      width: value,
      height: value,
    };
  },
};
