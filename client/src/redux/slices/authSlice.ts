import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  message?:string,
  status: number |null,
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  message:"",
  status:null,
  token: localStorage.getItem('token') || null,
  user:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string, user: User}>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem("userId", action.payload.user.id)
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem("userId") 
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;