import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import ApolloWrapper from "@/lib/ApolloWrapper";

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
        <ApolloWrapper>
          <NavBar />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
