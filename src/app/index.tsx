import { useAppSelector } from "@/redux/hooks";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const isFinishedOnBoarding = useAppSelector(
    (selector) => selector.app.isFinishedOnboarding,
  );

  useEffect(() => {
    console.log("isFinishedOnBoarding: ", isFinishedOnBoarding);
  }, [isFinishedOnBoarding]);

  if (!isFinishedOnBoarding) {
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
