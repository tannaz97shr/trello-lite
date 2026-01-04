"use client";
import styles from "./skeleton.module.scss";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={[styles.skeleton, className].filter(Boolean).join(" ")} />
  );
}
