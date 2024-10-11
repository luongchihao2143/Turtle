import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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
      console.log(
        "👊 -> Authentication -> UpdateProfile= -> userUpdated:",
        userData,
      );
    } catch (error) {
      console.error("👊 -> Authentication -> UpdateProfile= -> error:", error);
    }
  };
}
