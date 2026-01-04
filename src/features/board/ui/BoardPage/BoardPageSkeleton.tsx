"use client";

import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import styles from "./board-page-skeleton.module.scss";

export function BoardPageSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Skeleton className={styles.brand} radius="lg" />
        <Skeleton className={styles.title} radius="md" />
        <Skeleton className={styles.icon} radius="md" />
      </div>

      <div className={styles.canvas}>
        <div className={styles.lists}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.column}>
              <Skeleton className={styles.colHeader} radius="md" />
              <div className={styles.cards}>
                <Skeleton className={styles.card} radius="md" />
                <Skeleton className={styles.card} radius="md" />
                <Skeleton className={styles.card} radius="md" />
              </div>
              <Skeleton className={styles.addBtn} radius="md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
