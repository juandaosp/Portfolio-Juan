import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan David | AI Portfolio",
  description: "Senior AI & Frontend Architect - Morningstar Experience",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black text-white antialiased selection:bg-blue-500/30 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}