import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState extends FirebaseAuthTypes.User {}

const initialState: AuthState = {} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
    removeUser: (state) => {
      state = initialState;
    },
  },
});

export const { saveUser } = authSlice.actions;
export default authSlice.reducer;
