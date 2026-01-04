import { BoardPageSkeleton } from "@/features/board/ui/BoardPage/BoardPageSkeleton";
import { Suspense } from "react";
import BoardWithDelay from "./BoardWithDelay";

export default function Page() {
  return (
    <Suspense fallback={<BoardPageSkeleton />}>
      <BoardWithDelay />
    </Suspense>
  );
}
