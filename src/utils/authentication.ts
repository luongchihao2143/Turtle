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
  static UpdateProfile = async (user: FirebaseAuthTypes.User) => {
    try {
      const currentUser = auth().currentUser;

      if (user && currentUser) {
        await currentUser.updateProfile({ displayName: user.displayName });
      }

      const userData: UserType = {
        displayName: user?.displayName || "",
        email: user?.email || "",
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
      router.replace("/home");
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
