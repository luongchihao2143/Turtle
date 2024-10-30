import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  UNKNOWN = "unknown",
}

export const GenderName = {
  [Gender.FEMALE]: "Female",
  [Gender.MALE]: "Male",
  [Gender.OTHER]: "Other",
  [Gender.UNKNOWN]: "Unknown",
};

export interface User {
  displayName?: string;
  email: string;
  photoURL?: string;
  uid: string;
  emailVerified?: boolean;
  creationTime?: string;
  lastSignInTime?: string;
  gender?: Gender;
  birthDate?: string;
}

interface AuthState {
  user?: User;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload.uid;
    },
    removeUser: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { saveUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
