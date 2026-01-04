"use client";

import { ErrorBoundary } from "@/shared/components/feedback/ErrorBoundary/ErrorBoundary";
import React from "react";

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  const Wrapped = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  Wrapped.displayName = `withErrorBoundary(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
}
