import Link from 'next/link';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language].nav;

  const links = [
    { name: t.home, href: '/' },
    { name: t.about, href: '/about' },
    { name: t.love, href: '/#love' },
    { name: t.contact, href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold tracking-tighter uppercase cursor-pointer"
      >
        <Link href="/">DEVPORTFOLIO</Link>
      </motion.div>

      <div className="flex gap-8 items-center">
        {links.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link href={link.href} className={`text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity ${language === 'jp' ? 'font-noto' : ''}`}>
              {link.name}
            </Link>
          </motion.div>
        ))}
        
        <div className="flex items-center gap-4">
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => toggleLanguage()}
                className="px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xs font-bold"
            >
                {language === 'en' ? 'JP' : 'EN'}
            </motion.button>

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() => toggleTheme()}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
