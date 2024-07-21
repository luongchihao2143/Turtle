import { Redirect } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [isWelcome, setIsWelcome] = useState(true);

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
