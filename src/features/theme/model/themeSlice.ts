import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode, ThemeState } from "./types";

const initialState: ThemeState = { mode: "light" };

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const themeActions = slice.actions;
export const themeReducer = slice.reducer;
