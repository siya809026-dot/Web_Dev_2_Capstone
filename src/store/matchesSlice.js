import { createSlice } from "@reduxjs/toolkit";
import { MATCHES } from "../data/mockData";

const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    all: MATCHES,
    filter: "All",
  },
  reducers: {
    setMatchFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setMatchFilter } = matchesSlice.actions;
export default matchesSlice.reducer;
