"use client";
import styles from "./input.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={[styles.input, className].filter(Boolean).join(" ")}
    />
  );
}
