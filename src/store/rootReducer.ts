import { boardReducer } from "@/features/board/model/boardSlice";
import { themeReducer } from "@/features/theme";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  board: boardReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
