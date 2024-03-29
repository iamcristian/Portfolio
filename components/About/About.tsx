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

  const { title } = translations.about;

  return (
    <section className="section-page" id="about">
      <h2 className="items-center mt-2">
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
            <div className="flex flex-col items-center justify-center w-28 bg-gray-200 dark:bg-gray-800 p-2 rounded">
              <BsAward className="text-xl text-blue-500 mb-2" />
              <h3 className=" text-black dark:text-white">Experience</h3>
              <p className="text-xxs text-black dark:text-gray-200">2 Years Working</p>
            </div>

            <div className="flex flex-col items-center justify-center w-28 bg-gray-200 dark:bg-gray-800 p-2 rounded">
              <FaSuitcase className="text-xl text-blue-500 mb-2" />
              <h3 className=" text-black dark:text-white">Completed</h3>
              <p className="text-xxs text-black dark:text-gray-200">15 + Projects</p>
            </div>

            <div className="flex flex-col items-center justify-center w-28 bg-gray-200 dark:bg-gray-800 p-2 rounded">
              <FaGraduationCap className="text-xl text-blue-500 mb-2" />
              <h3 className=" text-black dark:text-white">Certifications</h3>
              <p className="text-xxs text-black dark:text-gray-200">5 + certifications</p>
            </div>
          </div>

          <p className="text-start w-full mt-4">
            As a fullstack developer, I combine my ability to code both frontend
            and backend, along with a solid understanding of user needs. I am
            always looking for challenges that allow me to create innovative and
            exciting products, while improving my skills in the process.
          </p>

          <Link href="#contact">
            <p className="bg-gray-200 dark:bg-gray-800  text-black dark:text-white rounded-full px-4 py-2 mt-4">
              Contact Me
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
