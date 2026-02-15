import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan David | AI Portfolio",
  description: "Senior AI & Frontend Architect - Morningstar Experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}