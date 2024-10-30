import { colors } from "@/constants/colors";
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import CustomText, { FONT_WEIGHT } from "../CustomText";

interface CustomInputProps extends TextInputProps {
  containerClasses?: string;
  inputClasses?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
  isClearAllButton?: boolean;
  label?: string;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    containerClasses,
    inputClasses,
    isPassword,
    icon,
    error,
    isClearAllButton,
    label,
    onChangeText,
    ...inputProps
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onClearInput = () => {
    onChangeText && onChangeText("");
  };

  return (
    <View className="w-full">
      {label && (
        <CustomText
          color={colors.inputText}
          text={label}
          style={{ marginBottom: 4 }}
          fontSize={14}
          fontWeight={FONT_WEIGHT.REGULAR}
        />
      )}
      <View
        className={`
      w-full 
      px-[12]
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
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible}
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
        {!isPassword && isClearAllButton && inputProps?.value && (
          <View className="mr-[4]">
            <AntDesign
              name={"close"}
              size={16}
              color={colors.inputText}
              onPress={onClearInput}
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
