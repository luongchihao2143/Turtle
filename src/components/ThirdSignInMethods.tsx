import { APPLE, FACEBOOK, GOOGLE } from "@/constants/images";
import { Authentication } from "@/utils/authentication";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, View } from "react-native";
import CustomText, { FONT_WEIGHT } from "./CustomText";
import Space from "./Space";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const ThirdSignInMethods = () => {
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    GoogleSignin.signIn()
      .then(async (res) => {
        if (res?.data && res?.data?.idToken) {
          const googleCredential = auth.GoogleAuthProvider.credential(
            res?.data?.idToken,
          );
          const response = await auth().signInWithCredential(googleCredential);
          if (response.user) {
            Authentication.UpdateProfile(response.user);
            router.replace("/home");
          }
        }
      })
      .catch((err) => {
        console.error(
          "👊 -> ThirdSignInMethods -> handleSignInWithGoogle= -> err:",
          err,
        );
        Alert.alert("Error", err.message);
      });
  };

  return (
    <>
      <CustomText
        text="- Or login with -"
        fontSize={12}
        fontWeight={FONT_WEIGHT.MEDIUM}
        color="#575757"
      />
      <Space size={20} direction="horizontal" />
      <View className="flex-row justify-center items-center gap-[10] ">
        <Pressable
          onPress={handleSignInWithGoogle}
          className="rounded-full p-[16] bg-[#FCF3F6] border border-primary">
          <Image source={GOOGLE} className="w-[24] h-[24]" />
        </Pressable>
        <Pressable className="rounded-full p-[16] bg-[#FCF3F6] border border-primary">
          <Image source={APPLE} className="w-[24] h-[24]" />
        </Pressable>
        <Pressable className="rounded-full p-[16] bg-[#FCF3F6] border border-primary">
          <Image source={FACEBOOK} className="w-[24] h-[24]" />
        </Pressable>
      </View>
    </>
  );
};

export default ThirdSignInMethods;
