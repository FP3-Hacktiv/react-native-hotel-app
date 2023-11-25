import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./hotelSlice";

const store = configureStore({
  reducer: {hotels: hotelSlice},
});

console.log("on create store: ", store.getState());

store.subscribe(() => {
  console.log("Store changed! ", store.getState());
})


export default store;