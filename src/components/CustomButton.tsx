import { colors } from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import CustomText, { FONT_WEIGHT } from "./CustomText";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  className,
  icon,
  variant = "primary",
  containerStyle,
}) => {
  return (
    <Pressable
      disabled={loading || disabled}
      style={[
        {
          backgroundColor:
            variant === "primary" ? colors.primary : colors.white,
          borderWidth: variant === "secondary" ? 1 : 0,
          borderColor: variant === "secondary" ? colors.primary : "transparent",
        },
        containerStyle,
      ]}
      className={`w-full py-[20] rounded-[10px] items-center justify-center flex-row gap-[4] ${className}`}
      onPress={onPress}>
      {icon && icon}
      <CustomText
        text={title}
        fontSize={16}
        fontWeight={FONT_WEIGHT.SEMI_BOLD}
        color={variant === "primary" ? colors.white : colors.primary}
      />
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? colors.white : colors.primary}
        />
      )}
    </Pressable>
  );
};

export default CustomButton;
