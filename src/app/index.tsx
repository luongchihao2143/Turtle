import { STORAGE_KEY } from "@/constants/asyncStorage";
import { Redirect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { storage } from "./_layout";

export default function Index() {
  const [isWelcome, setIsWelcome] = useState(true);

  const checkIsWelcome = useCallback(async () => {
    const isFinishedOnboarding =
      storage.getBoolean(STORAGE_KEY.FINISHED_ON_BOARDING) || false;
    setIsWelcome(!isFinishedOnboarding);
  }, []);

  useEffect(() => {
    checkIsWelcome();
  }, [checkIsWelcome]);

  if (isWelcome) {
    return <Redirect href={"/welcome"} />;
  }
  return <Redirect href={"/home"} />;
}
