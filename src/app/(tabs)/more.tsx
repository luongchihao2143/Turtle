import CustomButton from "@/components/CustomButton";
import { Authentication } from "@/utils/authentication";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const More = () => {
  const handleLogout = async () => {
    await Authentication.Logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text>Setting</Text>
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default More;
