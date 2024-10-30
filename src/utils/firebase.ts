import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
export interface UploadResponse {
  success: (fileUrl: string) => void;
  error: (error: string) => void;
  completed: () => void;
}

interface ImagePickerProps extends UploadResponse {
  storageImageRef?: string;
}

export const getStorageImageRefByUuid = (userUuid: string) => {
  return `images/${userUuid}.jpg`;
};

export const STORAGE_IMAGE_REF = `images/${Date.now()}.jpg`;

export const chooseImagePicker = async ({
  success,
  error,
  completed,
  storageImageRef = STORAGE_IMAGE_REF,
}: ImagePickerProps) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 0.25,
    });
    console.log("👊 -> result:", result);
    if (result.assets && result.assets.length > 0) {
      const reference = storage().ref(storageImageRef);
      const uploadTask = reference.putFile(result.assets[0].uri);
      await uploadTask;
      const downloadUrl = await reference.getDownloadURL();
      success(downloadUrl);
    }
  } catch (err) {
    error(err as string);
  } finally {
    completed();
  }
};

export const takePhoto = async ({
  success,
  error,
  completed,
  storageImageRef,
}: ImagePickerProps) => {
  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.25,
      allowsMultipleSelection: false,
    });
    console.log("👊 -> onTakePhoto -> result:", result);
    if (result.assets && result.assets.length > 0) {
      const reference = storage().ref(storageImageRef);
      const uploadTask = reference.putFile(result.assets[0].uri);
      await uploadTask;
      const downloadUrl = await reference.getDownloadURL();
      success(downloadUrl);
    }
  } catch (err) {
    error(err as string);
  } finally {
    completed();
  }
};
