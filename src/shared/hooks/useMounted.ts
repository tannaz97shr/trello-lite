"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true after hydration (client mount), false on server.
 * No setState in effects → no cascading render warnings.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    // subscribe
    () => () => {},
    // getSnapshot (client)
    () => true,
    // getServerSnapshot (server)
    () => false
  );
}
