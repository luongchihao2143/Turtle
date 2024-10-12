import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { User } from "@react-native-google-signin/google-signin";
export class Authentication {
  static UpdateProfile = async (user: FirebaseAuthTypes.User) => {
    try {
      const currentUser = auth().currentUser;

      if (user && currentUser) {
        await currentUser.updateProfile({ displayName: user.displayName });
      }

      const userData = {
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        uid: user?.uid,
        emailVerified: user?.emailVerified,
        creationTime: user?.metadata?.creationTime,
        lastSignInTime: user?.metadata?.lastSignInTime,
      };
      await firestore().collection("users").doc(user?.uid).set(userData);
    } catch (error) {
      console.error("👊 -> Authentication -> UpdateProfile= -> error:", error);
    }
  };

  static UpdateProfileWithGoogle = async (user: User) => {
    try {
      const currentUser = auth().currentUser;

      if (user && currentUser) {
        await currentUser.updateProfile({ displayName: user.user.name });
      }
      const userData = {
        displayName: user.user.name,
        email: user.user.email,
        photoURL: user.user.photo,
        uid: user.user.id,
        emailVerified: false,
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
      };
      await firestore().collection("users").doc(user?.user?.id).set(userData);
      console.log(
        "👊 -> Authentication -> UpdateProfile= -> userUpdated:",
        userData,
      );
    } catch (error) {
      console.error("👊 -> Authentication -> UpdateProfile= -> error:", error);
    }
  };
}
