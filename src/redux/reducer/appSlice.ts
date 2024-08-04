import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isFinishedOnboarding: boolean;
}

const initialState: AppState = {
  isFinishedOnboarding: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsFinishedOnboarding: (state, action: PayloadAction<boolean>) => {
      state.isFinishedOnboarding = action.payload;
    },
  },
});

export const { setIsFinishedOnboarding } = appSlice.actions;
export default appSlice.reducer;
