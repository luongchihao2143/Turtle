import { colors } from "@/constants/colors";
import {
  Authentication,
  chooseImagePicker,
  getStorageImageRefByUuid,
  takePhoto,
} from "@/utils";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import CustomText from "./CustomText";

interface UserAvatarProps {
  avatar?: string;
  size?: number;
  userId: string;
  setAvatar: (avatar: string) => void;
}

const UserAvatar = ({
  avatar,
  size = 160,
  userId,
  setAvatar,
}: UserAvatarProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const isOpenSheet = useRef(false);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeAvatar = useCallback(() => {
    if (bottomSheetRef.current) {
      if (!isOpenSheet.current) {
        bottomSheetRef.current.present();
        isOpenSheet.current = true;
      } else {
        bottomSheetRef.current.dismiss();
        isOpenSheet.current = false;
      }
    }
  }, []);

  const onClose = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
      isOpenSheet.current = false;
    }
  }, []);

  const onChangeAvatarSuccess = useCallback(
    (fileUrl: string) => {
      setAvatar(fileUrl);
      Authentication.UpdateAvatar({ avatar: fileUrl });
      onClose();
    },
    [onClose, setAvatar],
  );

  const onChangeAvatarCompleted = useCallback(() => {
    setIsLoading(false);
    onClose();
  }, [onClose]);

  const onChooseImage = useCallback(async () => {
    setIsLoading(true);
    chooseImagePicker({
      success: onChangeAvatarSuccess,
      error: (err) => alert(err),
      completed: onChangeAvatarCompleted,
      storageImageRef: getStorageImageRefByUuid(userId),
    });
  }, [onChangeAvatarCompleted, onChangeAvatarSuccess, userId]);

  const onTakePhoto = useCallback(async () => {
    setIsLoading(true);
    takePhoto({
      success: onChangeAvatarSuccess,
      error: (err) => alert(err),
      completed: onChangeAvatarCompleted,
      storageImageRef: getStorageImageRefByUuid(userId),
    });
  }, [onChangeAvatarCompleted, onChangeAvatarSuccess, userId]);

  return (
    <>
      <Pressable
        className="items-center justify-center"
        style={{ width: size, height: size }}
        onPress={onChangeAvatar}>
        {!isLoading ? (
          <Image
            source={avatar}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            contentFit="cover"
            contentPosition="center"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        <View className="absolute top-0 right-0 w-[36] h-[36] items-center justify-center bg-primary rounded-full border-2 border-white">
          <EvilIcons name="camera" size={24} color="white" />
        </View>
      </Pressable>

      <BottomSheetModal
        enableDismissOnClose
        enablePanDownToClose
        ref={bottomSheetRef}>
        <BottomSheetView className="flex-1">
          <View className="w-full p-[24] justify-center items-center gap-y-[8]">
            <View className="w-full items-end">
              <EvilIcons
                onPress={onClose}
                name="close"
                size={24}
                color="black"
              />
            </View>
            <Pressable className="w-full my-[16]" onPress={onChooseImage}>
              <CustomText text="1: Choose Image" />
            </Pressable>
            <Pressable className="w-full my-[16]" onPress={onTakePhoto}>
              <CustomText text="2: Take Photo" />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default UserAvatar;
