import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { PersonalInfo } from '../types';
import { Language, TRANSLATIONS } from '../services/language';

interface HeroProps {
  personalInfo: PersonalInfo;
  lang: Language;
}

export default function Hero({ personalInfo, lang }: HeroProps) {
  // Parallax setup for cards
  const { scrollY } = useScroll();
  const yCard1 = useTransform(scrollY, [0, 800], [0, -60]);
  const yCard2 = useTransform(scrollY, [0, 800], [0, -120]);
  const yCard3 = useTransform(scrollY, [0, 800], [0, -40]);

  const t = TRANSLATIONS[lang];

  const tools = [
    { name: 'Ai', label: 'Illustrator', color: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
    { name: 'Ps', label: 'Photoshop', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' },
    { name: 'Id', label: 'InDesign', color: 'bg-pink-500/10 text-pink-500 border-pink-500/30' },
    { name: 'Cdr', label: 'CorelDRAW', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
    { name: 'Figma', label: 'Figma', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
    { name: 'HTML5', label: 'HTML5', color: 'bg-[#FF5722]/10 text-[#FF5722] border-[#FF5722]/30' },
    { name: 'CSS3', label: 'CSS3', color: 'bg-[#2196F3]/10 text-[#2196F3] border-[#2196F3]/30' },
    { name: 'JS', label: 'JS', color: 'bg-[#FFDF00]/10 text-[#FFDF00] border-[#FFDF00]/30' },
    { name: 'React', label: 'React', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    { name: 'Firebase', label: 'Firebase', color: 'bg-[#FFCB2B]/10 text-[#FFCB2B] border-[#FFCB2B]/30' },
  ];

  const handleScrollToPortfolio = () => {
    if (personalInfo.portfolioPdfUrl && !personalInfo.portfolioPdfUrl.includes('YOUR_PORTFOLIO_FILE_ID')) {
      window.open(personalInfo.portfolioPdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="relative lg:min-h-[85vh] pt-20 pb-10 flex items-center overflow-hidden bg-radial-gradient">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 xl:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy and Details (Spans 6 cols on XL to allow wider cards on the right) */}
        <div className="xl:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <span className="text-[#A0AEC0] font-display text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
              {t.helloIm}
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
              {personalInfo.name}
            </h1>
            
            <div className="flex flex-wrap items-center mt-2 gap-2 text-base md:text-xl font-display font-bold uppercase tracking-wider">
              <span className="text-brand-cyan">{personalInfo.titles[0]}</span>
              <span className="text-white">&amp;</span>
              <span className="text-blue-400">{personalInfo.titles[1]}</span>
            </div>
            
            <p className="mt-6 text-[#A0AEC0] text-sm md:text-base leading-relaxed max-w-lg mb-8">
              {lang === 'id' ? t.heroBio : personalInfo.bio}
            </p>
          </motion.div>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 items-center mb-12"
          >
            <button
              onClick={handleScrollToPortfolio}
              className="px-6 py-3.5 bg-brand-cyan text-[#080C10] font-display text-sm font-bold tracking-wider rounded-xs flex items-center gap-2 shadow-lg shadow-brand-cyan/10 transition-all hover:bg-brand-cyan/85 hover:shadow-brand-cyan/20 duration-300 transform active:scale-95 group uppercase"
            >
              {t.viewPortfolio}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            
            <a
              href={`https://wa.me/${personalInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-3.5 border border-white/10 text-white font-display text-sm font-bold tracking-wider rounded-xs flex items-center gap-2 transition-all hover:border-[#25D366] hover:text-[#25D366] duration-300 transform active:scale-95 uppercase"
            >
              <Mail className="w-4 h-4" />
              {t.contactMe}
            </a>
          </motion.div>

          {/* Tools I Use */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <span className="text-[#718096] text-[10px] font-bold uppercase tracking-widest font-mono">
              {t.toolsIUse}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className={`px-3 py-1.5 border text-xs font-mono font-bold tracking-tight rounded-xs transition-transform duration-300 hover:scale-105 ${tool.color}`}
                  title={tool.label}
                >
                  {tool.name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: 3 Vertical Slit Cards (Parallel, Sleek, Staggered) - Now wider and larger with pristine whitespace */}
        <div className="xl:col-span-6 hidden xl:flex items-center justify-end relative py-4 pl-6">
          <div className="flex gap-4 h-[460px] w-full max-w-[540px] items-stretch select-none">
            
            {/* Column 1: Visual Identity */}
            <motion.div
              style={{ y: yCard1 }}
              className="flex-1 bg-[#10161E]/80 border border-brand-cyan/25 rounded-xl p-3.5 flex flex-col justify-between shadow-xl backdrop-blur-md group hover:border-[#00E5FF]/55 transition-all duration-300 cursor-pointer"
            >
              <div className="pb-2 border-b border-white/5">
                <span className="text-[9px] text-[#00E5FF]/90 font-semibold tracking-wider font-mono block">
                  {t.serviceTags.branding}
                </span>
                <span className="text-[10px] text-white/90 font-bold block mt-1 leading-tight uppercase font-display">
                  {lang === 'id' ? 'BRANDING YANG DIPERCAYA' : 'BRANDING THAT BUILDS TRUST'}
                </span>
              </div>
              <div className="flex-1 mt-3 rounded-lg overflow-hidden bg-brand-bg relative">
                <img
                  src="/src/assets/images/brand_identity_1780983323908.png"
                  alt="Visual Identity"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Column 2: Apparel & Jersey (Staggered offset) */}
            <motion.div
              style={{ y: yCard2 }}
              className="flex-1 bg-[#10161E]/80 border border-brand-orange/25 rounded-xl p-3.5 flex flex-col justify-between shadow-xl backdrop-blur-md group hover:border-brand-orange/55 transition-all duration-300 mt-6 -mb-6 cursor-pointer"
            >
              <div className="pb-2 border-b border-white/5">
                <span className="text-[9px] text-brand-orange/90 font-semibold tracking-wider font-mono block">
                  {t.serviceTags.jersey}
                </span>
                <span className="text-[10px] text-white/90 font-bold block mt-1 leading-tight uppercase font-display">
                  {lang === 'id' ? 'DESAIN UNTUK IDENTITAS TIM' : 'DESIGN THAT REPRESENTS pride'}
                </span>
              </div>
              <div className="flex-1 mt-3 rounded-lg overflow-hidden bg-brand-bg relative">
                <img
                  src="/src/assets/images/jersey_design_1780983307716.png"
                  alt="Jersey Design"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Column 3: Web Development */}
            <motion.div
              style={{ y: yCard3 }}
              className="flex-1 bg-[#10161E]/80 border border-blue-500/25 rounded-xl p-3.5 flex flex-col justify-between shadow-xl backdrop-blur-md group hover:border-blue-400/55 transition-all duration-300 cursor-pointer"
            >
              <div className="pb-2 border-b border-white/5">
                <span className="text-[9px] text-blue-400 font-semibold tracking-wider font-mono block">
                  {t.serviceTags.website}
                </span>
                <span className="text-[10px] text-white/90 font-bold block mt-1 leading-tight uppercase font-display">
                  {lang === 'id' ? 'WEBSITE DENGAN LOAD CEPAT' : 'WEBSITES THAT DRIVE GROWTH'}
                </span>
              </div>
              <div className="flex-1 mt-3 rounded-lg overflow-hidden bg-brand-bg relative">
                <img
                  src="/src/assets/images/laptop_web_dev_1780983341066.png"
                  alt="Web Development"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
