import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import KBarProvider from "./providers/KBarProvider";
import Footer from "./components/Footer";
import QueryProvider from "./providers/QueryProvider";

const customFont = localFont({
  src: "../public/fonts/Virgil.ttf",
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Blog🤙",
    default: "Blog🤙",
  },
  description:
    "Hi there!, i'm pavan i'm a developer & designer i write my blogs here. check it out!",
  authors: [{ name: "Pavan Bhaskar", url: "https://pavanbhaskar.com" }],
  metadataBase: new URL("https://blog.pavanbhaskar.com"),
  openGraph: {
    title: "Blog🤙",
    description:
      "Hi there!, i'm pavan i'm a developer & designer i write my blogs here. check it out!",
    url: "https://blog.pavanbhaskar.com",
    siteName: "Blog",
    images: [
      {
        url: `/og-image.png`,
        height: 630,
        width: 1200,
        alt: `og image`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`container ${GeistSans.className} ${GeistMono.variable} ${customFont.variable} grid grid-rows-[1fr_auto] min-h-screen antialiased`}
      >
        <QueryProvider>
          <KBarProvider>
            <Navbar />
            <main className="py-16 w-full overflow-x-hidden overflow-y-hidden">
              {children}
            </main>
            <Footer />
          </KBarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
