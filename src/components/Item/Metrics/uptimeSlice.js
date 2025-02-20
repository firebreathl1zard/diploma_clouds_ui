import { createSlice } from '@reduxjs/toolkit';

const uptimeSlice = createSlice({
  name: 'uptime',
  initialState: {
    value: 0,
  },
  reducers: {
    setUptime: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUptime } = uptimeSlice.actions;
export default uptimeSlice.reducer;