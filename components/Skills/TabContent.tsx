import { FaJava } from "react-icons/fa";
import {
  SiBootstrap,
  SiC,
  SiCss3,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSelenium,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import IconSkill from "./IconSkill";
import { BiGroup, BiRun, BiTargetLock, BiUserCheck } from "react-icons/bi";
import { BsFillLightbulbFill } from "react-icons/bs";

export const LanguagesProgrammingSkills = () => {
  return (
    <div className="flex flex-wrap justify-center text-center gap-5 md:gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
      <IconSkill text="JavaScript" icon={SiJavascript} />
      <IconSkill text="TypeScript" icon={SiTypescript} />
      <IconSkill text="Python" icon={SiPython} />
      <IconSkill text="Java" icon={FaJava}/>
      <IconSkill text="C" icon={SiC}/>
    </div>
  );
};

export const FrontendSkills = () => {
  return (
    <div className="flex flex-wrap justify-center text-center gap-5 md:gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
      <IconSkill text="HTML5" icon={SiHtml5} />
      <IconSkill text="CSS3" icon={SiCss3} />
      <IconSkill text="React" icon={SiReact} />
      <IconSkill text="Nextjs" icon={SiNextdotjs} />
      <IconSkill text="Tailwind" icon={SiTailwindcss} />
      <IconSkill text="Bootstrap" icon={SiBootstrap}/>
    </div>
  );
};

export const BackendSkills = () => {
  return (
    <div className="flex flex-wrap justify-center text-center gap-5 md:gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
      <IconSkill text="Node.js" icon={SiNodedotjs} />
      <IconSkill text="NestJs" icon={SiNestjs} />
      <IconSkill text="Express" icon={SiExpress} />
      <IconSkill text="Django" icon={SiDjango} />
    </div>
  );
};

export const DatabasesSkills = () => {
  return (
    <div className="flex flex-wrap justify-center text-center gap-5 md:gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
      <IconSkill text="MySQL" icon={SiMysql} />
      <IconSkill text="PostgreSQL" icon={SiPostgresql} />
      <IconSkill text="MongoDB" icon={SiMongodb} />
      <IconSkill text="Firebase" icon={SiFirebase} />
    </div>
  );
};

export const TestingSkills = () => {
  return (
    <div className="flex flex-wrap justify-center text-center gap-5 md:gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
      <IconSkill text="Selenium" icon={SiSelenium} />
      <IconSkill text="Jest" icon={SiJest} />
      <IconSkill text="JUnit5" icon={SiJunit5} />
    </div>
  );
};

export const SoftSkills = () => {
  return (
    <div className="flex flex-wrap justify-center text-center gap-5 md:gap-2 lg:gap-4 xl:gap-5 2xl:gap-6">
      <IconSkill text="Assertive Communication" icon={BiUserCheck} />
      <IconSkill text="Teamwork" icon={BiGroup} />
      <IconSkill text="Adaptability" icon={BsFillLightbulbFill} />
      <IconSkill text="Critical Thinking" icon={BiTargetLock} />
      <IconSkill text="Fast Learning" icon={BiRun} />
    </div>
  );
};