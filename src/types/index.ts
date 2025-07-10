interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SkillsData {
  title: string;
  skillCategories: SkillCategory[];
}
