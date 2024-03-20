import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cristian Arando | Portfolio",
  description:
    "Welcome to my portfolio! I showcase my projects and skills in web development.",
  keywords: [
    "portfolio",
    "web development",
    "projects",
    "skills",
    "Cristian Arando",
    "cristian",
    "arando",
    "cristian arando",
    "web developer",
    "developer",
    "software engineer",
  ],
  authors: [{ name: "Cristian Arando", url: "https://cristianarando.dev" }],
  icons: [
    {
      rel: "icon",
      url: "public/icon.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
