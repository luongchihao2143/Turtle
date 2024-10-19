import { storage } from "@/app/_layout";
import { STORAGE_KEY } from "@/constants/asyncStorage";
import {
  removeUser,
  saveUser,
  User as UserType,
} from "@/redux/reducer/authSlice";
import { store } from "@/redux/store";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";

export class Authentication {
  static generateRandomUsername(length: number = 8): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return `user_${result}`;
  }

  static UpdateProfile = async (user: FirebaseAuthTypes.User) => {
    try {
      const currentUser = auth().currentUser;
      const displayName = user.displayName || this.generateRandomUsername();

      if (user && currentUser) {
        await currentUser.updateProfile({
          displayName,
        });
      }

      const userData: UserType = {
        displayName,
        email: user.email || "",
        photoURL: user?.photoURL || "",
        uid: user.uid,
        emailVerified: user?.emailVerified,
        creationTime: user?.metadata?.creationTime || new Date().toISOString(),
        lastSignInTime:
          user?.metadata?.lastSignInTime || new Date().toISOString(),
      };
      store.dispatch(saveUser(userData));
      storage.set(STORAGE_KEY.USER, JSON.stringify(userData));
      await firestore().collection("users").doc(user?.uid).set(userData);
      router.replace("/chat");
    } catch (error) {
      console.error("👊 -> Authentication -> UpdateProfile= -> error:", error);
    }
  };

  static Logout = async () => {
    await auth().signOut();
    storage.delete(STORAGE_KEY.USER);
    store.dispatch(removeUser());
    router.replace("/sign-in");
  };
}
