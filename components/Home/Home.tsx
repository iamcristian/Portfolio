"use client";

import { useAppContext } from "@/context/ConfigContext";
import Image from "next/image";
import { GrDownload, GrLinkedin, GrMail } from "react-icons/gr";
import { ReactTyped } from "react-typed";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";
import Link from "next/link";

export const Home = () => {
  const { language } = useAppContext();
  const translations = language === "es" ? esTranslations : enTranslations;
  const { presentation, job, situation, description, contactMe, downloadCV } =
    translations.home;
  return (
    <section
      className="section-page flex flex-col justify-center pb-0 h-[80vh] md:h-screen md:pb-0 md:pt-0 font-medium md:justify-center"
      id="home"
    >
      <div className="flex gap-4 mb-4 items-center">
        <Image
          className="rounded-xl shadow-lg size-16"
          src="/me.webp"
          alt="Cristian Arando"
          width={60}
          height={60}
        />
        <p className="text-sm lg:text-lg">{presentation}</p>
      </div>
      <h1 className="text-2xl lg:text-5xl font-bold tracking-tight dark:text-white">
        Cristian Arando
      </h1>
      <ReactTyped
        className="text-xl font-semibold"
        strings={[job]}
        typeSpeed={100}
        backDelay={5000}
        loop
      />
      <p className="font-semibold text-md my-5 w-[60%]">
        <strong className="text-sky-700 font-semibold dark:text-sky-400">
          {situation}
        </strong>{" "}
        {description}
      </p>

      <div className="flex gap-5">
        <Link
          href="mailto:crisarandosyse@gmail.com"
          className="flex items-center gap-2 text-xs rounded-lg border border-black dark:border-white p-2 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-black dark:text-white transition-colors duration-700"
        >
          <GrMail size={20} />
          {contactMe}
        </Link>
        <Link
          href="https://www.linkedin.com/in/cristianarando"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs rounded-lg border p-2 border-black dark:border-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-black dark:text-white transition-colors duration-700"
        >
          <GrLinkedin size={20} />
          Linkedin
        </Link>
        <Link
          href={language === "en" ? "/CV_EN.pdf" : "/CV_ES.pdf"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs rounded-lg border p-2 bg-slate-900 hover:bg-slate-700 text-white dark:bg-sky-800 dark:hover:bg-sky-600 border-black dark:border-solid transition-colors duration-700"
        >
          <GrDownload size={20} />
          {downloadCV}
        </Link>
      </div>
    </section>
  );
};
