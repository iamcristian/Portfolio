"use client";

import { GiSuitcase } from "react-icons/gi";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";
import { useAppContext } from "@/context/ConfigContext";
import { ExperienceCard } from "./ExperienceCard";

export const Experience = () => {
  const { language } = useAppContext();
  const translations = language === "es" ? esTranslations : enTranslations;

  const { title, experienceList } = translations.experience;

  return (
    <section
      className="section-page h-full flex flex-col justify-start"
      id="experience"
    >
      <h2 className="mb-4">
        <GiSuitcase size={"1.5rem"} className="inline-block" />
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:mx-32">
        {experienceList.map((experience) => (
          <ExperienceCard key={experience.title} {...experience} />
        ))}
      </div>
    </section>
  );
};
