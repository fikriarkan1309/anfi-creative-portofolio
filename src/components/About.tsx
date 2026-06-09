import { motion } from 'motion/react';
import { Award, Briefcase, Users, Download } from 'lucide-react';
import { PersonalInfo } from '../types';
import { Language, TRANSLATIONS } from '../services/language';

interface AboutProps {
  personalInfo: PersonalInfo;
  lang: Language;
}

export default function About({ personalInfo, lang }: AboutProps) {
  const t = TRANSLATIONS[lang];

  const stats = [
    {
      value: `${personalInfo.experienceYears}+`,
      label: t.statExperience,
      icon: <Award className="w-5 h-5 text-brand-cyan" />
    },
    {
      value: `${personalInfo.projectsCount}+`,
      label: t.statProjects,
      icon: <Briefcase className="w-5 h-5 text-brand-orange" />
    },
    {
      value: `${personalInfo.clientsCount}+`,
      label: t.statClients,
      icon: <Users className="w-5 h-5 text-blue-400" />
    }
  ];

  const whatIDo = [
    {
      title: t.whatIDoBrandingTitle,
      desc: t.whatIDoBrandingDesc,
      color: 'border-brand-cyan/20 hover:border-brand-cyan/60'
    },
    {
      title: t.whatIDoApparelTitle,
      desc: t.whatIDoApparelDesc,
      color: 'border-brand-orange/20 hover:border-brand-orange/60'
    },
    {
      title: t.whatIDoWebTitle,
      desc: t.whatIDoWebDesc,
      color: 'border-blue-500/20 hover:border-blue-500/60'
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 relative bg-[#090D12] overflow-hidden">
      {/* Accent Background Lines */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-radial-gradient opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Portrait Offset Mockup (Perfect for transparent PNGs) */}
        <div className="col-span-1 lg:col-span-5 h-full flex items-center justify-center relative select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-[280px] w-full mx-auto aspect-[3/4] group"
          >
            {/* The Offset Background Solid/Outline frame */}
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border border-brand-cyan/40 bg-brand-card/25 shadow-xl transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-brand-cyan/60" />
            
            {/* Ambient cyan backglow glow */}
            <div className="absolute -inset-1 bg-brand-cyan/5 rounded-2xl blur-lg opacity-40 transition-opacity duration-500 group-hover:opacity-75" />

            {/* The Floating Image Area */}
            <div className="relative w-full h-full rounded-2xl border border-white/5 bg-[#0D1219]/65 overflow-hidden flex flex-col justify-end">
              <img
                src={personalInfo.aboutPhotoUrl || "/src/assets/images/fikri_portrait_1780983289777.png"}
                alt="Fikri Arkan Portrait"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-104 group-hover:brightness-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay elements */}
              <div className="relative z-10 w-full p-4 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end">
                {/* Glowing Signature text */}
                <span className="font-display text-lg font-normal text-brand-cyan block italic tracking-wide font-mono glow-text opacity-95">
                  Fikri Arkan
                </span>
                <span className="text-[8px] text-white/50 tracking-widest uppercase font-mono mt-0.5">
                  FOUNDER OF ANFI CREATIVE
                </span>
              </div>
            </div>
            
            {/* Micro aesthetic glowing corners */}
            <div className="absolute top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-brand-cyan rounded-tl-sm pointer-events-none" />
            <div className="absolute bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-brand-cyan rounded-br-sm pointer-events-none" />
          </motion.div>
        </div>

        {/* Right Side: Copy, Statistics and WHAT I DO */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Subcol 1: About and Statistics */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-brand-cyan text-xs font-bold font-display tracking-[0.2em] uppercase mb-1 block">
                {t.aboutSectionTitle}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mb-3 leading-tight whitespace-pre-line">
                {t.aboutHeadline}
              </h2>
              <p className="text-[#A0AEC0] text-xs leading-relaxed mb-4">
                {lang === 'id' ? t.aboutBio : personalInfo.aboutText}
              </p>
            </div>

            {/* Stats list */}
            <div className="flex flex-col gap-3 mt-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-brand-card/55 border border-white/5 rounded-lg p-3 hover:bg-brand-card/90 transition-all duration-300">
                  <div className="p-2 rounded-md bg-white/5">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl font-display font-extrabold text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#718096] font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subcol 2: What I Do Card Stack */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-[#718096] text-xs font-bold font-display tracking-[0.2em] uppercase block mb-3">
                {t.whatIDo}
              </span>
              <div className="flex flex-col gap-3">
                {whatIDo.map((job, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 bg-brand-card/30 transition-all duration-350 hover:bg-brand-card/60 hover:-translate-y-0.5 ${job.color}`}
                  >
                    <h3 className="text-xs font-display font-bold text-white uppercase tracking-wider mb-1">
                      {job.title}
                    </h3>
                    <p className="text-[#A0AEC0] text-[11px] leading-relaxed">
                      {job.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download CV button */}
            <button
              onClick={() => {
                const url = personalInfo.cvUrl || 'https://drive.google.com';
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-white/10 hover:border-brand-cyan text-white hover:text-brand-cyan font-display text-xs font-bold tracking-wider rounded-xs transition-all duration-350 bg-transparent group uppercase animate-pulse-slow"
            >
              <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              {t.downloadCv}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
