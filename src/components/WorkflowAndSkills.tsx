import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { SkillItem, TestimonialItem, ProcessItem } from '../types';
import { Language, TRANSLATIONS } from '../services/language';
import { urlForImage } from '../services/sanity';

interface WorkflowAndSkillsProps {
  skills: SkillItem[];
  testimonials: TestimonialItem[];
  processes: ProcessItem[];
  lang: Language;
}

export default function WorkflowAndSkills({
  skills,
  testimonials,
  processes,
  lang
}: WorkflowAndSkillsProps) {
  const t = TRANSLATIONS[lang];
  
  // Group skills by category
  const designSkills = skills.filter((s) => s.category === 'Design');
  const devSkills = skills.filter((s) => s.category === 'Development');

  // Multi-lang step translators
  const getProcessCopy = (proc: ProcessItem, index: number) => {
    if (lang === 'en') {
      if (index === 0) return { title: t.process1Title, desc: t.process1Desc };
      if (index === 1) return { title: t.process2Title, desc: t.process2Desc };
      if (index === 2) return { title: t.process3Title, desc: t.process3Desc };
      if (index === 3) return { title: t.process4Title, desc: t.process4Desc };
      return { title: t.process5Title, desc: t.process5Desc };
    }
    return { title: proc.title, desc: proc.description };
  };

  return (
    <section id="process" className="py-12 md:py-16 relative bg-brand-bg overflow-hidden border-t border-b border-white/5">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-[10%] w-72 h-72 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] w-72 h-72 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Column 1: MY PROCESS (Spans 4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col h-full bg-[#0A0D12]/20 p-1.5 rounded-lg">
          <div className="mb-5">
            <span className="text-brand-cyan text-xs font-bold font-display tracking-[0.2em] uppercase block mb-1">
              {t.processTitle}
            </span>
            <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-wider">
              {t.processSubtitle}
            </h3>
            <div className="w-8 h-1 bg-brand-cyan mt-2 rounded-full" />
          </div>

          {/* Stepper with connecting line */}
          <div className="flex flex-col gap-4 relative pl-3">
            {/* The absolute vertical connector line */}
            <div className="absolute top-3 bottom-3 left-[15px] w-[2px] bg-brand-cyan/20 pointer-events-none" />

            {processes.map((proc, index) => {
              const info = getProcessCopy(proc, index);
              return (
                <motion.div
                  key={proc.step}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 relative z-10 group"
                >
                  {/* Connecting Circle/Node */}
                  <div className="w-7 h-7 rounded-full bg-[#131921] border border-brand-cyan flex items-center justify-center text-[10px] font-mono font-bold text-brand-cyan shadow-md shadow-brand-cyan/5 group-hover:bg-brand-cyan group-hover:text-black duration-300 transform group-hover:scale-105 shrink-0">
                    {proc.step}
                  </div>
                  
                  {/* Stepper Content */}
                  <div className="pt-0.5">
                    <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider group-hover:text-brand-cyan transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-[#A0AEC0] text-[11px] leading-relaxed mt-1">
                      {info.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Column 2: SKILLS GRID (Spans 4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="mb-5">
            <span className="text-brand-orange text-xs font-bold font-display tracking-[0.2em] uppercase block mb-1">
              {t.skillsTitle}
            </span>
            <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-wider">
              {t.skillsSubtitle}
            </h3>
            <div className="w-8 h-1 bg-brand-orange mt-2 rounded-full" />
          </div>

          <div className="flex flex-col gap-6">
            {/* Design sub-block */}
            <div>
              <span className="text-[#718096] text-[10px] font-bold font-mono tracking-widest uppercase block mb-3 animate-pulse-slow">
                {t.skillsDesignStack}
              </span>
              <div className="grid grid-cols-5 gap-2">
                {designSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col items-center gap-1 focus:outline-none"
                  >
                    <div
                      className="w-10 h-10 bg-brand-card/70 border border-white/5 rounded-lg flex items-center justify-center text-xs font-mono font-extrabold cursor-pointer hover:border-brand-cyan/35 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden p-1.5"
                      title={`${skill.name} - ${skill.level}%`}
                    >
                      {skill.imageUrl ? (
                        <img src={urlForImage(skill.imageUrl)} alt={skill.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="font-mono text-xs font-extrabold" style={{ color: skill.color }}>
                          {skill.abbr}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-[#A0AEC0] font-mono tracking-tight text-center max-w-[50px] truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Development sub-block */}
            <div>
              <span className="text-[#718096] text-[10px] font-bold font-mono tracking-widest uppercase block mb-3 animate-pulse-slow">
                {t.skillsDevStack}
              </span>
              <div className="grid grid-cols-5 gap-2">
                {devSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-10 h-10 bg-brand-card/70 border border-white/5 rounded-lg flex items-center justify-center text-xs font-mono font-extrabold cursor-pointer hover:border-brand-cyan/35 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden p-1.5"
                      title={`${skill.name} - ${skill.level}%`}
                    >
                      {skill.imageUrl ? (
                        <img src={urlForImage(skill.imageUrl)} alt={skill.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="font-mono text-xs font-extrabold" style={{ color: skill.color }}>
                          {skill.abbr}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-[#A0AEC0] font-mono tracking-tight text-center max-w-[50px] truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: TESTIMONIALS (Spans 4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="mb-5">
            <span className="text-blue-400 text-xs font-bold font-display tracking-[0.2em] uppercase block mb-1">
              {t.testimonialsTitle}
            </span>
            <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-wider">
              {t.testimonialsSubtitle}
            </h3>
            <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full" />
          </div>

          {/* Testimonial stack */}
          <div className="flex flex-col gap-3">
            {testimonials.map((test, index) => {
              // Optionally customize quote translation if static fallback is evaluated
              let quote = test.quote;
              if (lang === 'en') {
                if (index === 0) quote = "The jersey designs are incredibly sick and the detail is top-notch! The process was fast and highly collaborative.";
                else if (index === 1) quote = "The branding they built is extremely professional and helped our business look highly credible.";
                else if (index === 2) quote = "The website they created is modern, blazing fast, and effortless to navigate. Highly recommended!";
              }

              return (
                <motion.div
                  key={test.id || `test-${index}`}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="bg-brand-card/40 border border-white/5 rounded-lg p-4 flex flex-col hover:bg-brand-card/70 duration-300"
                >
                  {/* Quote details */}
                  <p className="text-[#A0AEC0] text-[11px] leading-relaxed italic mb-4">
                    "{quote}"
                  </p>

                  {/* Stars and Author info row */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-2.5 mt-auto gap-2">
                    <div className="flex items-center gap-2.5">
                      {/* Dynamic Image or Initials Avatar Placeholder */}
                      {test.avatarUrl ? (
                        <img
                          src={test.avatarUrl}
                          alt={test.author}
                          className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#121E2C] to-[#1A2E44] border border-[#00E5FF]/20 flex items-center justify-center text-[10px] font-mono font-bold text-brand-cyan shrink-0">
                          {test.author ? test.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                        </div>
                      )}
                      <div>
                        <h5 className="text-white font-display font-bold text-[11px] uppercase tracking-wide">
                          {test.author}
                        </h5>
                        <span className="text-[9px] text-[#718096] font-medium block">
                          {test.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <div className="flex items-center gap-0.5 select-none">
                        {[...Array(test.rating)].map((_, ratingIdx) => (
                          <Star key={ratingIdx} className="w-2.5 h-2.5 text-brand-orange fill-brand-orange" />
                        ))}
                      </div>
                      <span className="text-[9px] text-white/50 font-mono font-bold leading-none">
                        5.0
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
