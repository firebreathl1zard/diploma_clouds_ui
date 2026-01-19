import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/authSlice';
import uptimeReducer from '../components/Item/Metrics/uptimeSlice';
import itemsReducer from './itemsSlice';
import selectedPackageReducer from './Item/Modal/selectedPackageSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    uptime: uptimeReducer,
    items: itemsReducer,
    selectedPackage: selectedPackageReducer,
    user: userReducer,
  },
});

export default store;