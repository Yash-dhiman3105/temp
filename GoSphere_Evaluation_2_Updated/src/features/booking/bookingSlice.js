import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Store only the minimal data needed to identify saved trains.
  favourites: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    toggleFavourite(state, action) {
      const train = action.payload;
      const existingIndex = state.favourites.findIndex(
        (item) => item.id === train.id
      );

      if (existingIndex >= 0) {
        state.favourites.splice(existingIndex, 1);
      } else {
        state.favourites.push({
          id: train.id,
          name: train.name,
          number: train.number,
          from: train.from,
          to: train.to,
          depTime: train.depTime,
          arrTime: train.arrTime,
          durationLabel: train.durationLabel,
          durationMinutes: train.durationMinutes,
          price: train.price,
          classes: train.classes,
          score: train.score,
          facilities: train.facilities,
          stops: train.stops,
        });
      }
    },
    clearFavourites(state) {
      state.favourites = [];
    },
  },
});

export const { toggleFavourite, clearFavourites } = bookingSlice.actions;
export const selectFavourites = (state) => state.booking.favourites;
export default bookingSlice.reducer;
