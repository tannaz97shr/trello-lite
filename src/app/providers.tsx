"use client";

import { ThemeProvider } from "@/features/theme/providers/ThemeProvider";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
