import { colors } from "@/constants/colors";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import CustomText, { FONT_WEIGHT } from "./CustomText";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  className,
}) => {
  return (
    <Pressable
      disabled={loading || disabled}
      className={`w-full bg-primary py-[20] rounded-[10px] items-center justify-center flex-row gap-[4] ${className}`}
      onPress={onPress}>
      <CustomText
        text={title}
        fontSize={20}
        fontWeight={FONT_WEIGHT.SEMI_BOLD}
        color={colors.white}
      />
      {loading && <ActivityIndicator size="small" color={colors.white} />}
    </Pressable>
  );
};

export default CustomButton;
