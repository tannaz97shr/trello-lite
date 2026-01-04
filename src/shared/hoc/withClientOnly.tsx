"use client";

import { useMounted } from "@/shared/hooks/useMounted";

export function withClientOnly<P extends object>(
  Component: React.ComponentType<P>
) {
  const Wrapped = (props: P) => {
    const mounted = useMounted();
    if (!mounted) return null; // or a Skeleton
    return <Component {...props} />;
  };

  Wrapped.displayName = `withClientOnly(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
}
