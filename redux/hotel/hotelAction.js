import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../service/api";

export const getLocation = createAsyncThunk("hotels/getLocation", async () => {
 async (data, {rejectWithValue}) => {
  try {
    const response = await await apiInstance.get("/locations/v3/search", {
      params: {
        q: 'indonesia',
        locale: 'id_ID',
        langid: '1057',
        siteid: '321200046'
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
 }
});