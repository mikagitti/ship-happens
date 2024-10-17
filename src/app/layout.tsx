import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sink or Swim",
  description: "You either sink or you swim.",
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
