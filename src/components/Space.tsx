import React from "react";
import { View } from "react-native";

export interface SpaceProps {
  direction?: "horizontal" | "vertical";
  size: number;
}

const Space = ({ direction = "horizontal", size }: SpaceProps) => {
  return (
    <View
      style={{
        width: direction === "vertical" ? size : undefined,
        height: direction === "vertical" ? undefined : size,
      }}
    />
  );
};

export default Space;
