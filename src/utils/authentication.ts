import {
  Gender,
  removeUser,
  saveUser,
  User as UserType,
} from "@/redux/reducer/authSlice";
import { store } from "@/redux/store";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { ProgressingResponse } from ".";

interface UpdateProfileResponse extends ProgressingResponse {
  user: UserType;
}

interface UpdateProfileAvatarResponse extends ProgressingResponse {
  avatar: string;
}

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

  static SaveProfile = async (user: FirebaseAuthTypes.User) => {
    try {
      const userDoc = await firestore().collection("users").doc(user.uid).get();
      if (!userDoc.exists) {
        await this.CreateProfile(user);
        return;
      }
      const userDocData = userDoc.data();
      const userData: UserType = {
        displayName: userDocData?.displayName,
        email: userDocData?.email || "",
        photoURL: userDocData?.photoURL || "",
        uid: userDocData?.uid,
        gender: userDocData?.gender || Gender.UNKNOWN,
        birthDate: userDocData?.birthDate,
        emailVerified: user?.emailVerified,
        creationTime: user?.metadata?.creationTime,
        lastSignInTime: user?.metadata?.lastSignInTime,
      };
      store.dispatch(saveUser(userData));
      await firestore().collection("users").doc(user?.uid).update({
        emailVerified: user?.emailVerified,
        creationTime: user?.metadata?.creationTime,
        lastSignInTime: user?.metadata?.lastSignInTime,
      });
      router.replace("/chat");
    } catch (error) {
      console.error("👊 -> Authentication -> SaveProfile= -> error:", error);
    }
  };

  static CreateProfile = async (user: FirebaseAuthTypes.User) => {
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
        gender: Gender.UNKNOWN,
      };
      store.dispatch(saveUser(userData));
      await firestore().collection("users").doc(user?.uid).set(userData);
      router.replace("/chat");
    } catch (error) {
      console.error("👊 -> Authentication -> UpdateProfile= -> error:", error);
    }
  };

  static UpdateAvatar = async ({
    avatar,
    onComplete,
    onError,
    onSuccess,
  }: UpdateProfileAvatarResponse) => {
    try {
      const currentUser = auth().currentUser;
      const user = store.getState().auth.user;

      if (currentUser) {
        await currentUser.updateProfile({ photoURL: avatar });
      }

      const userData: UserType = {
        ...user,
        email: user?.email || "",
        uid: user?.uid || "",
        photoURL: avatar,
        gender: Gender.UNKNOWN,
      };
      store.dispatch(saveUser(userData));
      await firestore().collection("users").doc(user?.uid).set(userData);
      onSuccess && onSuccess();
    } catch (error) {
      console.error("👊 -> Authentication -> error:", error);
      onError && onError(error + "");
    } finally {
      onComplete && onComplete();
    }
  };

  static UpdateProfile = async ({
    user,
    onComplete,
    onError,
    onSuccess,
  }: UpdateProfileResponse) => {
    try {
      console.log("👊 -> Authentication -> user:", user);
      await firestore()
        .collection("users")
        .doc(user?.uid || "")
        .set(user);

      store.dispatch(saveUser(user));
      onSuccess && onSuccess();
    } catch (error) {
      console.error("👊 -> Authentication -> error:", error);
      onError && onError(error + "");
    } finally {
      onComplete && onComplete();
    }
  };

  static Logout = async () => {
    await auth().signOut();
    store.dispatch(removeUser());
    router.replace("/sign-in");
  };

  static FetchUser = async (): Promise<UserType | null> => {
    try {
      const userData = store.getState().auth?.user;
      if (!userData) {
        return null;
      }
      const userDoc = await firestore()
        .collection("users")
        .doc(userData?.uid)
        .get();
      if (!userDoc.exists) {
        return null;
      }
      const userDocData = userDoc.data();
      await firestore().collection("users").doc(userData?.uid).update({
        lastSignInTime: new Date().toISOString(),
      });
      return {
        ...userData,
        ...userDocData,
        lastSignInTime: new Date().toISOString(),
      };
    } catch (error) {
      console.error("👊 -> Authentication -> FetchUser= -> error:", error);
      return null;
    }
  };
}
