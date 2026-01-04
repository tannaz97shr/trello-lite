import BoardClient from "./BoardClient";

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default async function BoardWithDelay() {
  await sleep(900);
  return <BoardClient />;
}
