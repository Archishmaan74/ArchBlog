import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blogApi";
import { authApi } from "./services/authApi";

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(authApi.middleware),
});

export default store;
