// src/features/board/ui/ListColumn/ListColumn.tsx
"use client";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useMemo } from "react";

import { toDndCardId } from "../../lib/dnd/ids";
import type { CardEntity, CardId, ListEntity, ListId } from "../../model/types";
import { CardItem } from "../CardItem/CardItem";
import { InlineTitle } from "../InlineTitle/InlineTitle";
import styles from "./list-column.module.scss";

type Props = {
  list: ListEntity;
  cards: CardEntity[];
  commentCountByCardId: Record<string, number>;

  onRenameList: (listId: ListId, title: string) => void;
  onDeleteList: (listId: ListId) => void;

  onAddCard: (listId: ListId) => void;
  onRenameCard: (cardId: CardId, title: string) => void;
  onDeleteCard: (cardId: CardId) => void;
  onOpenComments: (cardId: CardId) => void;

  /** DnD list id: "list:<id>" */
  dndListId: string;
};

export function ListColumn({
  list,
  cards,
  commentCountByCardId,
  onRenameList,
  onDeleteList,
  onAddCard,
  onRenameCard,
  onDeleteCard,
  onOpenComments,
  dndListId,
}: Props) {
  // Sortable for the LIST (horizontal sorting handled by parent SortableContext)
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: dndListId,
    data: { kind: "LIST", listId: list.id },
  });

  // ✅ Stable callback ref to avoid "Cannot access refs during render"
  const listRef = useCallback(
    (node: HTMLElement | null) => {
      setNodeRef(node);
    },
    [setNodeRef]
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  } as const;

  // Cards are sortable within this list (vertical sorting)
  const dndCardIds = useMemo(
    () => cards.map((c) => toDndCardId(c.id)),
    [cards]
  );

  return (
    <section className={styles.column} ref={listRef} style={style}>
      {/* List header acts as drag handle */}
      <header className={styles.header} {...attributes} {...listeners}>
        <InlineTitle
          value={list.title}
          ariaLabel="Edit list title"
          onSave={(t) => onRenameList(list.id, t)}
          className={styles.listTitle}
        />

        <button
          type="button"
          className={styles.deleteList}
          onClick={() => onDeleteList(list.id)}
          aria-label="Delete list"
          title="Delete list"
        >
          …
        </button>
      </header>

      <SortableContext
        items={dndCardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.cards}>
          {cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              fromListId={list.id}
              commentCount={commentCountByCardId[card.id] ?? 0}
              onRename={onRenameCard}
              onDelete={onDeleteCard}
              onOpenComments={onOpenComments}
            />
          ))}
        </div>
      </SortableContext>

      <button
        type="button"
        className={styles.addCard}
        onClick={() => onAddCard(list.id)}
      >
        + Add another card
      </button>
    </section>
  );
}

function SortableCard({
  card,
  fromListId,
  commentCount,
  onRename,
  onDelete,
  onOpenComments,
}: {
  card: CardEntity;
  fromListId: ListId;
  commentCount: number;
  onRename: (cardId: CardId, title: string) => void;
  onDelete: (cardId: CardId) => void;
  onOpenComments: (cardId: CardId) => void;
}) {
  const dndId = toDndCardId(card.id);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: dndId,
    data: { kind: "CARD", cardId: card.id, fromListId },
  });

  // ✅ Stable callback ref to avoid "Cannot access refs during render"
  const cardRef = useCallback(
    (node: HTMLElement | null) => {
      setNodeRef(node);
    },
    [setNodeRef]
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  } as const;

  return (
    <div ref={cardRef} style={style} {...attributes} {...listeners}>
      <CardItem
        card={card}
        commentCount={commentCount}
        onRename={onRename}
        onDelete={onDelete}
        onOpenComments={onOpenComments}
      />
    </div>
  );
}
