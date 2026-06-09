import {
  Mail,
  MapPin,
  Instagram,
  ArrowUpRight,
  Headphones,
  CheckCircle,
  Clock,
  ArrowUp,
  Linkedin
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
                href={personalInfo.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer noopener"
                className="w-7 h-7 rounded-full border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/5 flex items-center justify-center text-[#A0AEC0] hover:text-brand-cyan transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={personalInfo.behanceUrl || "https://behance.net/anficreative"}
                target="_blank"
                rel="noreferrer noopener"
                className="w-7 h-7 rounded-full border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/5 flex items-center justify-center text-[#A0AEC0] hover:text-brand-cyan transition-colors"
                title="Behance"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8.228 15.01c0 .762-.315 1.258-.944 1.488-.344.126-.856.189-1.536.189H4.11v-3.771h1.512c.708 0 1.22.072 1.536.216.711.315 1.07 1.053 1.07 1.878zm-.243-5.068c0 .666-.279 1.134-.837 1.404-.315.153-.783.225-1.404.225H4.11V8.65h1.494c.594 0 1.035.063 1.323.189.693.306 1.058.918 1.058 1.103zm10.741 1.944c-.117-1.125-.99-1.935-2.223-1.935-1.134 0-2.07.783-2.286 1.935zm1.53.531c-.045 2.16-1.575 3.861-4.086 3.861-2.529 0-4.131-1.746-4.131-4.158s1.656-4.221 4.257-4.221c2.619 0 4.023 1.836 3.96 4.518h-6.264c.09 1.206.873 1.971 2.142 1.971.864 0 1.566-.369 1.899-1.071zm-2.43-4.527h-3.411v-.702h3.411zm3.763-1.282C24 3.12 20.88 0 17 0H7C3.12 0 0 3.12 0 7v10c0 3.88 3.12 7 7 7h10c3.88 0 7-3.12 7-7zm-11.83 9.477c0 .666-.18 1.224-.54 1.674-.531.675-1.512 1.008-2.943 1.008H2v-11.34h3.79c1.944 0 3.069.603 3.375 1.809.126.504.189.963.189 1.377 0 1.035-.387 1.773-1.161 2.214.927.468 1.391 1.296 1.391 2.484z" />
                </svg>
              </a>
              <a
                href={personalInfo.tiktokUrl || "https://tiktok.com/@anficreative"}
                target="_blank"
                rel="noreferrer noopener"
                className="w-7 h-7 rounded-full border border-white/10 hover:border-brand-cyan hover:bg-brand-cyan/5 flex items-center justify-center text-[#A0AEC0] hover:text-brand-cyan transition-colors"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.18.91 1.09 2.17 1.81 3.54 2.06v3.86c-1.3-.12-2.56-.63-3.62-1.39-.73-.52-1.36-1.18-1.85-1.95v7.6c.06 2.66-1.15 5.23-3.23 6.89-2.12 1.75-5.03 2.37-7.66 1.62-2.61-.71-4.78-2.61-5.63-5.18-.94-2.73-.42-5.91 1.41-8.15 1.74-2.18 4.49-3.27 7.23-2.9v3.82c-1.5-.15-3.03.35-4.01 1.5-.96 1.07-1.16 2.68-.53 3.95.63 1.33 2.04 2.16 3.52 2.08 1.74-.01 3.23-1.42 3.28-3.16V0zm0 0" />
                </svg>
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
