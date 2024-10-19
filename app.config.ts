import dotenv from "dotenv";

dotenv.config();

const config = {
  expo: {
    name: "ecommerce",
    slug: "turtle",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon-logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.hao.luong.commerce",
      googleServicesFile: "./GoogleService-Info.plist",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/icon-logo.png",
        backgroundColor: "#ffffff",
      },
      package: "com.hao.luong.commerce",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/icon-logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-font",
        {
          fonts: [
            "./src/assets/fonts/Montserrat-Black.ttf",
            "./src/assets/fonts/Montserrat-Bold.ttf",
            "./src/assets/fonts/Montserrat-ExtraLight.ttf",
            "./src/assets/fonts/Montserrat-ExtraBold.ttf",
            "./src/assets/fonts/Montserrat-Light.ttf",
            "./src/assets/fonts/Montserrat-Medium.ttf",
            "./src/assets/fonts/Montserrat-Regular.ttf",
            "./src/assets/fonts/Montserrat-Thin.ttf",
            "./src/assets/fonts/Montserrat-SemiBold.ttf",
          ],
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      "@react-native-google-signin/google-signin",
      [
        "expo-image-picker",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "6a493b64-4c59-45e5-a4a6-614bc897fde4",
      },
      GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    },
    owner: "luongchihao2143",
  },
};

export default config;
