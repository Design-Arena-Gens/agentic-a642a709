import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "AI 驅動創新落地藍圖",
  description:
    "以三階段推動與績效綁定策略，引導組織善用 Google AI 工具加速創新落地。"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
