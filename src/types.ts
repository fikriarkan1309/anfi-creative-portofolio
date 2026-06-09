export interface PersonalInfo {
  name: string;
  titles: string[];
  bio: string;
  experienceYears: number;
  projectsCount: number;
  clientsCount: number;
  aboutText: string;
  cvUrl?: string;
  portfolioPdfUrl?: string;
  whatsapp: string;
  email: string;
  instagram: string;
  location: string;
  logoText?: string;
  logoSubtext?: string;
  hideCmsSettings?: boolean;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Branding' | 'Jersey' | 'Website';
  imageUrl: string;
  tag: string;
}

export interface SkillItem {
  name: string;
  category: 'Design' | 'Development';
  level: number; // 0-100
  abbr: string;
  color: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export interface ProcessItem {
  step: string;
  title: string;
  description: string;
}
