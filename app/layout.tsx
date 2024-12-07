import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import type { Viewport } from 'next'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Processing Query",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://idread-chat.vercel.app/chatapp"
          />
          <meta property="og:title" content="IDRead Messaging" />
          <meta
            property="og:description"
            content="Welcome to IDRead Messaging"
          />
          <meta
            property="og:image"
            content="https://media1.giphy.com/media/RgzryV9nRCMHPVVXPV/giphy.webp?cid=790b7611g5gk0ca9aokx93n8xu5fjwfj1gr4y1a5sugp2wim&ep=v1_gifs_search&rid=giphy.webp&ct=g"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://idread-chat.vercel.app/chatapp"
          />
          <meta property="twitter:title" content="IDRead Messaging" />
          <meta
            property="twitter:description"
            content="Welcome to IDRead Messaging"
          />
        </head>
        <Script
          defer
          src="https://umami-analytics-gules.vercel.app/script.js"
          data-website-id="fe6e4139-17cc-4ae2-8813-49f5f99b79fa"
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
