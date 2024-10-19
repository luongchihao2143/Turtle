import CustomText from "@/components/CustomText";
import TabHeader from "@/components/TabHeader";
import React from "react";
import { View } from "react-native";

const Chat = () => {
  return (
    <View className="flex-1 bg-white">
      <TabHeader />
      <View className="flex-1 px-[24] w-full"></View>
    </View>
  );
};

export default Chat;
