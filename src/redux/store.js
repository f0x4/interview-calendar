import { configureStore } from "@reduxjs/toolkit";
import calendarReduser from "./slices/calendarSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarReduser,
    },
});
