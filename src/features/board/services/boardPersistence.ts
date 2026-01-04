import { storageClient } from "@/core/storage/storageClient";
import { STORAGE_KEYS } from "@/core/storage/storageKeys";
import type { BoardState } from "../model/types";

export function loadBoardState(): BoardState | null {
  const data = storageClient.get<BoardState>(STORAGE_KEYS.BOARD_STATE);
  if (!data) return null;

  // TODO enforce validation
  // if (!validateBoardState(data)) return null;

  return data;
}

export function saveBoardState(state: BoardState): void {
  storageClient.set(STORAGE_KEYS.BOARD_STATE, state);
}
