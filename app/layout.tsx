import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "@/context/ConfigContext";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cristian Arando | Portfolio | Software Developer",
  description:
    "Hello! I'm Cristian Arando, a passionate web developer. Explore my portfolio to discover the projects and skills I've developed in the field of web development.",
  keywords: [
    "Cristian Arando",
    "Cristian Arando Quecaña",
    "portfolio",
    "web development",
    "projects",
    "skills",
    "web developer",
    "software engineer",
    "systems engineer",
  ],
  authors: [{ name: "Cristian Arando", url: "https://cristianarando.tech" }],
  icons: [
    {
      rel: "icon",
      url: "public/icon.svg",
    },
  ],
  openGraph: {
    title: "Cristian Arando | Portfolio | Software Developer",
    description:
      "Welcome to my portfolio! I'm Cristian Arando, a systems engineer from Cochabamba, Bolivia, from Universidad Mayor de San Simón. I specialize in software development, and here you can discover my projects and skills in this field.",
    images: [
      {
        url: "public/me.webp",
        width: 400,
        height: 400,
        alt: "Cristian Arando | Portfolio | Software Developer",
      },
      {
        url: "public/dark-portfolio.webp",
        width: 1200,
        height: 630,
        alt: "Capture of Cristian Arando's portfolio in dark mode",
      },
      {
        url: "public/white-portfolio.webp",
        width: 1200,
        height: 630,
        alt: "Capture of Cristian Arando's portfolio in light mode",
      },
    ],
    type: "website",
    url: "https://cristianarando.tech",
  },
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
          <hr style={{ borderColor: "rgb(47 47 47)" }} />
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
