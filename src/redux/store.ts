import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer/appSlice";
import authReducer from "./reducer/authSlice";
import reactotron from "../../ReactotronConfig";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(__DEV__ ? [reactotron.createEnhancer!()] : []),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
