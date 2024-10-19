import { STORAGE_KEY } from "@/constants/asyncStorage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Redirect } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { storage } from "./_layout";
import { saveUser } from "@/redux/reducer/authSlice";

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

  const getInitialUser = useCallback(() => {
    const user = storage.getString(STORAGE_KEY.USER);
    if (user) {
      dispatch(saveUser(JSON.parse(user)));
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
    return null;
  }
  if (authState.isLoggedIn) {
    return <Redirect href={"/chat"} />;
  }
  return <Redirect href={"/sign-in"} />;
}
