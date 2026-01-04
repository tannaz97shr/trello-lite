"use client";

import { boardActions } from "@/features/board/model/boardSlice";
import { loadBoardState } from "@/features/board/services/boardPersistence";
import { store } from "@/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const persisted = loadBoardState();
    if (persisted) {
      store.dispatch(boardActions.hydrateBoard(persisted));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
