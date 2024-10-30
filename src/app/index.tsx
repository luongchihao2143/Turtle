import { STORAGE_KEY } from "@/constants/asyncStorage";
import { colors } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { saveUser } from "@/redux/reducer/authSlice";
import { Authentication } from "@/utils";
import { Redirect } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { storage } from "./_layout";

export default function Index() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isWelcome, setIsWelcome] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const checkIsWelcome = useCallback(async () => {
    const isFinishedOnboarding =
      storage.getBoolean(STORAGE_KEY.FINISHED_ON_BOARDING) || false;
    setIsWelcome(!isFinishedOnboarding);
  }, []);

  const getInitialUser = useCallback(async () => {
    const user = await Authentication.FetchUser();
    if (user) {
      dispatch(saveUser(user));
    }
    setInitializing(false);
  }, [dispatch]);

  useEffect(() => {
    checkIsWelcome();
    getInitialUser();
  }, [checkIsWelcome, getInitialUser]);

  useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  if (isWelcome) {
    return <Redirect href={"/welcome"} />;
  }
  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (authState.isLoggedIn) {
    return <Redirect href={"/chat"} />;
  }
  return <Redirect href={"/sign-in"} />;
}
