import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
//   user:{
//     id:string,
//     username:string,
//     email:string
//   }
}
const initialState: AuthState = {
  token: localStorage.getItem('token') || null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Optionally store in localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;