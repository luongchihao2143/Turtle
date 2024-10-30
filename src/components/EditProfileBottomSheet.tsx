import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomText from "@/components/CustomText";
import Space from "@/components/Space";
import { useAppSelector } from "@/redux/hooks";
import { Gender, GenderName, User } from "@/redux/reducer/authSlice";
import { Authentication } from "@/utils";
import { EvilIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Alert, View } from "react-native";
import DateTimePicker from "./DateTimePicker";
import GenderPicker, { DropdownPickerItem } from "./GenderPicker";

interface EditProfileBottomSheetProps {
  onClose: () => void;
}

const DROPDOWN_ITEMS: DropdownPickerItem[] = [
  {
    value: Gender.MALE,
    label: GenderName[Gender.MALE],
  },
  {
    value: Gender.FEMALE,
    label: GenderName[Gender.FEMALE],
  },
  {
    value: Gender.OTHER,
    label: GenderName[Gender.OTHER],
  },
  {
    value: Gender.UNKNOWN,
    label: GenderName[Gender.UNKNOWN],
  },
];

const EditProfileBottomSheet = ({ onClose }: EditProfileBottomSheetProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const [displayName, setDisplayName] = useState(user?.displayName);
  const [errDisplayName, setErrDisplayName] = useState("");
  const [gender, setGender] = useState<string>(user?.gender || "");
  const [birthDay, setBirthDay] = useState<Date | undefined>(
    user?.birthDate ? new Date(user?.birthDate) : undefined,
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async () => {
    setErrDisplayName("");
    if (!displayName) {
      setErrDisplayName("Name is required");
      return;
    }
    try {
      setIsLoading(true);
      if (user) {
        const userUpdated: User = {
          ...user,
          birthDate: birthDay ? new Date(birthDay).toISOString() : "",
          displayName,
          gender: (gender as Gender) || Gender.OTHER,
        };
        await Authentication.UpdateProfile({
          user: userUpdated,
          onSuccess: () => Alert.alert("Update Profile Success"),
          onError: (error) => {
            throw error;
          },
          onComplete: () => {
            setIsLoading(false);
          },
        });
      }
    } catch (error) {
      console.error("👊 -> onSubmitForm -> error:", error);
      Alert.alert("Failed to update profile: ", error + "");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const onChangeDisplayName = (val: string) => {
    setErrDisplayName("");
    setDisplayName(val);
  };

  const _renderGenderInput = useMemo(
    () => (
      <View>
        <GenderPicker
          selectedItem={gender}
          setSelectedItem={setGender}
          items={DROPDOWN_ITEMS}
          label="Gender"
        />
      </View>
    ),
    [gender],
  );

  const _renderBirthdayInput = useMemo(
    () => (
      <View>
        <DateTimePicker
          setDate={setBirthDay}
          date={birthDay}
          label="Birthday"
        />
      </View>
    ),
    [birthDay],
  );

  return (
    <View className="w-full flex-1 p-[24] justify-center items-center gap-y-[8]">
      {/* Header */}
      <View className="w-full justify-between items-center flex-row">
        <Space size={24} direction="vertical" />
        <CustomText text="Edit Profile" />
        <EvilIcons onPress={onClose} name="close" size={24} color="black" />
      </View>
      {/* Body */}
      <View className="w-full flex-1 gap-y-[16]">
        {/* Display Name Input */}
        <View>
          <CustomInput
            value={displayName}
            onChangeText={onChangeDisplayName}
            error={errDisplayName}
            placeholder="Enter your name"
            isClearAllButton
            label="Name"
          />
        </View>
        {_renderGenderInput}
        {_renderBirthdayInput}
      </View>
      {/* Footer */}
      <View className="w-full flex-row justify-between gap-x-[8]">
        <View className="flex-1">
          <CustomButton
            loading={isLoading}
            title="Cancel"
            onPress={onClose}
            variant="secondary"
          />
        </View>
        <View className="flex-1">
          <CustomButton
            loading={isLoading}
            title="Save"
            onPress={onSubmitForm}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfileBottomSheet;
