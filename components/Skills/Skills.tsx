import { TabTable } from "./TabTable";

export const Skills = () => {
  return (
    <section
      className="section-page flex flex-col justify-start items-center md:items-start md:py-32"
      id="skills"
    >
      <h2 className="text-center mb-4">Skills</h2>
      <TabTable />
    </section>
  );
};
