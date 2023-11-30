import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./hotelSlice";

const store = configureStore({
  reducer: { hotels: hotelSlice },
});

store.subscribe(() => {
  console.log("Store changed!", store.getState().hotels.bookmarks);
});

export default store;
