import { configureStore } from "@reduxjs/toolkit";
import { persistBoardMiddleware } from "./middleware/persistBoard";
import { rootReducer } from "./rootReducer";

/**
 * Store config:
 * - Redux Toolkit defaults are fine (includes thunk, serializable check, etc.)
 * - We add a small middleware to persist board slice to localStorage.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Our state contains Date strings and branded types. Still serializable.
      serializableCheck: true,
    }).concat(persistBoardMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
