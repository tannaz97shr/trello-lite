import type {
  BoardId,
  BoardState,
  CardId,
  CommentId,
  ISODateString,
  ListId,
} from "./types";

/**
 * Demo initial board matching a simple Trello-like screenshot.
 * You can replace this with a factory that reads from localStorage later.
 */
export function createInitialBoardState(): BoardState {
  const now = new Date().toISOString() as ISODateString;

  const boardId = "board_demo" as BoardId;

  const todoId = "list_todo" as ListId;
  const inProgressId = "list_in_progress" as ListId;
  const doneId = "list_done" as ListId;

  const c1 = "card_create_interview_kanban" as CardId;
  const c2 = "card_review_drag_drop" as CardId;
  const c3 = "card_setup_next_app" as CardId;

  const cm1 = "comment_1" as CommentId;
  const cm2 = "comment_2" as CommentId;

  return {
    board: {
      id: boardId,
      title: "Demo Board",
    },

    listOrder: [todoId, inProgressId, doneId],

    listsById: {
      [todoId]: {
        id: todoId,
        title: "Todo",
        cardIds: [c1, c2],
        createdAt: now,
        updatedAt: now,
      },
      [inProgressId]: {
        id: inProgressId,
        title: "In Progress",
        cardIds: [c3],
        createdAt: now,
        updatedAt: now,
      },
      [doneId]: {
        id: doneId,
        title: "Done",
        cardIds: [],
        createdAt: now,
        updatedAt: now,
      },
    },

    cardsById: {
      [c1]: {
        id: c1,
        title: "Create interview Kanban",
        commentIds: [cm1],
        createdAt: now,
        updatedAt: now,
      },
      [c2]: {
        id: c2,
        title: "Review Drag & Drop",
        commentIds: [],
        createdAt: now,
        updatedAt: now,
      },
      [c3]: {
        id: c3,
        title: "Set up Next.js project",
        commentIds: [cm2],
        createdAt: now,
        updatedAt: now,
      },
    },

    commentsById: {
      [cm1]: {
        id: cm1,
        cardId: c1,
        text: "Remember: clean architecture, not “it works on my machine”.",
        createdAt: now,
      },
      [cm2]: {
        id: cm2,
        cardId: c3,
        text: "App Router + RTK + SCSS baseline first.",
        createdAt: now,
      },
    },

    ui: {
      activeCardId: null,
      isCommentsModalOpen: false,
    },
  };
}
