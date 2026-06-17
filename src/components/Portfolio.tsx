import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Calendar, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { ProjectItem, PersonalInfo } from '../types';
import { Language, TRANSLATIONS } from '../services/language';
import { urlForImage } from '../services/sanity';

interface PortfolioProps {
  projects: ProjectItem[];
  personalInfo: PersonalInfo;
  lang: Language;
}

type TabType = 'ALL' | 'BRANDING' | 'JERSEY' | 'WEBSITE';

// Robust helper to extract plain string from any input type (including Sanity Portable Text block list)
function cleanQuoteText(val: any): string {
  if (!val) return '';
  
  let text = '';
  if (typeof val === 'string') {
    text = val;
  } else if (Array.isArray(val)) {
    try {
      const parts: string[] = [];
      for (const item of val) {
        if (item && Array.isArray(item.children)) {
          for (const c of item.children) {
            if (c && typeof c.text === 'string') {
              parts.push(c.text);
            }
          }
        } else if (item && typeof item.text === 'string') {
          parts.push(item.text);
        } else if (typeof item === 'string') {
          parts.push(item);
        }
      }
      text = parts.join(' ');
    } catch (e) {}
  } else if (typeof val === 'object') {
    if (Array.isArray(val.children)) {
      try {
        text = val.children
          .filter((c: any) => c && typeof c.text === 'string')
          .map((c: any) => c.text)
          .join(' ');
      } catch (e) {}
    } else if (typeof val.text === 'string') {
      text = val.text;
    }
  }

  text = text.trim();
  
  // Clean invalid single-phrase placeholders
  const lower = text.toLowerCase();
  if (
    !text ||
    lower === 'null' ||
    lower === 'undefined' ||
    lower === '""' ||
    lower === "''" ||
    lower === '-' ||
    lower === 'tbd' ||
    lower === 'n/a' ||
    lower === 'none' ||
    lower === 'empty' ||
    lower === 'belum ada' ||
    lower === 'belum ada dampak' ||
    lower === 'belum' ||
    lower.length < 4
  ) {
    return '';
  }
  
  return text;
}

function cleanGeneralString(val: any): string {
  if (!val) return '';
  let text = '';
  if (typeof val === 'string') {
    text = val;
  } else if (Array.isArray(val)) {
    try {
      text = val.join(' ');
    } catch(e) {}
  }
  text = text.trim();
  const lower = text.toLowerCase();
  if (
    !text ||
    lower === 'null' ||
    lower === 'undefined' ||
    lower === '""' ||
    lower === "''" ||
    lower === '-' ||
    lower === 'tbd' ||
    lower === 'n/a'
  ) {
    return '';
  }
  return text;
}

// Generate the high-quality category specific fallback quote 
function getFallbackQuote(project: ProjectItem, lang: Language): string {
  const cat = (project.category || '').toLowerCase();
  const title = (project.title || '').toLowerCase();
  const tag = (project.tag || '').toLowerCase();

  const isBranding = 
    cat === 'branding' || 
    cat === 'logo' || 
    cat.includes('brand') || 
    cat.includes('f&b') || 
    cat.includes('makanan') ||
    cat.includes('minuman') ||
    title.includes('brand') || 
    title.includes('logo') || 
    title.includes('hazenna') ||
    tag.includes('brand') || 
    tag.includes('logo');

  const isJersey = 
    cat === 'jersey' || 
    cat === 'apparel' || 
    cat === 'jersey & apparel' || 
    cat.includes('jersey') || 
    title.includes('jersey') || 
    title.includes('apparel') || 
    title.includes('phoenix') || 
    title.includes('tiger') ||
    tag.includes('jersey') || 
    tag.includes('apparel');

  const isTablet = 
    cat === 'tablet' || 
    cat.includes('tablet') || 
    cat.includes('ipad') || 
    title.includes('tablet') || 
    title.includes('ipad') || 
    tag.includes('tablet') || 
    tag.includes('ipad');

  const isMobile = 
    cat === 'mobile' || 
    cat === 'app' || 
    cat.includes('mobile') || 
    cat.includes('phone') || 
    title.includes('mobile') || 
    title.includes('app') || 
    tag.includes('mobile') || 
    tag.includes('app');

  const isWeb = 
    cat === 'web' || 
    cat === 'website' || 
    cat.includes('web') || 
    title.includes('web') || 
    title.includes('site') || 
    tag.includes('web') || 
    tag.includes('site');

  if (lang === 'id') {
    if (isBranding) return 'Hasil branding ini mendongkrak persepsi nilai produk kami hingga lebih dari 50% di mata audiens baru!';
    if (isJersey) return 'Jersey ini sangat nyaman dipakai dan langsung mencuri perhatian di turnamen nasional yang kami ikuti!';
    if (isTablet) return 'Desain antarmuka untuk versi tablet sangat bersih dan transisinya terasa sangat smooth serta interaktif!';
    if (isMobile) return 'Aplikasi mobile sangat responsif, navigasinya intuitif, dan pengguna kami sangat menyukai tampilan visualnya!';
    if (isWeb) return 'Situs web berjalan sangat cepat, dan kami melihat peningkatan interaksi dari formulir kontak WhatsApp secara signifikan.';
    return 'Hasil pekerjaan sangat detail, komunikasi profesional, dan eksekusi visual di semua ukuran device sangat luar biasa.';
  } else {
    if (isBranding) return 'The resulting visual branding boosted our product value estimation by more than 50% in the eyes of our new audience!';
    if (isJersey) return 'The jerseys are incredibly comfortable and grabbed massive spectator attention in our national tournament matches!';
    if (isTablet) return 'The tablet interface layout is extremely neat, and the transitions feel amazingly smooth and interactive!';
    if (isMobile) return 'The mobile app is highly responsive, has intuitive navigation, and our users absolutely love the interface!';
    if (isWeb) return 'Our website feels super snappy, and we instantly got solid contact requests on our WhatsApp channel.';
    return 'The deliverables are highly detailed, communication was professional, and the visual execution is outstanding.';
  }
}

export default function Portfolio({ projects, personalInfo, lang }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const t = TRANSLATIONS[lang];

  const tabs: TabType[] = ['ALL', 'BRANDING', 'JERSEY', 'WEBSITE'];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'ALL') {
      return true;
    }
    return project.category.toUpperCase() === activeTab;
  });

  // Dynamic Case Study details generator based on category/title
  const getCaseStudyDetails = (project: ProjectItem) => {
    const checkCategory = (project.category || '').toLowerCase();
    const checkTitle = (project.title || '').toLowerCase();
    const checkTag = (project.tag || '').toLowerCase();

    const isBranding = 
      checkCategory === 'branding' || 
      checkCategory === 'logo' || 
      checkCategory.includes('brand') || 
      checkCategory.includes('f&b') || 
      checkTitle.includes('brand') || 
      checkTitle.includes('logo') || 
      checkTitle.includes('hazenna') ||
      checkTag.includes('brand') || 
      checkTag.includes('logo');

    const isJersey = 
      checkCategory === 'jersey' || 
      checkCategory === 'apparel' || 
      checkCategory === 'jersey & apparel' || 
      checkCategory.includes('jersey') || 
      checkTitle.includes('jersey') || 
      checkTitle.includes('apparel') || 
      checkTitle.includes('phoenix') || 
      checkTitle.includes('tiger') ||
      checkTag.includes('jersey') || 
      checkTag.includes('apparel');

    const isTablet = 
      checkCategory === 'tablet' || 
      checkCategory.includes('tablet') || 
      checkCategory.includes('ipad') || 
      checkTitle.includes('tablet') || 
      checkTitle.includes('ipad') || 
      checkTag.includes('tablet') || 
      checkTag.includes('ipad');

    const isMobile = 
      checkCategory === 'mobile' || 
      checkCategory === 'app' || 
      checkCategory.includes('mobile') || 
      checkCategory.includes('phone') || 
      checkTitle.includes('mobile') || 
      checkTitle.includes('app') || 
      checkTag.includes('mobile') || 
      checkTag.includes('app');

    const isWeb = 
      checkCategory === 'web' || 
      checkCategory === 'website' || 
      checkCategory.includes('web') || 
      checkTitle.includes('web') || 
      checkTitle.includes('site') || 
      checkTag.includes('web') || 
      checkTag.includes('site');

    // Retrieve default details depending on language & category
    const defaultDetails = lang === 'id' 
      ? (isBranding 
          ? {
              client: 'ANFI Creative Studio / Brand Pribadi',
              duration: '2-3 Minggu',
              deliverables: 'Logo Assets, Brand Guidelines PDF, Social Media Kit, Packaging Mockup',
              challenge: 'Klien membutuhkan restrukturisasi identitas visual yang solid, berani, dan langsung dikenali. Tantangan utamanya adalah menciptakan desain modern yang menggabungkan estetika teknologi premium tanpa menghilangkan esensi keanggunan brand.',
              solution: 'Kami merancang arsitektur visual berbasis kisi geometris minimalis, didukung font tampilan futuristik dan aksen warna cyan-emerald kontras tinggi. Setiap aset dikalibrasi sedemikian rupa agar tampak tajam di platform digital dan media cetak fisik.',
              quote: 'Hasil branding ini mendongkrak persepsi nilai produk kami hingga lebih dari 50% di mata audiens baru!'
            }
          : isJersey
            ? {
                client: 'Garuda Sport Co / Phoenix Esports',
                duration: '1-2 Minggu',
                deliverables: 'Pola Sublimasi Kustom, Mockup 3D Premium, Seni Konsep Apparel Tim',
                challenge: 'Mendesain jersey olahraga dan gaming yang tidak hanya memiliki pola pola grafis yang tajam dan dinamis, melainkan juga tata letak sublimasi presisi tinggi yang sesuai dengan anatomi fisik saat dicetak.',
                solution: 'Kami merancang pola kustom bermasukan energi dinamis tinggi. Seluruh skema warna dicocokkan menggunakan format CMYK khusus untuk menjamin keakuratan warna cetak sublimasi 100% tanpa penurunan saturasi.',
                quote: 'Jersey ini sangat nyaman dipakai dan langsung mencuri perhatian di turnamen nasional yang kami ikuti!'
              }
            : isTablet
              ? {
                  client: 'TabFit Studio / Media Tab',
                  duration: '2-3 Minggu',
                  deliverables: 'Tablet UI Designs, Responsive Prototype, Figma Assets Ready',
                  challenge: 'Membangun tata letak adaptif khusus tablet dengan optimasi rasio aspek 4:3 dan 16:10 agar navigasi tetap nyaman dipegang dua tangan.',
                  solution: 'Kami merancang area grid interaktif modular dengan target ketukan minimum 48px, transisi gestur swipe halus, dan sidebar navigasi collapsible.',
                  quote: 'Desain antarmuka untuk versi tablet sangat bersih dan transisinya terasa sangat smooth serta interaktif!'
                }
              : isMobile
                ? {
                    client: 'GoApp Tech / Solusi Seluler',
                    duration: '2-3 Minggu',
                    deliverables: 'Mobile App Wireframes, High-Fidelity UI/UX Designs, Interactive Prototype',
                    challenge: 'Menciptakan antarmuka aplikasi mobile yang ramah ibu jari (thumb-friendly), dengan beban muat grafis yang minimal agar lancar di HP spek menengah.',
                    solution: 'Kami merancang sistem desain komponen seluler modern di Figma, membatasi palet warna dominan gelap dengan aksen cyan berpendar, serta merancang navigasi bottom-bar yang ergonomis.',
                    quote: 'Aplikasi mobile sangat responsif, navigasinya intuitif, dan pengguna kami sangat menyukai tampilan visualnya!'
                  }
                : {
                    client: 'Kopinusa / Optima Tech Solutions',
                    duration: '3-4 Minggu',
                    deliverables: 'React Source Code, Desain UI/UX Figma, Optimasi SEO Kinerja Tinggi, Integrasi Sanity CMS',
                    challenge: 'Membangun platform digital modern dengan waktu pemuatan instan (sub-detik) yang menampilkan portofolio kelas premium secara interaktif, responsif penuh di seluler, dan mudah dikelola tanpa database rumit.',
                    solution: 'Kami membangun situs web menggunakan React 18+ ditenagai oleh Vite, dibantu Tailwind CSS untuk tata letak yang sangat fleksibel. Animasi mikro ditangani oleh framer-motion, dan semua data dinamis diintegrasikan dengan Sanity CMS.',
                    quote: 'Situs web berjalan sangat cepat, dan kami melihat peningkatan interaksi dari formulir kontak WhatsApp secara signifikan.'
                  }
        )
      : (isBranding
          ? {
              client: 'ANFI Creative Studio / Private Brand',
              duration: '2-3 Weeks',
              deliverables: 'Logo Assets, Brand Guidelines PDF, Social Media Kit, Packaging Mockup',
              challenge: 'The client needed a solid, bold, and instantly recognizable brand identity overhaul. The key challenge was to merge modern design aesthetics with professional vibes without losing the elegance of the brand.',
              solution: 'We designed a custom geometric visual architecture supported by futuristic headings and high-contrast cyan-emerald color accents. All assets were carefully optimized to look sharp on both screens and physical prints.',
              quote: 'The resulting visual branding boosted our product value estimation by more than 50% in the eyes of our new audience!'
            }
          : isJersey
            ? {
                client: 'Garuda Sport Co / Phoenix Esports',
                duration: '1-2 Weeks',
                deliverables: 'Custom Sublimation Patterns, Premium 3D Mockups, Teamwear Concept Art',
                challenge: 'Designing esports and sports jerseys that sport not only sharp, aerodynamic energy, but also high-precision sublimation layout configurations that conform naturally to human anatomy.',
                solution: 'We drafted custom fiery speed patterns built of vibrant layouts. The overall color profiles were converted to specialized CMYK plates to guarantee 100% sublimation print depth with zero color decay.',
                quote: 'The jerseys are incredibly comfortable and grabbed massive spectator attention in our national tournament matches!'
              }
            : isTablet
              ? {
                  client: 'TabFit Studio / Media Tab',
                  duration: '2-3 Weeks',
                  deliverables: 'Tablet UI Designs, Responsive Prototype, Figma Assets Ready',
                  challenge: 'Building adaptive layouts for tablet screens, optimizing 4:3 and 16:10 aspect ratios so that hand-held scrolling and navigation are completely ergonomic.',
                  solution: 'We generated a finger-optimized multi-grid layout with targets above 48px, utilizing rich interactive swipes and collapsible side navigation bars.',
                  quote: 'The tablet interface layout is extremely neat, and the transitions feel amazingly smooth and interactive!'
                }
              : isMobile
                ? {
                    client: 'GoApp Tech / Mobile Solutions',
                    duration: '2-3 Weeks',
                    deliverables: 'Mobile App Wireframes, High-Fidelity UI/UX Designs, Interactive Prototype',
                    challenge: 'Creating mobile screens that are entirely thumb-friendly, visually spectacular under low-speed mobile connections, and battery efficient.',
                    solution: 'We authored custom React Native components styled with high contrast theme assets, introducing bottom ergonomics and gorgeous screen transitions.',
                    quote: 'The mobile app is highly responsive, has intuitive navigation, and our users absolutely love the interface!'
                  }
                : {
                    client: 'Kopinusa / Optima Tech Solutions',
                    duration: '3-4 Weeks',
                    deliverables: 'React Source Code, Figma UI/UX Design, High Performance SEO Optimization, Sanity CMS Integration',
                    challenge: 'Developing a modern web hub with sub-second page performance loads showcasing premium creative deliverables, keeping design responsiveness flawless across active mobile viewports.',
                    solution: 'We bundled the app using React 18+ and Vite, utilizing lightweight Tailwind CSS classes. Staggered animations are powered by motion, with server content dynamic routes connected fully to Sanity CMS.',
                    quote: 'Our website feels super snappy, and we instantly got solid contact requests on our WhatsApp channel.'
                  }
        );

    const rawProj = project as any;
    const clientVal = cleanGeneralString(project.client || rawProj.clientName);
    const durationVal = cleanGeneralString(project.duration || rawProj.projectDuration);
    const deliverablesVal = cleanGeneralString(project.deliverables || rawProj.projectDeliverables);
    const challengeVal = cleanQuoteText(project.challenge || rawProj.challenges || rawProj.tantangan);
    const solutionVal = cleanQuoteText(project.solution || rawProj.solutions || rawProj.solusi);
    
    const quoteVal = cleanQuoteText(
      project.quote || 
      rawProj.feedback || 
      rawProj.dampak || 
      rawProj.impact || 
      rawProj.testimonial || 
      rawProj.testimonialQuote ||
      rawProj.testimonial_quote ||
      rawProj.testimoni || 
      rawProj.testimoniQuote ||
      rawProj.testimoni_quote ||
      rawProj.clientQuote ||
      rawProj.client_quote ||
      rawProj.feedbackDampak ||
      rawProj.feedback_dampak ||
      rawProj.client_feedback ||
      rawProj.review ||
      rawProj.ulasan
    );

    // If any dynamic fields exist, return combined values falling back to defaults for any unpopulated field
    if (clientVal || durationVal || deliverablesVal || challengeVal || solutionVal || quoteVal) {
      return {
        client: clientVal || defaultDetails.client,
        duration: durationVal || defaultDetails.duration,
        deliverables: deliverablesVal || defaultDetails.deliverables,
        challenge: challengeVal || defaultDetails.challenge,
        solution: solutionVal || defaultDetails.solution,
        quote: quoteVal || defaultDetails.quote
      };
    }

    return defaultDetails;
  };

  return (
    <section id="portfolio" className="py-12 md:py-16 relative bg-[#090D12] overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/2 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl font-display font-extrabold text-white/[0.02] tracking-widest select-none uppercase">
            {t.portfolioTitle}
          </div>
          <span className="text-brand-cyan text-xs font-bold font-display tracking-[0.25em] uppercase block mb-1 relative z-10">
            {t.portfolioSubtitle}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight relative z-10">
            {t.portfolioHeadline}
          </h2>
          <div className="w-12 h-1 bg-brand-cyan mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            let label: string = tab;
            if (tab === 'ALL') label = t.tabAll;
            else if (tab === 'BRANDING') label = t.tabBranding;
            else if (tab === 'JERSEY') label = t.tabJersey;
            else if (tab === 'WEBSITE') label = t.tabWeb;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold font-display tracking-wider rounded-xs transition-all relative overflow-hidden ${
                  activeTab === tab
                    ? 'bg-brand-cyan text-[#080C10] shadow-md shadow-brand-cyan/15'
                    : 'bg-brand-card/40 hover:bg-brand-card/80 text-[#A0AEC0] border border-white/5 hover:border-white/10'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Dynamic Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || `project-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-brand-card/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between align-stretch h-full cursor-pointer hover:border-brand-cyan/20 duration-350"
              >
                
                {/* Product/Design Preview canvas */}
                <div className="relative overflow-hidden aspect-4/3 bg-[#0A0D11] border-b border-white/5 flex items-center justify-center p-3">
                  <img
                    src={urlForImage(project.imageUrl)}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-103 duration-500 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-brand-bg/85 backdrop-blur-md border border-white/5 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#A0AEC0] rounded-xs">
                    {project.category}
                  </div>
                </div>

                {/* Info and Details bottom strip */}
                <div className="p-4 flex items-center justify-between gap-3 mt-auto">
                  <div>
                    <h4 className="text-white font-display font-bold text-xs tracking-wide uppercase transition-colors group-hover:text-brand-cyan">
                      {project.title}
                    </h4>
                    <span className="text-[9px] text-[#718096] font-mono tracking-wide mt-1 block uppercase">
                      {project.tag}
                    </span>
                  </div>
                  
                  {/* Styled Cyan Box arrow */}
                  <div className="w-7 h-7 rounded-xs border border-white/10 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/5 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A0AEC0] group-hover:text-brand-cyan transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Bottom CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (personalInfo.portfolioPdfUrl && !personalInfo.portfolioPdfUrl.includes('YOUR_PORTFOLIO_FILE_ID')) {
                window.open(personalInfo.portfolioPdfUrl, '_blank', 'noopener,noreferrer');
              } else {
                window.open('https://drive.google.com/file/d/YOUR_PORTFOLIO_FILE_ID/view?usp=sharing', '_blank', 'noopener,noreferrer');
              }
            }}
            className="flex items-center gap-2 border border-white/10 hover:border-brand-cyan py-2.5 px-6 text-xs font-semibold tracking-wider text-white hover:text-brand-cyan transition-all duration-300 rounded-xs group font-display uppercase"
          >
            {t.viewAllProjects}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>

      {/* CASE STUDY DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {selectedProject && (() => {
          const details = getCaseStudyDetails(selectedProject);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-[#0D1219] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative select-none"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Header Canvas Area */}
                <div className="relative h-[220px] md:h-[280px] bg-slate-950 flex items-center justify-center overflow-hidden border-b border-white/5">
                  <img
                    src={urlForImage(selectedProject.imageUrl)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1219] via-black/40 to-transparent" />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-brand-cyan text-brand-bg font-mono font-bold text-[9px] tracking-widest uppercase px-3 py-1 rounded-xs">
                    {selectedProject.category}
                  </span>

                  {/* Close floating button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-[#00E5FF] text-white hover:text-[#080C10] flex items-center justify-center border border-white/10 hover:border-brand-cyan transition-all duration-300 z-10 shadow-lg cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[10px] text-brand-cyan tracking-widest font-mono uppercase block mb-1">
                      {selectedProject.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                 {/* Body Content */}
                <div className="p-6 md:p-8 max-h-[65vh] md:max-h-[65vh] lg:max-h-[70vh] overflow-y-auto custom-scrollbar flex flex-col gap-6 md:gap-8">
                  
                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-cyan/10 rounded-md border border-brand-cyan/20 shrink-0">
                        <Calendar className="w-4 h-4 text-brand-cyan" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#718096] uppercase font-mono block">{t.caseStudyDur}</span>
                        <span className="text-xs text-white/90 font-medium">{details.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand-orange/10 rounded-md border border-brand-orange/20 mt-0.5 shrink-0">
                        <Layers className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#718096] uppercase font-mono block">DELIVERABLES</span>
                        <span className="text-xs text-white/90 font-medium block break-words leading-snug mt-0.5">{details.deliverables}</span>
                      </div>
                    </div>
                  </div>

                  {/* Design Context Copy Blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        {t.caseStudyChallenge}
                      </h4>
                      <p className="text-xs text-[#A0AEC0] leading-relaxed">
                        {details.challenge}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        {t.caseStudySolution}
                      </h4>
                      <p className="text-xs text-[#A0AEC0] leading-relaxed">
                        {details.solution}
                      </p>
                    </div>
                  </div>

                  {/* Highlights section / Testimonial box */}
                  {(() => {
                    const rawProj = selectedProject as any;
                    const directQuote = (selectedProject as any).quote || rawProj.feedback || rawProj.dampak || rawProj.testimonial;
                    const cleanedDirect = cleanQuoteText(directQuote);
                    
                    let finalQuote = '';
                    if (cleanedDirect) {
                      finalQuote = cleanedDirect;
                    } else {
                      const cleanedDetails = cleanQuoteText(details.quote);
                      if (cleanedDetails) {
                        finalQuote = cleanedDetails;
                      } else {
                        finalQuote = getFallbackQuote(selectedProject, lang);
                      }
                    }

                    // Strict emergency backup to ensure we NEVER output empty text
                    if (!finalQuote || finalQuote.trim().length < 5) {
                      finalQuote = getFallbackQuote(selectedProject, lang);
                    }

                    return (
                      <div className="bg-[#111924]/80 border border-brand-cyan/20 rounded-xl p-4 flex items-start gap-3 relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 text-white/[0.03] text-5xl font-extrabold italic select-none">
                          QUALITY
                        </div>
                        <ShieldCheck className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-[11px] font-mono text-brand-cyan uppercase tracking-wider font-semibold">{t.caseStudyFeedback}</h5>
                          <p className="text-xs text-white/80 leading-relaxed italic mt-1 font-sans block break-words">
                            "{finalQuote}"
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                </div>

                {/* Contact Inquire WA Footer Action */}
                <div className="bg-slate-950 p-4 px-6 md:px-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-[10px] text-[#718096] font-mono uppercase tracking-wider text-center sm:text-left">
                    {t.interestedInSameProj}
                  </span>
                  <a
                    href={`https://wa.me/6282121309886?text=Halo%20Fikri,%20saya%20tertarik%20dengan%20proyek%20portfolio%20${encodeURIComponent(selectedProject.title)}!`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba59] font-display text-xs font-bold tracking-wider rounded-xs py-2 px-5 transition-all duration-350 transform active:scale-95 shadow-md shrink-0 uppercase"
                  >
                    {t.askSimilarProj}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
