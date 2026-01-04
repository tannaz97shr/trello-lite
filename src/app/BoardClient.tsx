"use client";

import { BoardPageContainer } from "@/features/board/ui/BoardPage/BoardPageContainer";
import { ErrorBoundary } from "@/shared/components/feedback/ErrorBoundary/ErrorBoundary";

export default function BoardClient() {
  return (
    <ErrorBoundary>
      <BoardPageContainer />
    </ErrorBoundary>
  );
}
