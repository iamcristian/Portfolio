"use client";

import Link from "next/link";
import { GrGithub, GrLinkedin } from "react-icons/gr";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";
import { useAppContext } from "@/context/ConfigContext";

export const Footer = () => {
  const { language } = useAppContext();
  const translations = language === "es" ? esTranslations : enTranslations;
  const { footer, about, skills, experience } = translations;

  const { title: aboutTitle } = about;
  const { title: skillsTitle } = skills;
  const { title: experienceTitle } = experience;
  const { end } = footer;
  return (
    <footer className="flex flex-col justify-center items-center px-5 sm:px-8 md:px-[8%] xl:px-[20%] gap-5 md:gap-10 h-full py-10 bg-white text-black dark:bg-black dark:text-white transition-colors duration-1000">
      <h3 className="font-bold text-lg">Cristian Arando</h3>
      <section className="flex gap-5 md:gap-10">
        <Link href="#about">{aboutTitle}</Link>
        <Link href="#skills">{skillsTitle}</Link>
        <Link href="#projects">{experienceTitle}</Link>
      </section>
      <section className="flex gap-3 md:gap-6">
        <Link href="https://github.com/iamcristian" target="_blank">
          <GrGithub size={"1.5rem"} />
        </Link>
        <Link href="https://www.linkedin.com/in/cristianarando" target="_blank">
          <GrLinkedin size={"1.5rem"} />
        </Link>
      </section>
      <p className="text-center">
        © {new Date().getFullYear()} {end}
      </p>
    </footer>
  );
};
