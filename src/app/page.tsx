import { BoardPageContainer } from "@/features/board/ui/BoardPage/BoardPageContainer";
import { withErrorBoundary } from "@/shared/hoc/withErrorBoundary";

const SafeBoard = withErrorBoundary(BoardPageContainer);

export default function Page() {
  return <SafeBoard />;
}
