"use client";
import styles from "./button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

export function Button({ variant = "ghost", className, ...props }: Props) {
  return (
    <button
      {...props}
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
