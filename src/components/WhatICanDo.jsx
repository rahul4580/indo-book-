'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { SiMongodb, SiReact, SiNodedotjs } from "react-icons/si";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const MERNCard = ({ title, icon: Icon, capabilities, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className="bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8 rounded-2xl relative overflow-hidden group"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black/0 via-black to-black/0 dark:from-white/0 dark:via-white dark:to-white/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-black text-white dark:bg-white dark:text-black rounded-xl">
        {Icon && <Icon className="text-3xl" />}
      </div>
      <h3 className="text-2xl font-bold uppercase tracking-wider">{title}</h3>
    </div>

    <div className="space-y-6">
      {capabilities.map((capability, idx) => (
        <div key={idx} className="border-l-2 border-gray-300 dark:border-neutral-700 pl-4 hover:border-black dark:hover:border-white transition-colors duration-300">
          <h4 className="text-lg font-semibold mb-2 text-black dark:text-white">{capability.title}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{capability.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const WhatICanDo = () => {
  const { language } = useLanguage();
  const t = translations[language].whatICanDo;
  const container = useRef(null);

  const mernStack = [
    {
      title: 'MongoDB',
      icon: SiMongodb,
      capabilities: t.mongodb
    },
    {
      title: 'Express.js',
      icon: SiNodedotjs,
      capabilities: t.express
    },
    {
      title: 'React.js',
      icon: SiReact,
      capabilities: t.react
    },
    {
      title: 'Node.js',
      icon: SiNodedotjs,
      capabilities: t.node
    }
  ];

  return (
    <section id="what-i-can-do" ref={container} className="relative z-10 py-24 px-8 md:px-20 bg-white dark:bg-black text-black dark:text-white border-t border-gray-200 dark:border-neutral-900 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.4 }}
        className="mb-16"
      >
        <h2 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 ${language === 'jp' ? 'font-noto' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 dark:text-gray-400 max-w-2xl text-lg ${language === 'jp' ? 'font-noto' : ''}`}>
          {t.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mernStack.map((item, index) => (
          <MERNCard 
            key={item.title}
            title={item.title}
            icon={item.icon}
            capabilities={item.capabilities}
            index={index}
          />
        ))}
      </div>

      <div className="mt-16 p-8 bg-gray-100 dark:bg-white text-black flex flex-col md:flex-row justify-between items-center transition-colors duration-300 rounded-2xl">
        <div className="mb-4 md:mb-0">
          <h3 className={`text-2xl font-bold uppercase ${language === 'jp' ? 'font-noto' : ''}`}>{t.cta_title}</h3>
          <p className={`text-sm opacity-70 mt-1 max-w-md ${language === 'jp' ? 'font-noto' : ''}`}>
            {t.cta_description}
          </p>
        </div>
        <button className={`px-8 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-full ${language === 'jp' ? 'font-noto' : ''}`}>
          {t.cta_button}
        </button>
      </div>
    </section>
  );
};

export default WhatICanDo;
