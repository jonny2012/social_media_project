import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

export interface IUser {
  email: string;
  password: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const API_URL = `${process.env.API_URL}/auth/register`;

export const getUser = createAsyncThunk("register", async (_, thunkApi) => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error: any) {
    const message = error.response.data.message;
    return thunkApi.rejectWithValue({ message });
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default userSlice.reducer;
