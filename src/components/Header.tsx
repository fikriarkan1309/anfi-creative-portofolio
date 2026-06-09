import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Globe } from 'lucide-react';
import { Language, TRANSLATIONS } from '../services/language';
import { PersonalInfo } from '../types';

interface HeaderProps {
  personalInfo: PersonalInfo;
  lang: Language;
  onLangChange: (lang: Language) => void;
  onContactClick: () => void;
  onSanitySetOpen: () => void;
}

export default function Header({ personalInfo, lang, onLangChange, onContactClick, onSanitySetOpen }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS[lang];

  const navItems = [
    { name: t.navHome, href: '#home' },
    { name: t.navAbout, href: '#about' },
    { name: t.navServices, href: '#services' },
    { name: t.navPortfolio, href: '#portfolio' },
    { name: t.navProcess, href: '#process' },
    { name: t.navContact, href: '#contact' },
  ];

  const logoText = personalInfo.logoText || 'ANFI CREATIVE';
  const logoSubtext = personalInfo.logoSubtext || 'DESIGN • APPAREL • WEB';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center border-2 border-brand-cyan rotate-45 overflow-hidden transition-transform duration-500 group-hover:rotate-225">
            <span className="text-brand-cyan font-bold -rotate-45 text-sm uppercase">
              {logoText.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-display font-bold tracking-widest text-[#FFFFFF] text-sm md:text-base uppercase">
              {logoText}
            </div>
            <div className="text-[9px] text-[#A0AEC0] tracking-widest font-mono -mt-1 uppercase">
              {logoSubtext}
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[#E2E8F0] hover:text-brand-cyan transition-colors text-xs font-semibold tracking-wider font-display relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          {/* Sanity CMS configuration pill in header */}
          {!personalInfo.hideCmsSettings && (
            <button
              onClick={onSanitySetOpen}
              className="text-[10px] bg-[#1A202C]/60 border border-brand-cyan/20 hover:border-brand-cyan text-brand-cyan py-1 px-2.5 rounded-full font-mono transition-all uppercase tracking-wider"
            >
              CMS Settings
            </button>
          )}
        </nav>

        {/* Let's Talk CTA button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onLangChange(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/5 hover:border-brand-cyan/40 bg-brand-card/10 rounded-xs text-[10px] font-mono tracking-wider text-[#A0AEC0] hover:text-brand-cyan transition-all duration-300"
            title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className={lang === 'id' ? 'text-brand-cyan font-bold' : ''}>ID</span>
            <span className="text-white/20">|</span>
            <span className={lang === 'en' ? 'text-brand-cyan font-bold' : ''}>EN</span>
          </button>

          <button
            onClick={onContactClick}
            className="flex items-center gap-2 border border-white/15 hover:border-brand-cyan py-2 px-5 text-xs font-semibold tracking-wider text-white hover:text-brand-cyan transition-all duration-350 rounded-xs group"
          >
            {t.letsTalk}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => onLangChange(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1 bg-[#1A202C]/60 border border-white/10 text-[10px] py-1 px-2.5 rounded-full font-mono text-white shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="uppercase">{lang}</span>
          </button>

          {!personalInfo.hideCmsSettings && (
            <button
              onClick={onSanitySetOpen}
              className="text-[9px] bg-[#1A202C]/60 border border-brand-cyan/20 text-brand-cyan py-1 px-2 rounded-full font-mono transition-all shrink-0"
            >
              CMS
            </button>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-white hover:text-brand-cyan transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-bg/95 border-b border-white/5 backdrop-blur-lg absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold tracking-wider font-display text-white hover:text-brand-cyan transition-colors"
                >
                  {item.name}
                </a>
              ))}
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  onContactClick();
                }}
                className="flex items-center justify-center gap-2 bg-brand-cyan hover:bg-brand-cyan/85 border border-transparent py-3 px-6 text-sm font-semibold tracking-wider text-[#080C10] transition-all rounded-sm font-display uppercase"
              >
                {t.letsTalk}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
