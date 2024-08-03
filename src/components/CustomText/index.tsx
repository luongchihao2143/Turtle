import { View, Text, TextProps, ColorValue } from "react-native";
import React from "react";
import { colors } from "@/constants/colors";

export enum FONT_WEIGHT {
  THIN = "Thin",
  EXTRA_LIGHT = "ExtraLight",
  LIGHT = "Light",
  REGULAR = "Regular",
  MEDIUM = "Medium",
  SEMI_BOLD = "SemiBold",
  BOLD = "Bold",
  EXTRA_BOLD = "ExtraBold",
  BLACK = "Black",
}

interface CustomTextProps extends TextProps {
  fontWeight?: FONT_WEIGHT;
  fontName?: "Montserrat";
  text?: string;
  color?: ColorValue;
  fontSize?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
}

const CustomText = (props: CustomTextProps) => {
  const {
    fontWeight: fontWeightProps = FONT_WEIGHT.MEDIUM,
    fontName = "Montserrat",
    color = colors.primaryText,
    fontSize,
    text,
    children,
    style,
    textAlign,
  } = props;

  const fontFamily = `${fontName}-${fontWeightProps}`;

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily,
          color,
          fontSize,
          textAlign,
        },
        style,
      ]}>
      {text || children}
    </Text>
  );
};

export default CustomText;
