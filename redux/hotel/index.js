import AsyncStorage from "@react-native-async-storage/async-storage";
import hotelSlice from "./hotelSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducers = persistReducer(persistConfig, hotelSlice);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  console.log(store.getState().booked);
});

export const persistor = persistStore(store);
