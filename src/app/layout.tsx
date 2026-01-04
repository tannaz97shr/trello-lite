import type { Metadata } from "next";
import Providers from "./providers";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "Trello Lite",
  description: "A simple Trello clone for interview purposes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
