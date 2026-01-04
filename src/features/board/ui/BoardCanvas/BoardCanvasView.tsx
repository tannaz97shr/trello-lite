"use client";

import { EmptyState } from "@/shared/components/feedback/EmptyState/EmptyState";
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
import { toDndListId } from "../../lib/dnd/ids";
import type { CardEntity, CardId, ListEntity, ListId } from "../../model/types";
import { ListColumn } from "../ListColumn/ListColumn";
import styles from "./board-canvas.module.scss";

type Column = { list: ListEntity; cards: CardEntity[] };

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
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const listIds = columns.map((c) => toDndListId(c.list.id));

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
                  // list header actions
                  onRenameList={onRenameList}
                  onDeleteList={onDeleteList}
                  // card actions
                  onAddCard={onAddCard}
                  onRenameCard={onRenameCard}
                  onDeleteCard={onDeleteCard}
                  onOpenComments={onOpenComments}
                  // DnD ids for internals
                  dndListId={toDndListId(list.id)}
                  // dndCardIds={cards.map((c) => toDndCardId(c.id))}
                />
              ))
            ) : (
              <EmptyState
                title="No lists yet"
                description="Create your first list to get started."
              />
            )}
          </SortableContext>

          <button type="button" className={styles.addList} onClick={onAddList}>
            + Add another list
          </button>
        </div>
      </main>
    </DndContext>
  );
}
