import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
