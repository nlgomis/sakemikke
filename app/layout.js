// app/layout.js

"use client";

import { Shippori_Mincho } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import GradientBackground from "./components/GradientBackground";

// Shippori Mincho フォントの設定
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-shippori",
  preload: true,
});

function ClientWrapper({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={shipporiMincho.variable}>
      <body className=" bg-[url('/images/background.png')] overflow-x-hidden font-shippori">
        <GradientBackground className="fixed inset-0 z-0" />
        <ClientWrapper>
          <Navigation />
          <div>{children}</div>
        </ClientWrapper>
      </body>
    </html>
  );
}
