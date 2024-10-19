import { colors } from "@/constants/colors";
import { useAppSelector } from "@/redux/hooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Redirect, Tabs } from "expo-router";
import React from "react";

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
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          ),
        }}
        name="chat"
      />
      <Tabs.Screen
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="team" color={color} size={size} />
          ),
        }}
        name="groups"
      />
      <Tabs.Screen
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="ellipsis1" color={color} size={size} />
          ),
        }}
        name="more"
      />
      <Tabs.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
        name="profile"
      />
    </Tabs>
  );
};

export default TabsLayout;
