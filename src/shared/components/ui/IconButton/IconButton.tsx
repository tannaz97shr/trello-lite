"use client";
import styles from "./icon-button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ className, ...props }: Props) {
  return (
    <button
      {...props}
      className={[styles.iconBtn, className].filter(Boolean).join(" ")}
    />
  );
}
