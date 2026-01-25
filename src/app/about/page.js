'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';
import Navbar from '../../components/Navbar';
import { FaLaptopCode, FaGlobeAsia, FaRocket, FaDatabase, FaAnchor } from 'react-icons/fa';

const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={`bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8 rounded-3xl relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

export default function About() {
  const { language } = useLanguage();
  const t = translations[language].about;
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white overflow-hidden transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      
      {/* Hero Header */}
      <div className="container mx-auto px-6 pt-32 pb-16 md:pt-48 md:pb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-2 rounded-full border border-black/10 dark:border-white/10 mb-6 bg-gray-100 dark:bg-neutral-900"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {t.hero_badge}
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-6xl md:text-9xl font-bold mb-8 leading-none tracking-tighter ${language === 'jp' ? 'font-noto' : ''}`}
        >
          {t.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed ${language === 'jp' ? 'font-noto' : ''}`}
        >
          {t.subtitle}
        </motion.p>
      </div>

      <div ref={containerRef} className="container mx-auto px-6 pb-32 relative z-10">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
          
          {/* Main Intro - Large Card */}
          <BentoCard className="md:col-span-2 md:row-span-1 flex flex-col justify-between min-h-[300px]" delay={0.1}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FaLaptopCode className="text-9xl" />
            </div>
            <div>
              <h3 className={`text-3xl font-bold mb-4 ${language === 'jp' ? 'font-noto' : ''}`}>{t.intro.title}</h3>
              <p className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed ${language === 'jp' ? 'font-noto' : ''}`}>
                {t.intro.text}
              </p>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Coding daily</span>
            </div>
          </BentoCard>

          {/* Language / Global Mindset */}
          <BentoCard className="flex flex-col justify-center items-center text-center bg-gray-50 dark:bg-neutral-800/50" delay={0.2}>
            <div className="w-20 h-20 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-neutral-700 flex items-center justify-center mb-6 shadow-lg">
              <FaGlobeAsia className="text-3xl" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${language === 'jp' ? 'font-noto' : ''}`}>{t.language.title}</h3>
            <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-bold mb-2">
              {t.language.level}
            </span>
            <p className={`text-sm text-gray-500 dark:text-gray-400 ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.language.text}
            </p>
          </BentoCard>

          {/* Story / One Piece */}
          <BentoCard className="md:row-span-2 bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-black" delay={0.3}>
             <div className="absolute -bottom-10 -right-10 opacity-5 dark:opacity-10 rotate-12">
               <FaAnchor className="text-[200px]" />
             </div>
             <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${language === 'jp' ? 'font-noto' : ''}`}>
               <span className="text-3xl">☠️</span> {t.story.title}
             </h3>
             <p className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 ${language === 'jp' ? 'font-noto' : ''}`}>
               {t.story.text}
             </p>
             <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5">
                <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Tech Stack Origin</div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'MongoDB', 'Express'].map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
             </div>
          </BentoCard>

          {/* Goals */}
          <BentoCard className="md:col-span-2 flex flex-col justify-center" delay={0.4}>
             <div className="flex items-start gap-6">
                <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-2xl text-orange-600 dark:text-orange-400 shrink-0">
                  <FaRocket className="text-2xl" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold mb-3 ${language === 'jp' ? 'font-noto' : ''}`}>{t.goals.title}</h3>
                  <p className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed ${language === 'jp' ? 'font-noto' : ''}`}>
                    {t.goals.text}
                  </p>
                </div>
             </div>
          </BentoCard>

        </div>

        {/* Skills List Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className={`text-3xl font-bold mb-12 text-center uppercase tracking-widest ${language === 'jp' ? 'font-noto' : ''}`}>
            {t.skills_title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.skills_list.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="text-center"
              >
                <div className="w-16 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
                <h4 className={`text-xl font-bold mb-3 ${language === 'jp' ? 'font-noto' : ''}`}>{skill.name}</h4>
                <p className={`text-gray-500 dark:text-gray-400 ${language === 'jp' ? 'font-noto' : ''}`}>{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-32"
        >
          <a href="/#contact" className={`inline-block px-10 py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 ${language === 'jp' ? 'font-noto' : ''}`}>
            {t.cta}
          </a>
        </motion.div>

      </div>
      
      {/* Background Ambience */}
      <div className="fixed top-20 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
