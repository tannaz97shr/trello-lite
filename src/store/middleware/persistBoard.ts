import { saveBoardState } from "@/features/board/services/boardPersistence";
import type { Middleware } from "@reduxjs/toolkit";

/**
 * Persist board slice to localStorage after any action that changes it.
 * We do a cheap reference check to avoid saving on unrelated actions.
 */
export const persistBoardMiddleware: Middleware = (storeApi) => {
  let lastBoardRef: unknown = null;

  return (next) => (action) => {
    const prevBoard = storeApi.getState().board;
    const result = next(action);
    const nextBoard = storeApi.getState().board;

    // If board slice reference changed, persist it.
    if (prevBoard !== nextBoard && lastBoardRef !== nextBoard) {
      lastBoardRef = nextBoard;
      try {
        saveBoardState(nextBoard);
      } catch {
        // Don’t crash the app because localStorage is angry.
        // Real error UX handled by ErrorBoundary / toast later if you want.
      }
    }

    return result;
  };
};
