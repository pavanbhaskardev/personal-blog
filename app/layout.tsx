import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import Footer from "./components/Footer";

const customFont = localFont({
  src: "../public/fonts/Virgil.ttf",
  variable: "--font-secondary",
});

const inter = Inter({ subsets: ["latin"] });

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
        className={`container ${inter.className} ${customFont.variable} grid grid-rows-[1fr_auto] min-h-screen antialiased`}
      >
        <Provider>
          <Navbar />
          <main className="mt-16">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
