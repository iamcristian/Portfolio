"use client";

import { GlobalStateContext } from "@/context/GlobalStateContext";
import Link from "next/link";
import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

export const Navbar = () => {
  const { language, setLanguage, setTheme, theme } =
    useContext(GlobalStateContext);

  const handleLanguageChange = () => {
    if (language === "en") {
      setLanguage("es");
    } else {
      setLanguage("en");
    }
  };

  return (
    <header className="fixed w-full flex flex-col md:flex-row justify-around items-center h-12 text-base mx-2 top-0">
      <Link href={"/"} className="md:w-1/4">Cristian Arando</Link>
      <nav className="flex justify-center items-center gap-5 text-sm">
        <Link href="#home">Home</Link>
        <Link href="#about">About</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#contact">Contact</Link>
      </nav>
      <div className="flex gap-3 md:w-1/4 justify-end items-center">
        {theme === "light" ? (
          <IoIosSunny size={20} onClick={() => setTheme("dark")} />
        ) : (
          <FaMoon size={20} onClick={() => setTheme("light")} />
        )}
        <button className="uppercase" onClick={handleLanguageChange}>
          {language}
        </button>
      </div>
    </header>
  );
};
