"use client";

import { ConfigContext } from "@/context/ConfigContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { MdMenu } from "react-icons/md";

export const Navbar = () => {
  const { theme, toggleTheme, language, toggleLanguage } =
    useContext(ConfigContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full flex flex-row justify-between md:justify-around items-center h-12 top-0 px-5 sm:px-8 md:px-[8%] xl:px-[20%] text-black dark:text-white bg-white dark:bg-black border-b-2 border-b-black dark:border-b-white transition-colors duration-1000">
      <Link href={"/"} className="w-1/2 md:w-1/4">
        Cristian Arando
      </Link>

      <nav
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-12 left-0 md:static w-4/6 h-3/4 flex flex-col md:flex-row justify-center items-center gap-10 transition-transform duration-1000 md:translate-x-0 md:flex`}
      >
        <Link className="md:hover:underline" href="#home">
          Home
        </Link>
        <Link className="md:hover:underline" href="#about">
          About
        </Link>
        <Link className="md:hover:underline" href="#skills">
          Skills
        </Link>
        <Link className="md:hover:underline" href="#projects">
          Experience
        </Link>
        <Link className="md:hover:underline" href="#contact">
          Contact
        </Link>
      </nav>

      <div className="flex gap-3 w-1/2 md:w-1/4 justify-end items-center">
        {theme === "light" ? (
          <FaMoon
            className="cursor-pointer"
            size={"1.5rem"}
            onClick={toggleTheme}
          />
        ) : (
          <IoIosSunny
            className="cursor-pointer"
            size={"1.5rem"}
            color="yellow"
            onClick={toggleTheme}
          />
        )}
        <button className="uppercase mr-5 md:mr-0" onClick={toggleLanguage}>
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
