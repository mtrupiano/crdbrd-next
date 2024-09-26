import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "crdbrd",
  description: "crdbrd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
