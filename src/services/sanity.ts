import { PersonalInfo, ServiceItem, ProjectItem, SkillItem, TestimonialItem, ProcessItem } from '../types';

import brandIdentity from '../assets/images/brand_identity_1780983323908.png';
import fikriPortrait from '../assets/images/fikri_portrait_1780983289777.png';
import jerseyDesign from '../assets/images/jersey_design_1780983307716.png';
import laptopWebDev from '../assets/images/laptop_web_dev_1780983341066.png';
import phoenixJersey from '../assets/images/phoenix_jersey_1780983359718.png';

export { brandIdentity, fikriPortrait, jerseyDesign, laptopWebDev, phoenixJersey };

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
  aboutPhotoUrl: fikriPortrait,
  cvUrl: 'https://drive.google.com/file/d/YOUR_CV_FILE_ID/view?usp=sharing', // EDIT SINI UNTUK LINK DOWNLOAD CV
  portfolioPdfUrl: 'https://drive.google.com/file/d/YOUR_PORTFOLIO_FILE_ID/view?usp=sharing', // EDIT SINI UNTUK LINK GOOGLE DRIVE PORTFOLIO PDF
  whatsapp: '+6282121309886', // Silakan edit sesuai nomor WA asli Fikri
  email: 'fikriarkan1309@gmail.com', // Sesuai email login fikriarkan1309
  instagram: '@anficreative_',
  linkedinUrl: 'https://linkedin.com',
  behanceUrl: 'https://behance.net/anficreative',
  tiktokUrl: 'https://tiktok.com/@anficreative',
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
    imageUrl: brandIdentity
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
    imageUrl: jerseyDesign
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
    imageUrl: laptopWebDev
  }
];

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'ANFI STUDIO BRANDING',
    category: 'Branding',
    imageUrl: brandIdentity,
    tag: 'Visual Identity Design'
  },
  {
    id: 'proj-2',
    title: 'PHOENIX FC JERSEY',
    category: 'Jersey',
    imageUrl: phoenixJersey,
    tag: 'Apparel Design'
  },
  {
    id: 'proj-3',
    title: 'KOPINUSA WEBSITE',
    category: 'Website',
    imageUrl: laptopWebDev,
    tag: 'Web Development'
  },
  {
    id: 'proj-4',
    title: 'AZZAHRA BRANDING',
    category: 'Branding',
    imageUrl: brandIdentity,
    tag: 'Visual Identity Design'
  },
  {
    id: 'proj-5',
    title: 'TIGER ESPORT JERSEY',
    category: 'Jersey',
    imageUrl: jerseyDesign,
    tag: 'Apparel Design'
  },
  {
    id: 'proj-6',
    title: 'OPTIMA WEBSITE',
    category: 'Website',
    imageUrl: laptopWebDev,
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
 * Cleanly retrieves the current Sanity Project ID and Dataset with extensive safeguards.
 * Handles missing values, empty strings, null values, or "undefined"/"null" string inputs.
 */
export function getSanityConfig(): { projectId: string; dataset: string } {
  let projectId = '';
  let dataset = '';
  
  if (typeof window !== 'undefined') {
    const cachedId = localStorage.getItem('SANITY_PROJECT_ID');
    const cachedDataset = localStorage.getItem('SANITY_DATASET');
    
    if (cachedId && cachedId !== 'null' && cachedId !== 'undefined' && cachedId.trim() !== '') {
      projectId = cachedId.trim();
    }
    if (cachedDataset && cachedDataset !== 'null' && cachedDataset !== 'undefined' && cachedDataset.trim() !== '') {
      dataset = cachedDataset.trim();
    }
  }
  
  if (!projectId) {
    // @ts-ignore
    projectId = import.meta.env?.VITE_SANITY_PROJECT_ID || 'sft5jjse';
  }
  if (!dataset) {
    // @ts-ignore
    dataset = import.meta.env?.VITE_SANITY_DATASET || 'production';
  }
  
  // Final safe fallback if the values are still invalid or contain literal "null"/"undefined"
  if (!projectId || projectId === 'null' || projectId === 'undefined' || projectId.trim() === '') {
    projectId = 'sft5jjse';
  }
  if (!dataset || dataset === 'null' || dataset === 'undefined' || dataset.trim() === '') {
    dataset = 'production';
  }
  
  return { projectId, dataset };
}

/**
 * Robust utility to resolve Sanity images into standard image URLs.
 * Supports both raw URL strings and Sanity native image objects with an asset reference (_ref).
 */
export function urlForImage(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') {
    return source;
  }
  
  const ref = source.asset?._ref || source._ref;
  if (ref && typeof ref === 'string') {
    const { projectId, dataset } = getSanityConfig();
    
    // Deconstruct image-_ref: "image-8fca738d21c3df4cf0dbf57738e4df9bc4bc8cd5-1024x768-jpg"
    const cleaned = ref.replace(/^image-/, '');
    const lastDash = cleaned.lastIndexOf('-');
    if (lastDash !== -1) {
      const fileName = cleaned.substring(0, lastDash);
      const extension = cleaned.substring(lastDash + 1);
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${fileName}.${extension}`;
    }
  }
  
  if (source.asset?.url) {
    return source.asset.url;
  }
  
  return '';
}

/**
 * Perform GROQ queries on Sanity CMS via server-side fetch API or safe browser fallback.
 * This satisfies the API integration requirement without bloated third party packages,
 * while utilizing a durable, highly styled native TS model.
 */
async function fetchFromSanity<T>(query: string): Promise<T | null> {
  const { projectId, dataset } = getSanityConfig();

  if (!projectId) {
    return null;
  }
  
  const encodedQuery = encodeURIComponent(query);
  // Prioritize Sanity's optimized public CDN URL (Blazing-fast and cached at the edge)
  const directUrl = `https://${projectId}.apicdn.sanity.io/${SANITY_API_VERSION}/data/query/${dataset}?query=${encodedQuery}`;
  const proxyUrl = `/api/sanity?projectId=${projectId}&dataset=${dataset}&query=${encodedQuery}`;
  
  // 1. First choice: Direct Sanity CDN call (Fast, CORS-approved, Edge-cached)
  try {
    const directRes = await fetch(directUrl);
    if (directRes.ok) {
      const json = await directRes.json();
      return json.result as T;
    }
    console.warn(`Sanity API CDN status is ${directRes.status}, attempting fallback...`);
  } catch (directErr: any) {
    console.warn('Direct Sanity CDN fetch attempted but failed (likely offline/network issue); trying proxy...', directErr?.message || directErr);
  }

  // 2. Second choice: Try through backend API proxy (handles edge cases, CORS issues)
  try {
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      // Only parse as JSON if it is actually JSON to avoid index.html rewrite issues
      if (contentType.includes('application/json')) {
        const json = await res.json();
        return json.result as T;
      }
    }
    console.warn(`Sanity backend proxy returned invalid response status or content type. Serving beautiful default content.`);
  } catch (err: any) {
    console.warn('Sanity database connection offline, serving beautiful default portfolio content.', err?.message || err);
  }
  
  return null;
}

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const query = `*[_type == "personalInfo"][0]`;
  const data = await fetchFromSanity<PersonalInfo>(query);
  return data || FALLBACK_PERSONAL_INFO;
}

export async function getServices(): Promise<ServiceItem[]> {
  const query = `*[_type == "service"] | order(index asc)`;
  const data = await fetchFromSanity<ServiceItem[]>(query);
  return data && data.length > 0 
    ? data.map(item => ({ ...item, id: item.id || (item as any)._id || `service-${item.index}` }))
    : FALLBACK_SERVICES;
}

export async function getProjects(): Promise<ProjectItem[]> {
  const query = `*[_type == "project"]`;
  const data = await fetchFromSanity<ProjectItem[]>(query);
  return data && data.length > 0 
    ? data.map((item, index) => ({ ...item, id: item.id || (item as any)._id || `project-${index}` }))
    : FALLBACK_PROJECTS;
}

export async function getSkills(): Promise<SkillItem[]> {
  const query = `*[_type == "skill"]`;
  const data = await fetchFromSanity<SkillItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_SKILLS;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const query = `*[_type == "testimonial"]`;
  const data = await fetchFromSanity<TestimonialItem[]>(query);
  return data && data.length > 0 
    ? data.map((item, index) => ({ ...item, id: item.id || (item as any)._id || `testimonial-${index}` }))
    : FALLBACK_TESTIMONIALS;
}

export async function getProcesses(): Promise<ProcessItem[]> {
  const query = `*[_type == "process"] | order(step asc)`;
  const data = await fetchFromSanity<ProcessItem[]>(query);
  return data && data.length > 0 ? data : FALLBACK_PROCESSES;
}
