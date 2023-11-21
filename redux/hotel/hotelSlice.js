import { createSlice } from "@reduxjs/toolkit";
import { getLocation } from "./hotelAction";

const initialState = {
	hotels: [],
	isLoading: false,
	error: null,
  user: null,
	booked: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    bookHotel: (state, { payload }) => {
      state.booked.push(payload);
    },
    removeHotel: (state, { payload }) => {
      state.booked = state.booked.filter((hotel) => hotel.id !== payload);
    },
    updateHotel: (state, { payload }) => {
      state.booked = state.booked.map((hotel) => {
        if (hotel.id === payload.id) {
          return payload;
        }
        return hotel;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getLocation.rejected, (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		});
		builder.addCase(getLocation.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.error = null;
			state.products = payload.data;
		});
  },
});

export const {bookHotel, removeHotel, updateHotel} = hotelSlice.actions;
export default hotelSlice.reducer;