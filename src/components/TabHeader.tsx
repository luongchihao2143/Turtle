import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabHeader = () => {
  const { top } = useSafeAreaInsets();

  const onBack = () => {
    router.back();
  };

  return (
    <View
      style={{ paddingTop: top }}
      className="w-full items-center justify-between flex-row bg-primary">
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 100, height: 30 }}
      />
    </View>
  );
};

export default TabHeader;
