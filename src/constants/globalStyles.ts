import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { BASE } from "./size";

export const globalStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rootContainerWithPadding: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: BASE,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
