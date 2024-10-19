import { colors } from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText, { FONT_WEIGHT } from "./CustomText";

interface TabHeaderProps {
  title: string;
}

const TabHeader = ({ title }: TabHeaderProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: top + 12 }}
      className="w-full items-center justify-between flex-row bg-primary px-[24] pb-[28]">
      <CustomText
        text={title}
        color={colors.white}
        fontWeight={FONT_WEIGHT.BOLD}
        fontSize={22}
      />

      <View className="flex-1 items-center justify-end flex-row gap-x-[8]">
        <Pressable>
          <AntDesign name="search1" size={24} color="white" />
        </Pressable>
        <Pressable>
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default TabHeader;
