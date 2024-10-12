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
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (response) => {
        if (response.user) {
          await Authentication.UpdateProfile(response.user);
          Alert.alert("Success", "User signed in successfully");
          router.replace("/home");
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

  const handleForgotPassword = () => {
    console.log("Forgot password");
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
            text="Create An Account  "
          />
          <Link href="/sign-up">
            <CustomText
              color={colors.primary}
              fontSize={14}
              fontWeight={FONT_WEIGHT.REGULAR}
              text="Sign Up"
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

      <Pressable onPress={handleForgotPassword}>
        <CustomText
          text="Forgot your password?"
          fontSize={14}
          fontWeight={FONT_WEIGHT.REGULAR}
          color={colors.primary}
          className="mt-[8] w-full text-right"
        />
      </Pressable>

      <Space size={30} direction="horizontal" />

      <CustomButton
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <Space size={75} direction="horizontal" />

      {_renderFooter()}
    </SafeAreaView>
  );
};

export default SignIn;
