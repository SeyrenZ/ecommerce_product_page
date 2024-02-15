import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";

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
      <body className={KumbhSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
