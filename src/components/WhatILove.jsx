'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { FaPalette, FaBolt, FaRocket, FaPuzzlePiece, FaArrowRight } from 'react-icons/fa';

const LoveCard = ({ icon: Icon, title, description, index, language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative w-full bg-gray-100 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 p-8 md:p-12 hover:bg-gray-200 dark:hover:bg-neutral-900 transition-colors duration-500 overflow-hidden rounded-3xl"
    >
      {/* Background Gradient Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 dark:from-neutral-800/0 dark:to-neutral-800/0 group-hover:from-black/5 group-hover:to-transparent dark:group-hover:from-neutral-800/30 dark:group-hover:to-transparent transition-all duration-500"></div>
      
      {/* Decorative Index */}
      <span className="absolute top-8 right-8 text-6xl font-black text-gray-300 dark:text-neutral-800/50 group-hover:text-black/10 dark:group-hover:text-white/10 transition-colors duration-500 select-none">
        0{index + 1}
      </span>

      <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
        <div>
          <div className="mb-8 inline-flex items-center justify-center p-4 bg-black/5 dark:bg-white/5 rounded-3xl group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
             <Icon className="text-3xl" />
          </div>
          
          <h3 className={`text-3xl font-bold mb-4 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors duration-300 ${language === 'jp' ? 'font-noto' : ''}`}>
            {title}
          </h3>
          
          <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-lg group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300 ${language === 'jp' ? 'font-noto' : ''}`}>
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
          <span>Explore</span>
          <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

const WhatILove = () => {
  const { language } = useLanguage();
  const t = translations[language].love;
  const container = useRef(null);

  const loves = [
    {
      icon: FaPalette,
      title: language === 'en' ? "Creative Design" : "クリエイティブデザイン",
      description: language === 'en' 
        ? "Crafting beautiful, intuitive interfaces that users love. Every pixel matters."
        : "ユーザーが愛する美しく直感的なインターフェースを作成。すべてのピクセルが重要です。"
    },
    {
      icon: FaBolt,
      title: language === 'en' ? "Performance" : "パフォーマンス",
      description: language === 'en'
        ? "Building lightning-fast applications that deliver seamless experiences."
        : "シームレスな体験を提供する超高速アプリケーションの構築。"
    },
    {
      icon: FaRocket,
      title: language === 'en' ? "Innovation" : "イノベーション",
      description: language === 'en'
        ? "Pushing boundaries with cutting-edge technologies and modern solutions."
        : "最先端技術と現代的なソリューションで境界を押し広げる。"
    },
    {
      icon: FaPuzzlePiece,
      title: language === 'en' ? "Problem Solving" : "問題解決",
      description: language === 'en'
        ? "Turning complex challenges into elegant, scalable solutions."
        : "複雑な課題をエレガントでスケーラブルなソリューションに変える。"
    }
  ];

  return (
    <section ref={container} className="relative py-32 bg-white dark:bg-black text-black dark:text-white overflow-hidden border-t border-gray-200 dark:border-neutral-900 transition-colors duration-300">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-900/40 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-blue-900/30 rounded-full blur-[128px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className={`inline-block px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-sm font-medium tracking-widest text-gray-500 dark:text-gray-400 mb-6 uppercase ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.label}
            </div>
            <h2 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6 ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.title}
            </h2>
            <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.description}
            </p>
          </motion.div>

          {/* Magnetic CTA */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden md:flex items-center justify-center w-40 h-40 rounded-full border border-black/20 dark:border-white/20 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 group`}
          >
            <div className="text-center">
              <span className={`block text-sm font-bold uppercase tracking-widest ${language === 'jp' ? 'font-noto' : ''}`}>
                {language === 'en' ? "Let's\nTalk" : "話そう"}
              </span>
              <FaArrowRight className="inline-block mt-2 text-lg transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </motion.button>
        </div>

        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {loves.map((love, index) => (
            <LoveCard 
              key={index} 
              {...love} 
              index={index} 
              language={language} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatILove;
