/** Branded IDs for type-safety (prevents mixing listId/cardId by accident) */
export type Brand<K, T extends string> = K & { readonly __brand: T };

export type BoardId = Brand<string, "BoardId">;
export type ListId = Brand<string, "ListId">;
export type CardId = Brand<string, "CardId">;
export type CommentId = Brand<string, "CommentId">;

export type ISODateString = Brand<string, "ISODateString">;

export interface BoardMeta {
  id: BoardId;
  title: string;
}

export interface ListEntity {
  id: ListId;
  title: string;
  /** Ordered cards inside this list */
  cardIds: CardId[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CardEntity {
  id: CardId;
  title: string;
  /** Future-proof: you can add description later */
  description?: string;
  commentIds: CommentId[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CommentEntity {
  id: CommentId;
  cardId: CardId;
  text: string;
  createdAt: ISODateString;
}

export interface BoardState {
  board: BoardMeta;

  /** Lists normalized by id */
  listsById: Record<string, ListEntity>;
  /** Order of lists in the board */
  listOrder: ListId[];

  /** Cards normalized by id */
  cardsById: Record<string, CardEntity>;

  /** Comments normalized by id */
  commentsById: Record<string, CommentEntity>;

  /**
   * Basic UI state related to board feature.
   * Keep “UI-only” stuff here, not in shared/theme slice.
   */
  ui: {
    activeCardId: CardId | null;
    isCommentsModalOpen: boolean;
  };
}

/** Helper payloads */
export type CreateListPayload = {
  title?: string;
  /** If provided, insert list after this list */
  afterListId?: ListId;
};

export type RenameListPayload = {
  listId: ListId;
  title: string;
};

export type DeleteListPayload = {
  listId: ListId;
};

export type MoveListPayload = {
  activeListId: ListId;
  overListId: ListId;
};

export type CreateCardPayload = {
  listId: ListId;
  title?: string;
  /** If provided, insert card after this card inside the list */
  afterCardId?: CardId;
};

export type RenameCardPayload = {
  cardId: CardId;
  title: string;
};

export type DeleteCardPayload = {
  cardId: CardId;
};

export type MoveCardPayload = {
  cardId: CardId;
  fromListId: ListId;
  toListId: ListId;
  /**
   * If provided, card will be inserted before this card in destination list.
   * If not provided, it will be appended.
   */
  overCardId?: CardId;
};

export type AddCommentPayload = {
  cardId: CardId;
  text: string;
};

export type DeleteCommentPayload = {
  commentId: CommentId;
};

export type OpenCommentsPayload = {
  cardId: CardId;
};
