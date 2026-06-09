import {
  Mail,
  MapPin,
  Instagram,
  ArrowUpRight,
  Headphones,
  CheckCircle,
  Clock,
  ArrowUp,
  Linkedin,
  Youtube
} from 'lucide-react';
import { PersonalInfo } from '../types';
import { Language, TRANSLATIONS } from '../services/language';

interface ContactCTAProps {
  personalInfo: PersonalInfo;
  lang: Language;
}

export default function ContactCTA({ personalInfo, lang }: ContactCTAProps) {
  const t = TRANSLATIONS[lang];
  const logoText = personalInfo.logoText || 'ANFI CREATIVE';
  const logoSubtext = personalInfo.logoSubtext || 'DESIGN • APPAREL • WEB';

  const benefits = [
    {
      title: t.benefit1Title,
      desc: t.benefit1Desc,
      icon: <Headphones className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: t.benefit2Title,
      desc: t.benefit2Desc,
      icon: <CheckCircle className="w-5 h-5 text-brand-orange" />
    },
    {
      title: t.benefit3Title,
      desc: t.benefit3Desc,
      icon: <Clock className="w-5 h-5 text-blue-400" />
    }
  ];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#060A0E] pt-12 pb-6 relative overflow-hidden border-t border-white/5Off">
      {/* Background spotlights */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Have a Project in Mind Call To Action Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-white/5 pb-10 mb-10 items-center">
          
          {/* CTA Message (Spans 6 columns) */}
          <div className="lg:col-span-6">
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-none mb-2 whitespace-pre-line">
              {t.contactCtaTitle}
            </h3>
            <p className="text-[#A0AEC0] text-xs leading-relaxed mb-5">
              {t.contactCtaSubtitle}
            </p>
            
            <a
              href={`https://wa.me/${personalInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 bg-brand-cyan text-[#080C10] font-display text-xs font-bold tracking-wider rounded-xs py-3 px-6 shadow-lg shadow-brand-cyan/15 hover:bg-brand-cyan/85 transition-all duration-300 transform active:scale-95 group uppercase"
            >
              {t.letsWorkTogether}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Benefits Column (Spans 6 columns) */}
          <div className="lg:col-span-6 flex flex-col md:flex-row lg:flex-col gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-brand-card/30 border border-white/5 rounded-lg flex-1 cursor-pointer transition-all hover:bg-brand-card/60"
              >
                <div className="p-2 bg-white/5 rounded-md text-brand-cyan shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-white text-xs font-display font-bold uppercase tracking-wider">
                    {benefit.title}
                  </h4>
                  <p className="text-[#A0AEC0] text-[11px] leading-relaxed mt-1">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Three columns footer list section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/5 mb-8">
          
          {/* Col 1: About Anfi (Spans 6 columns) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center border-2 border-brand-cyan rotate-45 overflow-hidden transition-transform duration-500">
                <span className="text-brand-cyan font-bold -rotate-45 text-sm uppercase">
                  {logoText.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-display font-bold tracking-widest text-white text-base block uppercase">
                  {logoText}
                </span>
                <span className="text-[9px] text-[#A0AEC0] tracking-widest font-mono -mt-1 block uppercase">
                  {logoSubtext}
                </span>
              </div>
            </a>
            
            <p className="text-[#A0AEC0] text-xs leading-relaxed max-w-md">
              {t.footerAbout}
            </p>

            {/* Social handles */}
            <div className="flex gap-2">
              <a
                href={`https://instagram.com/${personalInfo.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer noopener"
                className="w-7 h-7 rounded-full border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/5 flex items-center justify-center text-[#A0AEC0] hover:text-brand-cyan transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-7 h-7 rounded-full border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/5 flex items-center justify-center text-[#A0AEC0] hover:text-brand-cyan transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer noopener"
                className="w-7 h-7 rounded-full border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/5 flex items-center justify-center text-[#A0AEC0] hover:text-brand-cyan transition-colors"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Contact Info (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-white text-xs font-display font-extrabold tracking-widest uppercase pb-2 border-b border-white/5">
              CONTACT INFO
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#A0AEC0]">
              <li className="flex items-center gap-2">
                <span className="text-brand-cyan font-semibold">WA:</span>
                <a
                  href={`https://wa.me/${personalInfo.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {personalInfo.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#718096] shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-brand-cyan transition-colors truncate">
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#718096] shrink-0" />
                <a
                  href={`https://instagram.com/${personalInfo.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-brand-cyan transition-colors"
                >
                  {personalInfo.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#718096] shrink-0" />
                <span>{personalInfo.location === 'Indonesia' && lang === 'en' ? 'Indonesia' : personalInfo.location}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-white text-xs font-display font-extrabold tracking-widest uppercase pb-2 border-b border-white/5">
              QUICK FILES
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#A0AEC0]">
              <li>
                <a href="#home" className="hover:text-brand-cyan transition-colors">{t.navHome}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-cyan transition-colors">{t.navAbout}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-cyan transition-colors">{t.navServices}</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-brand-cyan transition-colors">{t.navPortfolio}</a>
              </li>
              <li>
                <a href="#process" className="hover:text-brand-cyan transition-colors">{t.navProcess}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#718096]">
          <span>© 2026 ANFI CREATIVE. All Rights Reserved.</span>
          
          <button
            onClick={handleBackToTop}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-cyan text-[#A0AEC0] hover:text-brand-cyan flex items-center justify-center transition-all duration-300 transform active:scale-90"
            title={t.backToTop}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
