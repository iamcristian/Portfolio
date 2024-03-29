"use client";

import { useAppContext } from "@/context/ConfigContext";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { MdMenu } from "react-icons/md";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";

export const Navbar = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();

  const translations = language === "es" ? esTranslations : enTranslations;
  const { home, about, contact, experience, skills } = translations.navbar;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky w-full flex flex-row justify-between md:justify-around items-center h-12 lg:h-20 top-0 px-5 sm:px-8 md:px-[8%] xl:px-[20%] text-black dark:text-white bg-white font-bold dark:bg-black border-b-2 border-b-black dark:border-b-white transition-colors duration-700">
      <Link href={"/"} className="w-1/2 md:w-1/4">
        Cristian Arando
      </Link>

      <nav
        className={`${menuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-12 left-0 md:static  w-4/6 h-3/4 flex flex-col md:flex-row justify-center items-center gap-10 md:translate-x-0 md:flex text-black dark:text-white bg-slate-50 dark:bg-slate-800 md:bg-white md:dark:bg-black transition-all duration-700`}
      >
        <Link className="md:hover:underline" href="#home">
          {home}
        </Link>
        <Link className="md:hover:underline" href="#about">
          {about}
        </Link>
        <Link className="md:hover:underline" href="#skills">
          {skills}
        </Link>
        <Link className="md:hover:underline" href="#projects">
          {experience}
        </Link>
        <Link className="md:hover:underline" href="#contact">
          {contact}
        </Link>
      </nav>

      <div className="flex gap-3 w-1/2 md:w-1/4 justify-end items-center">
        {theme === "light" ? (
          <FaMoon
            className="cursor-pointer text-sky-700"
            size={"1.2rem"}
            onClick={toggleTheme}
          />
        ) : (
          <IoIosSunny
            className="cursor-pointer text-sky-300"
            size={"1.2rem"}
            onClick={toggleTheme}
          />
        )}
        <button className="uppercase mr-5 md:mr-0 w-2" onClick={toggleLanguage}>
          {language}
        </button>
        {menuOpen ? (
          <CgClose
            size={20}
            className="md:hidden cursor-pointer"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        ) : (
          <MdMenu
            size={20}
            className="md:hidden cursor-pointer"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        )}
      </div>
    </header>
  );
};
