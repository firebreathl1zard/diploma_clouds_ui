import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: localStorage.getItem('authStatus') || 'Unauthorized',
  },
  reducers: {
    loginSuccess(state) {
      state.status = 'Login successful';
      localStorage.setItem('authStatus', state.status);
    },
    logout(state) {
      state.status = 'Unauthorized'; 
      localStorage.removeItem('authStatus'); 
    },
    unauthorized(state) {
      state.status = 'Unauthorized';
      localStorage.setItem('authStatus', state.status);
    },
  },
});

export const { loginSuccess, logout, unauthorized } = authSlice.actions;
export default authSlice.reducer;