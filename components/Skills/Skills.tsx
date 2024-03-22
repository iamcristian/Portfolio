import { TabTable } from "./TabTable";
import { GiSkills } from "react-icons/gi";

export const Skills = () => {
  return (
    <section
      className="section-page flex flex-col justify-start"
      id="skills"
    >
      <h2 className="mb-4">
        <GiSkills size={"1.5rem"} className="inline-block" /> Skills
      </h2>
      <TabTable />
    </section>
  );
};
