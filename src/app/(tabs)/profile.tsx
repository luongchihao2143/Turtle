import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { RootState } from "@/redux/store";
import { Authentication } from "@/utils/authentication";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await Authentication.Logout();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <CustomText text={`Hi ${user?.displayName}`} />
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
