"use client";

import { useAppContext } from "@/context/ConfigContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsAward } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";
import { FaGraduationCap, FaSuitcase } from "react-icons/fa";

export const About = () => {
  const { language } = useAppContext();
  const translations = language === "es" ? esTranslations : enTranslations;

  const { title, content, experience, years, completed, projects, certifications, count, contact } = translations.about;

  return (
    <section className="section-page h-full" id="about">
      <h2 className="items-center mt-2 mb-10">
        <MdPersonSearch size={"1.5rem"} className="inline-block mr-2" /> {title}
      </h2>

      <div className="h-full flex flex-col items-center justify-center gap-6 md:flex-row md:justify-around md:gap-12 xl:gap-28 px-20">
        <Image
          src="/me.webp"
          alt="Cristian Arando"
          width={300}
          height={300}
          className="rounded-xl w-56 mx-auto md:w-72"
        />

        <div className="flex flex-col items-center md:items-start">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col items-center justify-center w-28 border border-black dark:border-white dark:bg-slate-900 p-2 rounded">
              <BsAward className="text-xl text-blue-500 mb-2" />
              <h3 className="text-black dark:text-white">{experience}</h3>
              <p className="text-xxs text-black dark:text-gray-200">{years}</p>
            </div>

            <div className="flex flex-col items-center justify-center w-28 border border-black dark:border-white dark:bg-slate-900 p-2 rounded">
              <FaSuitcase className="text-xl text-blue-500 mb-2" />
              <h3 className=" text-black dark:text-white">{completed}</h3>
              <p className="text-xxs text-black dark:text-gray-200">{projects}</p>
            </div>

            <div className="flex flex-col items-center justify-center w-28 border border-black dark:border-white dark:bg-slate-900 p-2 rounded">
              <FaGraduationCap className="text-xl text-blue-500 mb-2" />
              <h3 className=" text-black dark:text-white">{certifications}</h3>
              <p className="text-xxs text-black dark:text-gray-200">{count}</p>
            </div>
          </div>

          <p className="text-start w-full mt-4">
            {content}
          </p>

          <Link href="#contact">
            <p className="border border-black dark:border-white dark:bg-slate-900  text-black dark:text-white rounded-full px-4 py-2 mt-4">
              {contact}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
