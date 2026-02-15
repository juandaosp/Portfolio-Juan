export interface Highlight {
  "Issue key": string;
  summary: string;
  points: number;
}

export interface SkillHierarchy {
  skill: string;
  total_points: number;
  projects: string[];
  highlights: Highlight[];
  count: number;
  description: string;
}

export interface PortfolioData {
  metadata: {
    total_story_points: number;
    total_tasks: number;
  };
  profile: {
    role: string;
    summary: string;
    key_achievement: string;
    education: string;
    certifications: string[];
  };
  skills_hierarchy: SkillHierarchy[];
}