import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: '',
    role: '',
  },
  reducers: {
    setUserData: (state, action) => {
      state.login = action.payload.login;
      state.role = action.payload.role;
    },
    clearUserData: (state) => {
      state.login = '';
      state.role = '';
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;