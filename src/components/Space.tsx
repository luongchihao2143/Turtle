import { View, Text } from "react-native";
import React from "react";
import { colors } from "@/constants/colors";

export interface SpaceProps {
  direction?: "horizontal" | "vertical";
  size: number;
}

const Space = ({ direction = "horizontal", size }: SpaceProps) => {
  return (
    <View
      style={{
        width: direction === "vertical" ? size : "100%",
        height: direction === "vertical" ? "100%" : size,
        backgroundColor: colors.primaryText,
      }}
    />
  );
};

export default Space;
