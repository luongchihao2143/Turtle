import { STORAGE_KEY } from "@/constants/asyncStorage";
import { Redirect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MMKV } from "./_layout";

export default function Index() {
  const [isWelcome, setIsWelcome] = useState(false);

  const checkIsWelcome = useCallback(async () => {
    const isFinishedOnBoarding = await MMKV.getBoolAsync(
      STORAGE_KEY.FINISHED_ON_BOARDING,
    );
    console.log("isFinishedOnBoarding: ", isFinishedOnBoarding);

    setIsWelcome(!isFinishedOnBoarding);
  }, []);

  useEffect(() => {
    checkIsWelcome();
  }, [checkIsWelcome]);

  if (isWelcome) {
    return <Redirect href={"/welcome"} />;
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text>hello</Text>
    </View>
  );
}
