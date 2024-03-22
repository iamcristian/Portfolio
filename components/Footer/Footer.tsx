"use client";

import Link from "next/link";
import { GrGithub, GrLinkedin } from "react-icons/gr";

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center px-5 sm:px-8 md:px-[8%] xl:px-[20%] gap-5 md:gap-10 h-full py-10 bg-white text-black dark:bg-black dark:text-white transition-colors duration-1000">
      <h3 >Cristian Arando</h3>
      <section className="flex gap-5 md:gap-10">
        <Link href="#about">About</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#projects">Experience</Link>
      </section>
      <section className="flex gap-3 md:gap-6">
        <Link href="https://github.com/iamcristian" target="_blank">
          <GrGithub size={30} />
        </Link>
        <Link href="https://www.linkedin.com/in/cristianarando" target="_blank">
          <GrLinkedin size={30} />
        </Link>
      </section>
      <p className="text-center">
        © {new Date().getFullYear()} Made by Cristian Arando
      </p>
    </footer>
  );
};
