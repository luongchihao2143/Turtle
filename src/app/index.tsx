import { STORAGE_KEY } from "@/constants/asyncStorage";
import { Redirect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { storage } from "./_layout";
import React from "react";
import { setStatusBarStyle } from "expo-status-bar";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function Index() {
  const [isWelcome, setIsWelcome] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const checkIsWelcome = useCallback(async () => {
    const isFinishedOnboarding =
      storage.getBoolean(STORAGE_KEY.FINISHED_ON_BOARDING) || false;
    setIsWelcome(!isFinishedOnboarding);
  }, []);

  const onAuthStateChanged = (userState: FirebaseAuthTypes.User | null) => {
    setUser(userState);
    setInitializing(false);
  };

  useEffect(() => {
    checkIsWelcome();
  }, [checkIsWelcome]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  if (initializing) {
    return null;
  }

  if (isWelcome) {
    return <Redirect href={"/welcome"} />;
  }
  if (user?.email) {
    return <Redirect href={"/home"} />;
  }
  return <Redirect href={"/sign-in"} />;
}
