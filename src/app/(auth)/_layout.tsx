import { useAppSelector } from "@/redux/hooks";
import { Redirect, Stack } from "expo-router";
import React from "react";
const AuthLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  if (authState.isLoggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AuthLayout;
