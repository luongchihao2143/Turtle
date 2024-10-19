import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import TabHeader from "@/components/TabHeader";
import { RootState } from "@/redux/store";
import { Authentication } from "@/utils/authentication";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await Authentication.Logout();
  };
  return (
    <View className="flex-1 bg-white">
      <TabHeader title="Profile" />
      <View className="flex-1 items-center justify-center">
        <CustomText text={`Hi ${user?.displayName}`} />
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;
