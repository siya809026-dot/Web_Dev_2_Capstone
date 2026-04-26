import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./playersSlice";
import matchesReducer from "./matchesSlice";
import teamsReducer from "./teamsSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    players: playersReducer,
    matches: matchesReducer,
    teams: teamsReducer,
    ui: uiReducer,
  },
});

export default store;
