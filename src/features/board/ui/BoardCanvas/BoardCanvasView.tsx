"use client";

import { EmptyState } from "@/shared/components/feedback/EmptyState/EmptyState";
import { Button } from "@/shared/components/ui";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import { toDndListId } from "../../lib/dnd/ids";
import type { CardEntity, CardId, ListEntity, ListId } from "../../model/types";
import { ListColumn } from "../ListColumn/ListColumn";
import styles from "./board-canvas.module.scss";

type Column = { list: ListEntity; cards: CardEntity[] };
type ListOption = { id: ListId; title: string };

type Props = {
  columns: Column[];
  commentCountByCardId: Record<string, number>;
  onDragEnd: (e: DragEndEvent) => void;

  onAddList: () => void;
  onRenameList: (listId: ListId, title: string) => void;
  onDeleteList: (listId: ListId) => void;

  onAddCard: (listId: ListId) => void;
  onRenameCard: (cardId: CardId, title: string) => void;
  onDeleteCard: (cardId: CardId) => void;
  onOpenComments: (cardId: CardId) => void;

  /** NEW: for mobile move/status button */
  allLists: ListOption[];
  onMoveCard: (cardId: CardId, toListId: ListId) => void;
};

export function BoardCanvasView({
  columns,
  commentCountByCardId,
  onDragEnd,
  onAddList,
  onRenameList,
  onDeleteList,
  onAddCard,
  onRenameCard,
  onDeleteCard,
  onOpenComments,
  allLists,
  onMoveCard,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const listIds = useMemo(
    () => columns.map((c) => toDndListId(c.list.id)),
    [columns]
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <main className={styles.canvas}>
        <div className={styles.lists}>
          <SortableContext
            items={listIds}
            strategy={horizontalListSortingStrategy}
          >
            {columns.length ? (
              columns.map(({ list, cards }) => (
                <ListColumn
                  key={list.id}
                  list={list}
                  cards={cards}
                  commentCountByCardId={commentCountByCardId}
                  onRenameList={onRenameList}
                  onDeleteList={onDeleteList}
                  onAddCard={onAddCard}
                  onRenameCard={onRenameCard}
                  onDeleteCard={onDeleteCard}
                  onOpenComments={onOpenComments}
                  dndListId={toDndListId(list.id)}
                  allLists={allLists}
                  onMoveCard={onMoveCard}
                />
              ))
            ) : (
              <EmptyState
                title="No lists yet"
                description="Create your first list to get started."
              />
            )}
          </SortableContext>

          <Button type="button" className={styles.addList} onClick={onAddList}>
            + Add another list
          </Button>
        </div>
      </main>
    </DndContext>
  );
}
