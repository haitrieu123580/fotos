import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  message: "",
  token: localStorage.getItem("token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
}
interface LoginAction {
  type: string;
  payload: {
    username: string;
    password: string;
  };
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    _login: (state, { payload }) => {
      state.isLogin = true;
      localStorage.setItem("token", String(payload.payload.access_token));
      localStorage.setItem("refresh_token", String(payload.payload.refresh_token));
      state.token = String(payload.payload.access_token);
      state.refresh_token = String(payload.payload.refresh_token);
    },
  },

})

export const { _login } = authSlice.actions

export default authSlice.reducer