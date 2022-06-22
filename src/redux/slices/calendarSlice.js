import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weekNum: 0,
    selectedEventKey: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        nextWeek: (state) => {
            state.weekNum++;
        },
        prevWeek: (state) => {
            state.weekNum--;
        },
        setSelectedEventKey: (state, action) => {
            state.selectedEventKey = action.payload;
        },
    },
});

export const { nextWeek, prevWeek, setSelectedEventKey } =
    calendarSlice.actions;

export const getWeekNum = (state) => state.calendar.weekNum;
export const getSelectedEventKey = (state) => state.calendar.selectedEventKey;

export default calendarSlice.reducer;
