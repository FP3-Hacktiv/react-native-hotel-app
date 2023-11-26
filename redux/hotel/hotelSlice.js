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
  isLoading: false,
  error: null,
  user: null,
  location: null,
  locationUser: null,
  booked: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    getLocationFailure: (state, action) => {
      state.error = action.payload.message || "Network Error";
    },
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
      state.isLoading = false;
    });
    builder.addCase(getLocation.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getLocation.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.location = payload;
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
      state.listHotels = payload.result;
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
      state.isLoading = false;
      state.error = null;
      state.locationUser = payload[0].City;
    });
  },
});

export const { bookHotel, removeHotel, updateHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
