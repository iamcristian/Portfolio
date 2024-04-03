"use client";

import { GiRollingSuitcase } from "react-icons/gi";
import { ProjectCard } from "./ProjectCard";
import { useAppContext } from "@/context/ConfigContext";

import esTranslations from "../../translations/es.json";
import enTranslations from "../../translations/en.json";

export const Projects = () => {
  const { language } = useAppContext();
  const translations = language === "es" ? esTranslations : enTranslations;

  const { title, projectsList } = translations.projects;

  return (
    <section
      className="section-page h-full flex flex-col justify-start"
      id="projects"
    >
      <h2 className="mb-4">
        <GiRollingSuitcase size={"1.5rem"} className="inline-block" />
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:mx-32">
        {projectsList.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};
