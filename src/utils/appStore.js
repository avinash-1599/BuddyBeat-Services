import {configureStore} from '@reduxjs/toolkit';
import appointmentSlice from './appointmentSlice';
import userSlice from './userSlice';

const appStore = configureStore({
    reducer: {
        // Add your reducers here
        appointment: appointmentSlice,
        user: userSlice
    }
})

export default appStore;