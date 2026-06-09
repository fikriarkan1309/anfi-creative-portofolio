import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { PersonalInfo, ServiceItem, SkillItem } from '../types';
import { Language, TRANSLATIONS } from '../services/language';

interface HeroProps {
  personalInfo: PersonalInfo;
  services: ServiceItem[];
  skills: SkillItem[];
  lang: Language;
}

export default function Hero({ personalInfo, services, skills, lang }: HeroProps) {
  // Parallax setup for cards
  const { scrollY } = useScroll();
  const yCard1 = useTransform(scrollY, [0, 800], [0, -60]);
  const yCard2 = useTransform(scrollY, [0, 800], [0, -120]);
  const yCard3 = useTransform(scrollY, [0, 800], [0, -40]);

  const t = TRANSLATIONS[lang];

  // Dynamic tools fetched from skills collection if available, else fall back to default design stack
  const displayTools = skills && skills.length > 0
    ? skills.slice(0, 10).map(s => ({
        name: s.abbr,
        label: s.name,
        colorHex: s.color,
        imageUrl: s.imageUrl
      }))
    : [
        { name: 'Ai', label: 'Illustrator', colorHex: '#FF7F00' },
        { name: 'Ps', label: 'Photoshop', colorHex: '#00C3FF' },
        { name: 'Id', label: 'InDesign', colorHex: '#FF007F' },
        { name: 'Cdr', label: 'CorelDRAW', colorHex: '#00B050' },
        { name: 'Figma', label: 'Figma', colorHex: '#F24E1E' },
        { name: 'HTML5', label: 'HTML5', colorHex: '#E34F26' },
        { name: 'CSS3', label: 'CSS3', colorHex: '#1572B6' },
        { name: 'JS', label: 'JS', colorHex: '#F7DF1E' },
        { name: 'React', label: 'React', colorHex: '#61DAFB' },
        { name: 'Firebase', label: 'Firebase', colorHex: '#FFCA28' },
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

  const service1Image = services && services[0]?.imageUrl || "/src/assets/images/brand_identity_1780983323908.png";
  const service2Image = services && services[1]?.imageUrl || "/src/assets/images/jersey_design_1780983307716.png";
  const service3Image = services && services[2]?.imageUrl || "/src/assets/images/laptop_web_dev_1780983341066.png";

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
              {displayTools.map((tool) => (
                <div
                  key={tool.name}
                  className="px-3 py-1.5 border text-xs font-mono font-bold tracking-tight rounded-xs transition-transform duration-300 hover:scale-105 flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${tool.colorHex}10`,
                    color: tool.colorHex,
                    borderColor: `${tool.colorHex}35`
                  }}
                  title={tool.label}
                >
                  {tool.imageUrl ? (
                    <img 
                      src={tool.imageUrl} 
                      alt={tool.label} 
                      className="w-3.5 h-3.5 object-contain rounded-xs" 
                      referrerPolicy="no-referrer"
                    />
                  ) : null}
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
                  src={service1Image}
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
                  src={service2Image}
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
                  src={service3Image}
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
