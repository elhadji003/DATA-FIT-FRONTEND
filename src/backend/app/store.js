import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authAPI";
import { userApi } from "../features/user/userAPI";
import { etablisApi } from "../features/etablissement/etablisAPI";
import { programmesApi } from "../features/programmes/programmesAPI";
import { importsApi } from "../features/importsFichier/importsAPI";
import { postulerApi } from "../features/postuler/postulerAPI";

// Configuration de persistance
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [etablisApi.reducerPath]: etablisApi.reducer,
  [programmesApi.reducerPath]: programmesApi.reducer,
  [importsApi.reducerPath]: importsApi.reducer,
  [postulerApi.reducerPath]: postulerApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      etablisApi.middleware,
      programmesApi.middleware,
      importsApi.middleware,
      postulerApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
