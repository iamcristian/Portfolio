import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "@/context/ConfigContext";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
});

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
      <body className={`${poppins.className} dark text-xs md:text-sm`}>
        <ConfigProvider>
          <Navbar />
          {children}
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
