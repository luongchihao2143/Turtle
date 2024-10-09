import { colors } from "@/constants/colors";
import { Entypo, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import CustomText, { FONT_WEIGHT } from "../CustomText";

interface CustomInputProps extends TextInputProps {
  containerClasses?: string;
  inputClasses?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    containerClasses,
    inputClasses,
    isPassword,
    icon,
    error,
    ...inputProps
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="w-full">
      <View
        className={`
      w-full 
      px-[12]
      bg-inputBackground
      rounded-[10px] 
      border-[1px] 
      border-inputBorder
      flex-row
      items-center
      ${containerClasses}`}>
        {(icon || isPassword) && (
          <View className="mr-[4]">
            {icon || <Entypo name="lock" size={24} color={colors.inputText} />}
          </View>
        )}
        <TextInput
          secureTextEntry={isPassword}
          className={`text-inputText py-[20] flex-1 ${inputClasses}`}
          {...inputProps}
        />
        {isPassword && (
          <View className="mr-[4]">
            <Octicons
              name={isPasswordVisible ? "eye-closed" : "eye"}
              size={24}
              color={colors.inputText}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </View>
        )}
      </View>
      {error && (
        <CustomText
          text={error}
          fontSize={12}
          fontWeight={FONT_WEIGHT.REGULAR}
          color="#ff0000"
          style={{ marginTop: 4 }}
        />
      )}
    </View>
  );
};

export default CustomInput;
