import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

const Setting = () => {
  const handleLogout = async () => {
    await auth().signOut();
    router.replace("/sign-in");
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

export default Setting;
