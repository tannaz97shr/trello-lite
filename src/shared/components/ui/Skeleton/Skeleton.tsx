"use client";

import styles from "./skeleton.module.scss";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  radius?: "sm" | "md" | "lg";
};

export function Skeleton({ className, radius = "md", ...props }: Props) {
  return (
    <div
      {...props}
      className={[styles.skeleton, styles[radius], className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}
