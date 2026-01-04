import { boardReducer } from "@/features/board/model/boardSlice";
import { combineReducers } from "@reduxjs/toolkit";

// TODO : add theme reducers here

export const rootReducer = combineReducers({
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
