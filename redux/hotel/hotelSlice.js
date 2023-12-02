import { createSlice } from "@reduxjs/toolkit";
import {
  getDestinationId,
  getHotelByLocation,
  getLocation,
  getLocationUser,
  getReviewList,
  login,
} from "./hotelAction";

const initialState = {
  listHotels: [],
  isLoading: true,
  error: null,
  user: null,
  location: null,
  locationUser: null,
  bookmarks: [],
  booked: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const hotel = action.payload;
      const index = state.bookmarks.indexOf(hotel.hotel_id);
      console.log("index", index);
      if (index === -1) {
        state.bookmarks.push(hotel);
      } else {
        state.bookmarks.splice(index, 1);
      }
    },
    bookHotel: (state, action) => {
      const hotel = action.payload;
      state.booked.push(hotel);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getLocation.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getLocation.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.location = payload.map((location) => location.regionNames);
    });
    builder.addCase(getHotelByLocation.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getHotelByLocation.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getHotelByLocation.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getDestinationId.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDestinationId.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getDestinationId.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getReviewList.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getReviewList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getReviewList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.user = payload;
    });
    builder.addCase(getLocationUser.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getLocationUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getLocationUser.fulfilled, (state, { payload }) => {
      state.locationUser = payload[0].City;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { toggleBookmark, bookHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
