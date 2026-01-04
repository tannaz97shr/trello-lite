import { storageClient } from "@/core/storage/storageClient";
import { STORAGE_KEYS } from "@/core/storage/storageKeys";
import type { BoardState } from "../model/types";
import { validateBoardState } from "../model/validators";

export function loadBoardState(): BoardState | null {
  const data = storageClient.get<unknown>(STORAGE_KEYS.BOARD_STATE);
  if (!data) return null;

  if (!validateBoardState(data)) {
    // corrupted/old shape: clear it so we don't keep crashing forever
    storageClient.remove(STORAGE_KEYS.BOARD_STATE);
    return null;
  }

  return data;
}

export function saveBoardState(state: BoardState): void {
  storageClient.set(STORAGE_KEYS.BOARD_STATE, state);
}
