"use client";

import Link from "next/link";
import { GrGithub, GrLinkedin } from "react-icons/gr";

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-10 h-full text-base py-10">
      <h3 className="text-2xl">Cristian Arando</h3>
      <section className="flex gap-10">
        <Link href="#about">About</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#projects">Experience</Link>
      </section>
      <section className="flex gap-6">
        <GrGithub size={30} />
        <GrLinkedin size={30} />
      </section>
      <p className="text-center">
        © {new Date().getFullYear()} Made by Cristian Arando
      </p>
    </footer>
  );
};
