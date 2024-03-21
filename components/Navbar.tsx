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
    <header className="fixed w-full flex flex-row justify-between md:justify-around items-center h-12 text-base top-0 px-5 md:px-10">
      <Link href={"/"} className="w-1/2 md:w-1/4">
        Cristian Arando
      </Link>

      <nav
        className={`${
          !menuOpen && "hidden md:flex"
        } fixed top-12 left-0 md:static  w-4/6 h-3/4 flex flex-col md:flex-row justify-center items-center gap-10 text-base md:text-sm`}
      >
        <Link href="#home">Home</Link>
        <Link href="#about">About</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#projects">Experience</Link>
        <Link href="#contact">Contact</Link>
      </nav>

      <div className="flex gap-3 w-1/2 md:w-1/4 justify-end items-center">
        {theme === "light" ? (
          <FaMoon size={20} onClick={toggleTheme} />
        ) : (
          <IoIosSunny size={20} onClick={toggleTheme} />
        )}
        <button className="uppercase mr-5 md:mr-0" onClick={toggleLanguage}>
          {language}
        </button>
        {menuOpen ? (
          <CgClose
            size={20}
            className="md:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        ) : (
          <MdMenu
            size={20}
            className="md:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        )}
      </div>
    </header>
  );
};
