import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../service/api";
import { API_KEY } from "@env";
import axios from "axios";
import { getTodayDate, getTomorrowDate } from "./../../utils";

export const getLocation = createAsyncThunk(
  "getLocation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://hotels-com-provider.p.rapidapi.com/v2/regions`,
        {
          params: {
            query: "indonesia",
            domain: "ID",
            locale: "en_GB",
          },
          headers: {
            "X-RapidAPI-Key": `${API_KEY}`,
            "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
          },
        }
      );
      const data = response.data.data.filter((item) => {
        return item.type === "CITY";
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getDestinationId = createAsyncThunk(
  "getDestinationId",
  async ({ cityName }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get("/locations/auto-complete", {
        params: {
          text: cityName,
          languageCode: "id",
        },
      });
      const dest_id = response.data.filter((item) => {
        return (
          item.dest_type === "city" &&
          item.cc1 === "id" &&
          item.name === cityName
        );
      });
      return dest_id;
    } catch (error) {
      console.error("Error fetching destination ID:", error);
      return rejectWithValue(error);
    }
  }
);

export const getHotelByLocation = createAsyncThunk(
  "getHotels",
  async (
    { dest_id, arrival_date, departure_date, guest_qty, room_qty, offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiInstance.get(`/properties/list`, {
        params: {
          offset: 0,
          arrival_date: arrival_date ? arrival_date : getTodayDate(),
          departure_date: departure_date ? departure_date : getTomorrowDate(),
          guest_qty: guest_qty ? guest_qty : 1,
          dest_ids: dest_id,
          room_qty: room_qty ? room_qty : 1,
          order_by: "RECOMMENDED",
          search_type: "city",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getReviewList = createAsyncThunk(
  "getReview",
  async ({ hotel_ids }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get("/reviews/list", {
        params: {
          hotel_ids,
          languagecode: "id",
          user_sort: "sort_recent_desc",
          rows: "10",
          offset: "0",
          filter_language: "id",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const credential = {
        username: "User",
        password: "user123",
      };

      if (
        username === credential.username &&
        password === credential.password
      ) {
        const response = { username, status: "success" };
        return response;
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      // Handle other errors if needed
      return rejectWithValue(error.message);
    }
  }
);
