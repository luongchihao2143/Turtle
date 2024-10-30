import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomText, { FONT_WEIGHT } from "@/components/CustomText";
import Space from "@/components/Space";
import ThirdSignInMethods from "@/components/ThirdSignInMethods";
import { colors } from "@/constants/colors";
import { Authentication } from "@/utils/authentication";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (response) => {
        if (response.user) {
          const user = response.user;
          await Authentication.SaveProfile(user);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const _renderForm = () => {
    return (
      <View className="w-full justify-center items-center">
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              placeholderTextColor={colors.inputText}
              icon={<Ionicons name="mail" size={24} color={colors.inputText} />}
              error={errors.email?.message}
            />
          )}
        />
        <Space size={30} direction="horizontal" />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              placeholderTextColor={colors.inputText}
              isPassword
              error={errors.password?.message}
            />
          )}
        />
        <Space size={30} direction="horizontal" />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <CustomInput
              value={value}
              onChangeText={onChange}
              placeholder="Confirm Password"
              placeholderTextColor={colors.inputText}
              isPassword
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </View>
    );
  };

  const _renderFooter = () => {
    return (
      <View className="justify-center items-center">
        <ThirdSignInMethods />

        <Space size={28} direction="horizontal" />
        <View className="flex-row justify-center items-center">
          <CustomText
            color="#575757"
            fontSize={14}
            textAlign="center"
            fontWeight={FONT_WEIGHT.REGULAR}
            text="I Have An Account  "
          />
          <Link href="/sign-in">
            <CustomText
              color={colors.primary}
              fontSize={14}
              fontWeight={FONT_WEIGHT.REGULAR}
              text="Sign In"
              className="underline"
            />
          </Link>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 px-[32] bg-white">
      <CustomText
        text={`Welcome \nback!`}
        fontSize={36}
        fontWeight={FONT_WEIGHT.BOLD}
        className=""
      />

      <Space size={36} direction="horizontal" />

      {_renderForm()}

      <Space size={20} direction="horizontal" />

      <CustomText
        className="w-3/4"
        fontSize={12}
        fontWeight={FONT_WEIGHT.REGULAR}
        color={colors.inputText}>
        By clicking the <CustomText text="Register" color="#FF4B26" /> button,
        you agree to the public offer
      </CustomText>

      <Space size={30} direction="horizontal" />

      <CustomButton
        title="Create Account"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <Space size={75} direction="horizontal" />

      {_renderFooter()}
    </SafeAreaView>
  );
};

export default SignUp;
