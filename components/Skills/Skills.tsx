"use client";

import { TabTable } from "./TabTable";
import { GiSkills } from "react-icons/gi";
import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";
import { useAppContext } from "@/context/ConfigContext";

export const Skills = () => {
  const { language } = useAppContext();

  const translations = language === "es" ? esTranslations : enTranslations;
  const { title } = translations.skills;

  return (
    <section className="section-page flex flex-col justify-start" id="skills">
      <h2 className="mb-4">
        <GiSkills size={"1.5rem"} className="inline-block" /> {title}
      </h2>
      <TabTable />
    </section>
  );
};
