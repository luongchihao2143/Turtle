import { colors } from "@/constants/colors";
import { BASE, WIDTH } from "@/constants/size";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: BASE,
    paddingBottom: 8,
  },
  img: {
    width: WIDTH - BASE,
    height: WIDTH - BASE,
  },
  unFocusedDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.secondaryText,
    borderRadius: 5,
  },
  focusedDot: {
    width: 40,
    height: 8,
    backgroundColor: colors.primaryText,
    borderRadius: 20,
  },
});
