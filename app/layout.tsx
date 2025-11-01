import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5 Questions Daily",
  description: "Little game to play with my best girlfriend in this world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-stone-100">{children}</body>
    </html>
  );
}
