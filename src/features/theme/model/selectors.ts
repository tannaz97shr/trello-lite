import type { RootState } from "@/store/rootReducer";
export const selectThemeMode = (s: RootState) => s.theme?.mode ?? "light";
