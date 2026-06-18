import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WorkflowAndSkills from './components/WorkflowAndSkills';
import ContactCTA from './components/ContactCTA';
import SanityConfigModal from './components/SanityConfigModal';
import { Language } from './services/language';

import {
  getPersonalInfo,
  getServices,
  getProjects,
  getSkills,
  getTestimonials,
  getProcesses,
  urlForImage,
  FALLBACK_PERSONAL_INFO,
  FALLBACK_SERVICES,
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_PROCESSES,
  brandIdentity
} from './services/sanity';

import { PersonalInfo, ServiceItem, ProjectItem, SkillItem, TestimonialItem, ProcessItem } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(FALLBACK_PERSONAL_INFO);
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES);
  const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS);
  const [skills, setSkills] = useState<SkillItem[]>(FALLBACK_SKILLS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(FALLBACK_TESTIMONIALS);
  const [processes, setProcesses] = useState<ProcessItem[]>(FALLBACK_PROCESSES);
  
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all dynamic data
  const loadData = async () => {
    setLoading(true);
    try {
      const infoRes = await getPersonalInfo();
      const servicesRes = await getServices();
      const projectsRes = await getProjects();
      const skillsRes = await getSkills();
      const testimonialsRes = await getTestimonials();
      const processesRes = await getProcesses();

      setPersonalInfo(infoRes);
      setServices(servicesRes);
      setProjects(projectsRes);
      setSkills(skillsRes);
      setTestimonials(testimonialsRes);
      setProcesses(processesRes);
    } catch (err) {
      console.error('Error loading portfolio data from sources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if configuration parameters are present in the URL for easy synchronization
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSanityId = params.get('sanityId') || params.get('sanity_id');
      const urlDataset = params.get('sanityDataset') || params.get('sanity_dataset') || 'production';
      
      if (urlSanityId) {
        localStorage.setItem('SANITY_PROJECT_ID', urlSanityId);
        localStorage.setItem('SANITY_DATASET', urlDataset);
        // Clean up the URL query parameters so they don't linger
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
    loadData();
  }, []);

  // Update tab favicon based on loaded CMS Info Logo or fallback brand icon
  useEffect(() => {
    if (personalInfo) {
      const logoUrl = personalInfo.logoImageUrl ? urlForImage(personalInfo.logoImageUrl) : '';
      const faviconUrl = logoUrl || brandIdentity;
      
      let linkCount = 0;
      const links = document.querySelectorAll("link[rel*='icon']");
      links.forEach((link: any) => {
        link.href = faviconUrl;
        linkCount++;
      });

      if (linkCount === 0) {
        const newLink = document.createElement('link');
        newLink.rel = 'shortcut icon';
        newLink.type = 'image/png';
        newLink.href = faviconUrl;
        document.head.appendChild(newLink);
      }
    }
  }, [personalInfo]);

  const handleConfigSave = (projectId: string, dataset: string) => {
    console.log(`Saved Sanity Config: Project ID: ${projectId}, Dataset: ${dataset}`);
    // Reload database fetch queries
    loadData();
  };

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#080C10] flex flex-col items-center justify-center gap-4 z-50">
        <div className="relative w-12 h-12 flex items-center justify-center border-2 border-brand-cyan/20 rounded-full animate-spin border-t-brand-cyan" />
        <span className="font-mono text-xs text-[#A0AEC0] tracking-widest uppercase">
          Loading Portfolio Database...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white relative">
      <Header
        personalInfo={personalInfo}
        lang={lang}
        onLangChange={setLang}
        onContactClick={handleContactScroll}
        onSanitySetOpen={() => setIsConfigOpen(true)}
      />

      <Hero personalInfo={personalInfo} services={services} skills={skills} lang={lang} />

      <About personalInfo={personalInfo} lang={lang} />

      <Services services={services} lang={lang} />

      <Portfolio projects={projects} personalInfo={personalInfo} lang={lang} />

      <WorkflowAndSkills
        skills={skills}
        testimonials={testimonials}
        processes={processes}
        lang={lang}
      />

      <ContactCTA personalInfo={personalInfo} lang={lang} />

      {/* Sanity Live Database config modal */}
      <SanityConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onConfigSave={handleConfigSave}
      />
    </div>
  );
}
