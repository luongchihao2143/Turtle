import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-[24]">
        <Text>Search</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;
