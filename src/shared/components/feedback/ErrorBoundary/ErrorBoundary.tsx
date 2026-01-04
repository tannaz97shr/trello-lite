"use client";

import React from "react";

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: 12 }}>
            <b>Something broke.</b>
            <div style={{ opacity: 0.8, marginTop: 6 }}>
              {this.state.error?.message}
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
