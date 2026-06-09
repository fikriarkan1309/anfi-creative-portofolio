import { PersonalInfo, ServiceItem, ProjectItem, SkillItem, TestimonialItem, ProcessItem } from '../types';

// Fallback high-quality data from the exact portfolio in the image reference.
// The image paths are the ones generated dynamically for pixel-perfect presentation.
export const FALLBACK_PERSONAL_INFO: PersonalInfo = {
  name: 'FIKRI ARKAN',
  titles: ['GRAPHIC DESIGNER', 'WEB DEVELOPER'],
  bio: 'I help brands build strong visual identities, create impactful apparel designs, and develop modern websites that drive results.',
  experienceYears: 4,
  projectsCount: 100,
  clientsCount: 50,
  aboutText: 'Saya adalah Graphic Designer dan Web Developer yang berfokus pada Visual Identity, Apparel Design, dan pembuatan Website modern. Saya senang membantu brand dan bisnis untuk tampil lebih profesional, kuat, dan berkesan.',
  cvUrl: 'https://drive.google.com/file/d/YOUR_CV_FILE_ID/view?usp=sharing', // EDIT SINI UNTUK LINK DOWNLOAD CV
  portfolioPdfUrl: 'https://drive.google.com/file/d/YOUR_PORTFOLIO_FILE_ID/view?usp=sharing', // EDIT SINI UNTUK LINK GOOGLE DRIVE PORTFOLIO PDF
  whatsapp: '+6282121309886', // Silakan edit sesuai nomor WA asli Fikri
  email: 'fikriarkan1309@gmail.com', // Sesuai email login fikriarkan1309
  instagram: '@anficreative_',
  location: 'Indonesia',
  logoText: 'ANFI CREATIVE',
  logoSubtext: 'DESIGN • APPAREL • WEB',
  hideCmsSettings: false
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    id: 'service-1',
    index: '01',
    title: 'VISUAL IDENTITY DESIGN',
    description: 'Membangun identitas visual yang kuat dan konsisten untuk brand Anda.',
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Stationery Design',
      'Social Media Assets',
      'Packaging Design'
    ],
    imageUrl: '/src/assets/images/brand_identity_1780983323908.png'
  },
  {
    id: 'service-2',
    index: '02',
    title: 'APPAREL & JERSEY DESIGN',
    description: 'Desain jersey, pattern, dan apparel yang unik, nyaman, dan berkarakter.',
    features: [
      'Custom Jersey',
      'Pattern Design',
      'Team Merchandise',
      'Sublimation Design',
      'Sports Apparel'
    ],
    imageUrl: '/src/assets/images/jersey_design_1780983307716.png'
  },
  {
    id: 'service-3',
    index: '03',
    title: 'WEB DEVELOPMENT',
    description: 'Membangun website modern, responsif, dan berperforma tinggi.',
    features: [
      'Company Profile',
      'Landing Page',
      'Portfolio Website',
      'E-commerce',
      'Custom Website'
    ],
    imageUrl: '/src/assets/images/laptop_web_dev_1780983341066.png'
  }
];

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'ANFI STUDIO BRANDING',
    category: 'Branding',
    imageUrl: '/src/assets/images/brand_identity_1780983323908.png',
    tag: 'Visual Identity Design'
  },
  {
    id: 'proj-2',
    title: 'PHOENIX FC JERSEY',
    category: 'Jersey',
    imageUrl: '/src/assets/images/phoenix_jersey_1780983359718.png',
    tag: 'Apparel Design'
  },
  {
    id: 'proj-3',
    title: 'KOPINUSA WEBSITE',
    category: 'Website',
    imageUrl: '/src/assets/images/laptop_web_dev_1780983341066.png',
    tag: 'Web Development'
  },
  {
    id: 'proj-4',
    title: 'AZZAHRA BRANDING',
    category: 'Branding',
    imageUrl: '/src/assets/images/brand_identity_1780983323908.png',
    tag: 'Visual Identity Design'
  },
  {
    id: 'proj-5',
    title: 'TIGER ESPORT JERSEY',
    category: 'Jersey',
    imageUrl: '/src/assets/images/jersey_design_1780983307716.png',
    tag: 'Apparel Design'
  },
  {
    id: 'proj-6',
    title: 'OPTIMA WEBSITE',
    category: 'Website',
    imageUrl: '/src/assets/images/laptop_web_dev_1780983341066.png',
    tag: 'Web Development'
  }
];

export const FALLBACK_PROCESSES: ProcessItem[] = [
  {
    step: '01',
    title: 'CONSULTATION',
    description: 'Kita diskusi tentang kebutuhan, tujuan, dan target audiens.'
  },
  {
    step: '02',
    title: 'CONCEPT DEVELOPMENT',
    description: 'Saya membuat rancangan dan referensi visual berdasarkan brief.'
  },
  {
    step: '03',
    title: 'DESIGN & DEVELOPMENT',
    description: 'Proses desain atau pengembangan dilakukan dengan penuh detail.'
  },
  {
    step: '04',
    title: 'REVISION',
    description: 'Revisi dilakukan secara interaktif hingga hasil sesuai harapan.'
  },
  {
    step: '05',
    title: 'FINAL DELIVERY',
    description: 'Hasil akhir diserahkan dalam format terbaik dan siap digunakan.'
  }
];

export const FALLBACK_SKILLS: SkillItem[] = [
  { name: 'Illustrator', category: 'Design', level: 90, abbr: 'Ai', color: '#FF7F00' },
  { name: 'Photoshop', category: 'Design', level: 85, abbr: 'Ps', color: '#00C3FF' },
  { name: 'InDesign', category: 'Design', level: 80, abbr: 'Id', color: '#FF007F' },
  { name: 'CorelDRAW', category: 'Design', level: 75, abbr: 'Cdr', color: '#00B050' },
  { name: 'Figma', category: 'Design', level: 92, abbr: 'Fg', color: '#F24E1E' },
  { name: 'HTML5', category: 'Development', level: 95, abbr: 'H5', color: '#E34F26' },
  { name: 'CSS3', category: 'Development', level: 90, abbr: 'C3', color: '#1572B6' },
  { name: 'JavaScript', category: 'Development', level: 88, abbr: 'JS', color: '#F7DF1E' },
  { name: 'React', category: 'Development', level: 85, abbr: 'Re', color: '#61DAFB' },
  { name: 'Firebase', category: 'Development', level: 80, abbr: 'Fb', color: '#FFCA28' }
];

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Rizky Maulana',
    role: 'Owner Garuda FC',
    quote: 'Desain jersey sangat keren dan detailnya mantap! Prosesnya juga cepat dan komunikatif.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'test-2',
    author: 'Sity Aisyah',
    role: 'Owner Kopinusa',
    quote: 'Branding yang dibuat sangat profesional dan membantu bisnis kami terlihat lebih credible.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'test-3',
    author: 'Andi Pratama',
    role: 'Manajer Optima',
    quote: 'Website yang dibuat modern, cepat, dan mudah digunakan. Highly recommended!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];

// Sanity client configuration
const SANITY_API_VERSION = 'v2022-03-07';

/**
 * Perform direct GROQ queries on Sanity CMS via fetch API.
 * This satisfies the API integration requirement without bloated third party packages,
 * while utilizing a durable, highly styled native TS model.
 */
async function fetchFromSanity<T>(query: string): Promise<T | null> {
  const projectId = (typeof window !== 'undefined' ? localStorage.getItem('SANITY_PROJECT_ID') : '') || (import.meta as any).env?.VITE_SANITY_PROJECT_ID || '';
  const dataset = (typeof window !== 'undefined' ? localStorage.getItem('SANITY_DATASET') : '') || (import.meta as any).env?.VITE_SANITY_DATASET || 'production';

  if (!projectId) {
    return null;
  }
  
  const encodedQuery = encodeURIComponent(query);
  const url = `https://${projectId}.api.sanity.io/${SANITY_API_VERSION}/data/query/${dataset}?query=${encodedQuery}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Sanity API error: ${res.statusText}`);
      return null;
    }
    const json = await res.json();
    return json.result as T;
  } catch (err) {
    console.error('Failed to fetch from Sanity CMS', err);
    return null;
  }
}

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const query = `*[_type == "personalInfo"][0]`;
  const data = await fetchFromSanity<PersonalInfo>(query);
  return data || FALLBACK_PERSONAL_INFO;
}

export async function getServices(): Promise<ServiceItem[]> {
  const query = `*[_type == "service"] | order(index asc)`;
  const data = await fetchFromSanity<ServiceItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_SERVICES;
}

export async function getProjects(): Promise<ProjectItem[]> {
  const query = `*[_type == "project"]`;
  const data = await fetchFromSanity<ProjectItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_PROJECTS;
}

export async function getSkills(): Promise<SkillItem[]> {
  const query = `*[_type == "skill"]`;
  const data = await fetchFromSanity<SkillItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_SKILLS;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const query = `*[_type == "testimonial"]`;
  const data = await fetchFromSanity<TestimonialItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_TESTIMONIALS;
}

export async function getProcesses(): Promise<ProcessItem[]> {
  const query = `*[_type == "process"] | order(step asc)`;
  const data = await fetchFromSanity<ProcessItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_PROCESSES;
}
