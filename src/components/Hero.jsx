'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import lkj from '../../public/lkj.png'; 
import Scene3D from './Scene3D';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-24 pb-12 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* 3D Background */}
      <Scene3D />

      {/* Left Content */}
      <div className="flex-1 z-10 space-y-8 pointer-events-none"> {/* Allow clicks to pass through to canvas if needed, but buttons need pointer-events-auto */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
             <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] ${language === 'jp' ? 'font-noto' : ''}`}>
            Rahul.<br />
            <span className="text-gray-500 dark:text-gray-400">{t.role}</span><br />
            {language === 'en' ? 'Dev' : ''}
          </h1>
        </motion.div>
       

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-md text-gray-400 text-lg"
        >
          <p>
            Crafting minimalist digital experiences. Frontend architecture, clean code, and data insights.
          </p>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="flex gap-4"
        >
            <button className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                RESUME
            </button>
            <button className="px-6 py-3 border border-black/20 dark:border-white/20 text-black dark:text-white font-semibold rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                CONTACT
            </button>
        </motion.div>
      </div>

      {/* Right Content - Image */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.2, duration: 0.8 }}
         className="flex-1 flex justify-center md:justify-end relative mt-12 md:mt-0"
      >
        <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] grayscale hover:grayscale-0 transition-all duration-500">
            <div className="absolute inset-0 border-2 border-black/20 dark:border-white/20 translate-x-4 translate-y-4"></div>
             {/* Using standard img tag if local file import issues, but Image component is better. 
                 Assuming lkj is in public folder as /lkj.png based on previous file usage.
              */}
            <Image 
                src={lkj} 
                alt="Profile" 
                layout="fill"
                objectFit="cover"
                className="z-10 bg-gray-900" 
            />
            
            <div className="absolute top-4 right-4 z-20 bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Open to work
            </div>
        </div>
      </motion.div>


    </section>
  );
};

export default Hero;
