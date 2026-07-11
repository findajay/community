import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MatchBrief — Your football week, in one email",
  description:
    "Fixtures, ticket on-sales, kickoff changes and results for the clubs you follow. A 2-minute brief every week. Never miss an on-sale again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
