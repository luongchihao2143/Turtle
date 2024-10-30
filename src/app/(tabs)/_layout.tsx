import TabHeader from "@/components/TabHeader";
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
          headerShown: true,
          header: () => <TabHeader title="Chat" />,
        }}
        name="chat"
      />
      <Tabs.Screen
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="team" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <TabHeader title="Groups" />,
        }}
        name="groups"
      />
      <Tabs.Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <TabHeader title="Profile" />,
        }}
        name="profile"
      />
      <Tabs.Screen
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="ellipsis1" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <TabHeader title="More" />,
        }}
        name="more"
      />
    </Tabs>
  );
};

export default TabsLayout;
