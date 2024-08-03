import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MMKVLoader } from "react-native-mmkv-storage";

if (__DEV__) {
  require("../../ReactotronConfig");
}

export const unstable_settings = {
  // Ensure any route can link back to Home
  initialRouteName: "index",
};

export const MMKV = new MMKVLoader().initialize();

const fonts = {
  "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
  "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
  "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
  "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
  "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //load font
  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
