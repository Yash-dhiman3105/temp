import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/booking/bookingSlice.js";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
