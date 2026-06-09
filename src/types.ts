export interface PersonalInfo {
  name: string;
  titles: string[];
  bio: string;
  experienceYears: number;
  projectsCount: number;
  clientsCount: number;
  aboutText: string;
  aboutPhotoUrl?: any; // Dynamic about image (supports string or Sanity Image Object)
  cvUrl?: string;
  portfolioPdfUrl?: string;
  whatsapp: string;
  email: string;
  instagram: string;
  linkedinUrl?: string; // Linkedin URL
  behanceUrl?: string; // Behance URL
  tiktokUrl?: string; // Tiktok URL
  location: string;
  logoText?: string;
  logoSubtext?: string;
  logoImageUrl?: any; // Dynamic logo image (supports string or Sanity Image Object)
  hideCmsSettings?: boolean;
  heroBrandingTitle?: string;
  heroBrandingImage?: any;
  heroApparelTitle?: string;
  heroApparelImage?: any;
  heroWebTitle?: string;
  heroWebImage?: any;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: any; // Dynamic image (supports string or Sanity Image Object)
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Branding' | 'Jersey' | 'Website';
  imageUrl: any; // Dynamic image (supports string or Sanity Image Object)
  tag: string;
  client?: string;       // Dynamic case study client
  duration?: string;     // Dynamic case study duration
  deliverables?: string; // Dynamic case study deliverables
  challenge?: string;    // Dynamic case study challenge
  solution?: string;     // Dynamic case study solution
  quote?: string;        // Dynamic case study feedback quote
}

export interface SkillItem {
  name: string;
  category: 'Design' | 'Development';
  level: number; // 0-100
  abbr: string;
  color: string;
  imageUrl?: any; // Dynamic icon/image override (supports string or Sanity Image Object)
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
  avatarUrl?: any; // Dynamic avatar (supports string or Sanity Image Object)
}

export interface ProcessItem {
  step: string;
  title: string;
  description: string;
}
