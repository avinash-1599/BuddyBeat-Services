import {configureStore} from '@reduxjs/toolkit';
import appointmentSlice from './appointmentSlice';

const appStore = configureStore({
    reducer: {
        // Add your reducers here
        appointment: appointmentSlice
    }
})

export default appStore;