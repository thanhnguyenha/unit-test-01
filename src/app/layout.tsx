import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Next.js application with Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
