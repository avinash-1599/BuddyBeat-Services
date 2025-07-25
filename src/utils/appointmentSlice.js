import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        showForm: true,
    },
    reducers: {
        toggleForm: (state) => {
            state.showForm = !state.showForm;
        },
        setShowForm: (state, action) => {
            state.showForm = action.payload;
        },
    },
})

export const { toggleForm, setShowForm } = appointmentSlice.actions;
export default appointmentSlice.reducer;