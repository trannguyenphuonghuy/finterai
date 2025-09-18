import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FINTER"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
