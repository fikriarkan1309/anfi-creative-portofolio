import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Calendar, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { ProjectItem, PersonalInfo } from '../types';
import { Language, TRANSLATIONS } from '../services/language';

interface PortfolioProps {
  projects: ProjectItem[];
  personalInfo: PersonalInfo;
  lang: Language;
}

type TabType = 'ALL' | 'BRANDING' | 'JERSEY' | 'WEBSITE';

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
    // If the project itself has dynamic CMS populated properties, use them!
    if (project.client || project.duration || project.deliverables || project.challenge || project.solution || project.quote) {
      return {
        client: project.client || 'ANFI Creative Studio',
        duration: project.duration || '2 Weeks',
        deliverables: project.deliverables || 'Project Deliverables and Assets',
        challenge: project.challenge || 'Custom creative design tailored to the brand identity objectives.',
        solution: project.solution || 'Engineered bespoke visual components and layouts that represent style and performance.',
        quote: project.quote || 'Outstanding execution, highly professional service, and flawless delivery!'
      };
    }

    const isBranding = project.category.toLowerCase() === 'branding';
    const isJersey = project.category.toLowerCase() === 'jersey';

    if (lang === 'id') {
      if (isBranding) {
        return {
          client: 'ANFI Creative Studio / Brand Pribadi',
          duration: '2-3 Minggu',
          deliverables: 'Logo Assets, Brand Guidelines PDF, Social Media Kit, Packaging Mockup',
          challenge: 'Klien membutuhkan restrukturisasi identitas visual yang solid, berani, dan langsung dikenali. Tantangan utamanya adalah menciptakan desain modern yang menggabungkan estetika teknologi premium tanpa menghilangkan esensi keanggunan brand.',
          solution: 'Kami merancang arsitektur visual berbasis kisi geometris minimalis, didukung font tampilan futuristik dan aksen warna cyan-emerald kontras tinggi. Setiap aset dikalibrasi sedemikian rupa agar tampak tajam di platform digital dan media cetak fisik.',
          quote: 'Hasil branding ini mendongkrak persepsi nilai produk kami hingga lebih dari 50% di mata audiens baru!'
        };
      } else if (isJersey) {
        return {
          client: 'Garuda Sport Co / Phoenix Esports',
          duration: '1-2 Minggu',
          deliverables: 'Pola Sublimasi Kustom, Mockup 3D Premium, Seni Konsep Apparel Tim',
          challenge: 'Mendesain jersey olahraga dan gaming yang tidak hanya memiliki pola pola grafis yang tajam dan dinamis, melainkan juga tata letak sublimasi presisi tinggi yang sesuai dengan anatomi fisik saat dicetak.',
          solution: 'Kami merancang pola kustom bermasukan energi dinamis tinggi. Seluruh skema warna dicocokkan menggunakan format CMYK khusus untuk menjamin keakuratan warna cetak sublimasi 100% tanpa penurunan saturasi.',
          quote: 'Jersey ini sangat nyaman dipakai dan langsung mencuri perhatian di turnamen nasional yang kami ikuti!'
        };
      } else {
        return {
          client: 'Kopinusa / Optima Tech Solutions',
          duration: '3-4 Minggu',
          deliverables: 'React Source Code, Desain UI/UX Figma, Optimasi SEO Kinerja Tinggi, Integrasi Sanity CMS',
          challenge: 'Membangun platform digital modern dengan waktu pemuatan instan (sub-detik) yang menampilkan portofolio kelas premium secara interaktif, responsif penuh di seluler, dan mudah dikelola tanpa database rumit.',
          solution: 'Kami membangun situs web menggunakan React 18+ ditenagai oleh Vite, dibantu Tailwind CSS untuk tata letak yang sangat fleksibel. Animasi mikro ditangani oleh framer-motion, dan semua data dinamis diintegrasikan dengan Sanity CMS.',
          quote: 'Situs web berjalan sangat cepat, dan kami melihat peningkatan interaksi dari formulir kontak WhatsApp secara signifikan.'
        };
      }
    } else {
      // English details
      if (isBranding) {
        return {
          client: 'ANFI Creative Studio / Private Brand',
          duration: '2-3 Weeks',
          deliverables: 'Logo Assets, Brand Guidelines PDF, Social Media Kit, Packaging Mockup',
          challenge: 'The client needed a solid, bold, and instantly recognizable brand identity overhaul. The key challenge was to merge modern design aesthetics with professional vibes without losing the elegance of the brand.',
          solution: 'We designed a custom geometric visual architecture supported by futuristic headings and high-contrast cyan-emerald color accents. All assets were carefully optimized to look sharp on both screens and physical prints.',
          quote: 'The resulting visual branding boosted our product value estimation by more than 50% in the eyes of our new audience!'
        };
      } else if (isJersey) {
        return {
          client: 'Garuda Sport Co / Phoenix Esports',
          duration: '1-2 Weeks',
          deliverables: 'Custom Sublimation Patterns, Premium 3D Mockups, Teamwear Concept Art',
          challenge: 'Designing esports and sports jerseys that sport not only sharp, aerodynamic energy, but also high-precision sublimation layout configurations that conform naturally to human anatomy.',
          solution: 'We drafted custom fiery speed patterns built of vibrant layouts. The overall color profiles were converted to specialized CMYK plates to guarantee 100% sublimation print depth with zero color decay.',
          quote: 'The jerseys are incredibly comfortable and grabbed massive spectator attention in our national tournament matches!'
        };
      } else {
        return {
          client: 'Kopinusa / Optima Tech Solutions',
          duration: '3-4 Weeks',
          deliverables: 'React Source Code, Figma UI/UX Design, High Performance SEO Optimization, Sanity CMS Integration',
          challenge: 'Developing a modern web hub with sub-second page performance loads showcasing premium creative deliverables, keeping design responsiveness flawless across active mobile viewports.',
          solution: 'We bundled the app using React 18+ and Vite, utilizing lightweight Tailwind CSS classes. Staggered animations are powered by motion, with server content dynamic routes connected fully to Sanity CMS.',
          quote: 'Our website feels super snappy, and we instantly got solid contact requests on our WhatsApp channel.'
        };
      }
    }
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
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
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
                    src={project.imageUrl}
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
                    src={selectedProject.imageUrl}
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
                <div className="p-6 md:p-8 max-h-[55vh] overflow-y-auto custom-scrollbar flex flex-col gap-6 md:gap-8">
                  
                  {/* Meta Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-cyan/10 rounded-md border border-brand-cyan/20">
                        <Calendar className="w-4 h-4 text-brand-cyan" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#718096] uppercase font-mono block">{t.caseStudyDur}</span>
                        <span className="text-xs text-white/90 font-medium">{details.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-orange/10 rounded-md border border-brand-orange/20">
                        <Layers className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#718096] uppercase font-mono block">DELIVERABLES</span>
                        <span className="text-xs text-white/90 font-medium truncate max-w-[240px] block">{details.deliverables}</span>
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
                  <div className="bg-[#111924]/80 border border-brand-cyan/20 rounded-xl p-4 flex items-start gap-3 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 text-white/[0.03] text-5xl font-extrabold italic select-none">
                      QUALITY
                    </div>
                    <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-[11px] font-mono text-brand-cyan uppercase tracking-wider font-semibold">{t.caseStudyFeedback}</h5>
                      <p className="text-xs text-white/80 leading-relaxed italic mt-1 font-sans">
                        "{details.quote}"
                      </p>
                    </div>
                  </div>

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
