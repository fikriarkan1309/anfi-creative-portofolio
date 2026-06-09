import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { Language, TRANSLATIONS } from '../services/language';
import { urlForImage } from '../services/sanity';

interface ServicesProps {
  services: ServiceItem[];
  lang: Language;
}

export default function Services({ services, lang }: ServicesProps) {
  const t = TRANSLATIONS[lang];

  // Configured colors for cards (Visual Identity: cyan, Apparel: orange, Web: blue)
  const cardStyles = [
    {
      glow: 'shadow-brand-cyan/5 hover:shadow-brand-cyan/15 hover:border-brand-cyan/40',
      tagColor: 'text-brand-cyan bg-brand-cyan/10',
      numColor: 'text-brand-cyan/20'
    },
    {
      glow: 'shadow-brand-orange/5 hover:shadow-brand-orange/15 hover:border-brand-orange/40',
      tagColor: 'text-brand-orange bg-brand-orange/10',
      numColor: 'text-brand-orange/20'
    },
    {
      glow: 'shadow-blue-500/5 hover:shadow-blue-500/15 hover:border-blue-500/40',
      tagColor: 'text-blue-400 bg-blue-500/10',
      numColor: 'text-blue-500/20'
    }
  ];

  return (
    <section id="services" className="py-12 md:py-16 relative bg-brand-bg overflow-hidden border-t border-b border-white/5">
      {/* Background glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-10 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl font-display font-extrabold text-white/[0.02] tracking-widest select-none uppercase">
            {t.servicesTitle}
          </div>
          <span className="text-brand-cyan text-xs font-bold font-display tracking-[0.25em] uppercase block mb-1 relative z-10">
            {t.servicesSubtitle}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight relative z-10 uppercase">
            {t.servicesHeadline}
          </h2>
          <div className="w-12 h-1 bg-brand-cyan mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Services Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => {
            const style = cardStyles[index % cardStyles.length];
            return (
              <motion.div
                key={service.id || `service-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-brand-card/30 border border-white/5 rounded-xl p-5 md:p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-350 cursor-pointer ${style.glow}`}
              >
                
                {/* Number & Header Info */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-4xl font-display font-extrabold leading-none ${style.numColor}`}>
                      {service.index}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-xs uppercase ${style.tagColor}`}>
                      {index === 0 ? t.serviceTags.branding : index === 1 ? t.serviceTags.jersey : t.serviceTags.website}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-display font-extrabold text-white uppercase tracking-wider mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#A0AEC0] text-[11px] leading-relaxed mb-4">
                    {lang === 'id' ? (
                      index === 0 ? t.serviceDescs.branding :
                      index === 1 ? t.serviceDescs.jersey :
                      t.serviceDescs.website
                    ) : service.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="flex flex-col gap-1.5 mb-5">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-[#E2E8F0]">
                        <span className={`w-1 h-1 rounded-full ${index === 0 ? 'bg-brand-cyan' : index === 1 ? 'bg-brand-orange' : 'bg-blue-400'}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service image showcase mock inside card */}
                <div className="mt-auto relative rounded-lg overflow-hidden h-[120px] bg-slate-900/60 border border-white/5 group">
                  <img
                    src={urlForImage(service.imageUrl)}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/10 to-transparent" />
                </div>
                
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center">
          <a
            href="#portfolio"
            className="flex items-center gap-2 border border-white/10 hover:border-brand-cyan py-2.5 px-6 text-xs font-semibold tracking-wider text-white hover:text-brand-cyan transition-all duration-300 rounded-xs group font-display uppercase"
          >
            {t.viewAllServices}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
