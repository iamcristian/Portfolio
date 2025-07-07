// export interface EducationItem {
//   title: string;
//   university?: string;
//   date?: string;
//   location?: string;
//   description: string;
//   src: string;
// }

interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SkillsData {
  title: string;
  skillCategories: SkillCategory[];
}
