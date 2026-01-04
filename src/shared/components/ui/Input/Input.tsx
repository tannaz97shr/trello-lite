"use client";

import { forwardRef } from "react";
import styles from "./input.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={[styles.input, className].filter(Boolean).join(" ")}
    />
  );
});
