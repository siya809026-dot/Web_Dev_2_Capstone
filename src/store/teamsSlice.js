import { createSlice } from "@reduxjs/toolkit";
import { TEAMS } from "../data/mockData";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    all: TEAMS,
    selectedTeam: null,
  },
  reducers: {
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
  },
});

export const { setSelectedTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
