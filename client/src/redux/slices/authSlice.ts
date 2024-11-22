import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  message?: string;
  status: number | null;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  message: "",
  status: null,
  token: sessionStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("userId", action.payload.user.id);
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
