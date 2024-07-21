import { globalStyles } from "@/constants/globalStyles";
import React, { useMemo, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ON_BOARDING_DATA } from "@/constants/onBoarding";
import CustomText, { FONT_WEIGHT } from "@/components/CustomText";
import { styles } from "./styles";
import { colors } from "@/constants/colors";
import Space from "@/components/Space";

const Welcome = () => {
  const [step, setStep] = useState(0);

  const onBoardingByStep = useMemo(() => ON_BOARDING_DATA[step], [step]);

  const _renderHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <CustomText fontSize={18} fontWeight={FONT_WEIGHT.EXTRA_BOLD}>
          {step + 1}
          <CustomText
            fontSize={18}
            fontWeight={FONT_WEIGHT.EXTRA_BOLD}
            color={colors.secondaryText}
            text="/3"
          />
        </CustomText>
        <Pressable>
          <CustomText
            text="Skip"
            fontSize={18}
            fontWeight={FONT_WEIGHT.EXTRA_BOLD}
          />
        </Pressable>
      </View>
    ),
    [step],
  );

  const _renderContent = useMemo(
    () => (
      <View style={globalStyles.centerContainer}>
        <Image
          source={onBoardingByStep.img}
          style={styles.img}
          resizeMode="contain"
        />
        <Space size={12} />
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={globalStyles.rootContainerWithPadding}>
      {_renderHeader}
      {_renderContent}
    </SafeAreaView>
  );
};

export default Welcome;
