import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/authSlice';
import uptimeReducer from '../components/Item/Metrics/uptimeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    uptime: uptimeReducer,
  },
});

export default store;