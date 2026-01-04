"use client";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useMemo, useState } from "react";

import { ConfirmDialog } from "@/shared/components/feedback/ConfirmDialog/ConfirmDialog";
import { EmptyState } from "@/shared/components/feedback/EmptyState/EmptyState";
import { Button, IconButton } from "@/shared/components/ui";

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
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  // Stable callback ref to avoid "Cannot access refs during render"
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

        {/* Stop propagation so clicking delete doesn't start a drag */}
        <IconButton
          type="button"
          className={styles.deleteList}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setConfirmOpen(true);
          }}
          aria-label="Delete list"
          title="Delete list"
        >
          <TrashIcon />
        </IconButton>
      </header>

      <SortableContext
        items={dndCardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.cards}>
          {cards.length === 0 ? (
            <EmptyState
              title="No cards"
              description="Add a card to start tracking work."
            />
          ) : (
            cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                fromListId={list.id}
                commentCount={commentCountByCardId[card.id] ?? 0}
                onRename={onRenameCard}
                onDelete={onDeleteCard}
                onOpenComments={onOpenComments}
              />
            ))
          )}
        </div>
      </SortableContext>

      <Button
        type="button"
        variant="ghost"
        className={styles.addCard}
        onClick={() => onAddCard(list.id)}
      >
        + Add another card
      </Button>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete list?"
        description={
          cards.length > 0
            ? `This will delete “${list.title || "Untitled"}” and its ${
                cards.length
              } card(s). This can't be undone.`
            : `This will delete “${
                list.title || "Untitled"
              }”. This can't be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onDeleteList(list.id)}
      />
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

  // Stable callback ref to avoid "Cannot access refs during render"
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

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <path
        fill="currentColor"
        d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v10h-2V9zm4 0h2v10h-2V9zM7 9h2v10H7V9zm-1 12h12a2 2 0 0 0 2-2V7H4v12a2 2 0 0 0 2 2z"
      />
    </svg>
  );
}
