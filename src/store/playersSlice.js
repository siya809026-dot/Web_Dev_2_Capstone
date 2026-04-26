import { createSlice } from "@reduxjs/toolkit";
import { PLAYERS } from "../data/mockData";

const initialState = {
  all: PLAYERS,
  favourites: [],
  searchQuery: "",
  filterRole: "All",
  sortBy: "name",
  sortOrder: "asc",
  loading: false,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const id = action.payload;
      const player = state.all.find((p) => p.id === id);
      if (player) {
        player.isFav = !player.isFav;
        state.favourites = state.all.filter((p) => p.isFav);
      }
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { toggleFavourite, setSearch, setFilterRole, setSortBy, setSortOrder } =
  playersSlice.actions;

// Selectors
export const selectFilteredPlayers = (state) => {
  let result = [...state.players.all];

  if (state.players.searchQuery) {
    const q = state.players.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
    );
  }

  if (state.players.filterRole !== "All") {
    result = result.filter((p) => p.role === state.players.filterRole);
  }

  const key = state.players.sortBy;
  result.sort((a, b) => {
    if (typeof a[key] === "string") {
      return state.players.sortOrder === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
    return state.players.sortOrder === "asc" ? a[key] - b[key] : b[key] - a[key];
  });

  return result;
};

export default playersSlice.reducer;
