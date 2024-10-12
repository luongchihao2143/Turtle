import { colors } from "@/constants/colors";
import { useAppSelector } from "@/redux/hooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const TabsLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  if (!authState.isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
      }}>
      <Tabs.Screen
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
        name="home"
      />
      <Tabs.Screen
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" color={color} size={size} />
          ),
        }}
        name="wishlist"
      />
      <Tabs.Screen
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
          tabBarButton: (props) => (
            <View className="w-[56] h-[56]">
              <Pressable
                onPress={props.onPress}
                className="absolute bottom-[12] bg-primary w-[56] h-[56] rounded-full items-center justify-center">
                <AntDesign name="shoppingcart" color={colors.white} size={24} />
              </Pressable>
            </View>
          ),
        }}
        name="cart"
      />
      <Tabs.Screen
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
        name="search"
      />
      <Tabs.Screen
        options={{
          title: "Setting",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
        name="setting"
      />
    </Tabs>
  );
};

export default TabsLayout;
