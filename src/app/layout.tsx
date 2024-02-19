" use client";
import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";
import { CartProvider } from "./components/context/CartContext";
const KumbhSans = Kumbh_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Product Page",
  description: "Created by Kaiser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={KumbhSans.className}>
          <Navbar />
          {children}
        </body>
      </CartProvider>
    </html>
  );
}
