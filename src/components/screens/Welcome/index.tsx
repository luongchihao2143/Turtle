import { MMKV } from "@/app/_layout";
import CustomText, { FONT_WEIGHT } from "@/components/CustomText";
import Space from "@/components/Space";
import { STORAGE_KEY } from "@/constants/asyncStorage";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/globalStyles";
import { IOnboarding, ON_BOARDING_DATA } from "@/constants/onBoarding";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { styles } from "./styles";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);

  const [step, setStep] = useState(0);

  const onPressPrev = useCallback(() => {
    step > 0 && swiperRef.current && swiperRef.current?.scrollTo(step - 1);
  }, [step]);

  const onPressNext = useCallback(() => {
    step < ON_BOARDING_DATA.length &&
      swiperRef.current &&
      swiperRef.current?.scrollTo(step + 1);
  }, [step]);

  const onPressFinish = useCallback(async () => {
    await MMKV.setBoolAsync(STORAGE_KEY.FINISHED_ON_BOARDING, true);
  }, []);

  const _renderContentByStep = useCallback(
    (onBoardingByStep: IOnboarding, index: number) => {
      return (
        <View key={index} style={globalStyles.centerContainer}>
          <Image
            source={onBoardingByStep.img}
            style={styles.img}
            resizeMode="contain"
          />
          <Space size={12} />
          <CustomText
            text={onBoardingByStep.title}
            fontSize={24}
            fontWeight={FONT_WEIGHT.EXTRA_BOLD}
          />
          <Space size={10} />
          <CustomText
            text={onBoardingByStep.describe}
            fontSize={14}
            fontWeight={FONT_WEIGHT.SEMI_BOLD}
            color={colors.secondaryText}
            textAlign="center"
          />
        </View>
      );
    },
    [],
  );

  const _renderHeader = useMemo(
    () => (
      <View style={styles.sectionContainer}>
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
            onPress={onPressFinish}
            text="Skip"
            fontSize={18}
            fontWeight={FONT_WEIGHT.EXTRA_BOLD}
          />
        </Pressable>
      </View>
    ),
    [onPressFinish, step],
  );

  const _renderContent = useMemo(
    () => (
      <Swiper
        ref={swiperRef}
        index={step}
        onIndexChanged={setStep}
        showsPagination={false}
        loop={false}>
        {ON_BOARDING_DATA.map(_renderContentByStep)}
      </Swiper>
    ),
    [_renderContentByStep, step],
  );

  const _renderFooter = useMemo(
    () => (
      <View style={styles.sectionContainer}>
        <Pressable disabled={step <= 0} onPress={onPressPrev}>
          <CustomText
            text="Prev"
            fontSize={18}
            fontWeight={FONT_WEIGHT.SEMI_BOLD}
            color={colors.secondaryText}
            style={[
              {
                opacity: step <= 0 ? 0 : 1,
              },
            ]}
          />
        </Pressable>
        <View style={globalStyles.flexRow}>
          {ON_BOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                index === step ? styles.focusedDot : styles.unFocusedDot,
                {
                  marginLeft: index !== 0 ? 12 : 0,
                },
              ]}
            />
          ))}
        </View>
        <Pressable
          disabled={step >= ON_BOARDING_DATA.length - 1}
          onPress={onPressNext}>
          <CustomText
            text="Next"
            fontSize={18}
            fontWeight={FONT_WEIGHT.SEMI_BOLD}
            color={colors.primary}
            style={[
              {
                opacity: step >= ON_BOARDING_DATA.length - 1 ? 0 : 1,
              },
            ]}
          />
        </Pressable>
      </View>
    ),
    [onPressNext, onPressPrev, step],
  );

  return (
    <SafeAreaView style={globalStyles.rootContainer}>
      {_renderHeader}
      {_renderContent}
      {_renderFooter}
    </SafeAreaView>
  );
};

export default Welcome;
