import CustomButton from "@/components/CustomButton";
import CustomText, { FONT_WEIGHT } from "@/components/CustomText";
import Space from "@/components/Space";
import UserAvatar from "@/components/UserAvatar";
import { colors } from "@/constants/colors";
import { AVATAR } from "@/constants/images";
import { GenderName } from "@/redux/reducer/authSlice";
import { RootState } from "@/redux/store";
import { Authentication } from "@/utils";
import { formatDateToDMY } from "@/utils/formatDateTime";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import EditProfileBottomSheet from "../../components/EditProfileBottomSheet";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { bottom } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [avatar, setAvatar] = useState(user?.photoURL || AVATAR);

  const onCopy = (value: string) => {
    Clipboard.setStringAsync(value);
  };

  const onClose = () => {
    bottomSheetRef.current?.dismiss();
  };

  const onEditProfile = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        bounces={false}
        className="flex-1 px-[24] py-[32] bg-white"
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <UserAvatar
          userId={user?.uid || ""}
          avatar={avatar}
          setAvatar={setAvatar}
        />
        {/* Name */}
        <View className="items-center gap-x-[4] flex-row justify-center my-[32]">
          <CustomText
            fontSize={22}
            fontWeight={FONT_WEIGHT.SEMI_BOLD}
            color={colors.primaryText}
            text={user?.displayName}
          />
          <Feather
            onPress={() => onCopy(user?.displayName || "")}
            name="copy"
            size={20}
            color="black"
          />
        </View>
        {/* Email */}
        <View className="items-center w-full gap-x-[4] flex-row justify-between">
          <CustomText
            fontSize={18}
            fontWeight={FONT_WEIGHT.REGULAR}
            numberOfLines={1}
            ellipsizeMode="tail"
            color="#686A8A">
            Email:
            <CustomText
              color={colors.primaryText}
              text={` ${user?.email || ""}`}
              numberOfLines={1}
              ellipsizeMode="tail"
              fontWeight={FONT_WEIGHT.REGULAR}
            />
          </CustomText>
          <Feather
            onPress={() => onCopy(user?.email || "")}
            name="copy"
            size={24}
            color="black"
          />
        </View>
        <Space size={16} />
        {/* Gender */}
        <View className="items-center w-full gap-x-[4] flex-row justify-between">
          <CustomText
            fontSize={18}
            fontWeight={FONT_WEIGHT.REGULAR}
            numberOfLines={1}
            ellipsizeMode="tail"
            color="#686A8A">
            Gender:
            <CustomText
              color={colors.primaryText}
              text={` ${user?.gender ? GenderName[user.gender] : "..."}`}
              numberOfLines={1}
              ellipsizeMode="tail"
              fontWeight={FONT_WEIGHT.REGULAR}
            />
          </CustomText>
          <Feather
            onPress={() => onCopy(user?.gender || "")}
            name="copy"
            size={24}
            color="black"
          />
        </View>
        <Space size={16} />
        {/* Birth day */}
        <View className="items-center w-full gap-x-[4] flex-row justify-between">
          <CustomText
            fontSize={18}
            fontWeight={FONT_WEIGHT.REGULAR}
            numberOfLines={1}
            ellipsizeMode="tail"
            color="#686A8A">
            Birthday:
            <CustomText
              color={colors.primaryText}
              text={` ${user?.birthDate ? formatDateToDMY(new Date(user.birthDate)) : "..."}`}
              numberOfLines={1}
              ellipsizeMode="tail"
              fontWeight={FONT_WEIGHT.REGULAR}
            />
          </CustomText>
          <Feather
            onPress={() => onCopy(user?.birthDate || "")}
            name="copy"
            size={24}
            color="black"
          />
        </View>
        <Space size={16} />
        <CustomButton
          title="Edit Profile"
          onPress={onEditProfile}
          variant="secondary"
          icon={<AntDesign name="edit" size={20} color={colors.primary} />}
        />
        <Space size={16} />
        <CustomButton
          title="Logout"
          onPress={Authentication.Logout}
          icon={<AntDesign name="logout" size={16} color={colors.white} />}
        />
      </ScrollView>
      <BottomSheetModal
        snapPoints={["100%"]}
        bottomInset={bottom + 16}
        ref={bottomSheetRef}
        enableDismissOnClose
        enablePanDownToClose>
        <BottomSheetView style={{ flex: 1 }}>
          <EditProfileBottomSheet onClose={onClose} />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Profile;
