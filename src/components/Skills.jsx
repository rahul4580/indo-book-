'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGraphql, SiPython, SiPandas, SiDocker, SiFigma } from "react-icons/si";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({ title, skills, icon: Icon, className }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group skill-card ${className}`}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-black dark:bg-white scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
    <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="text-2xl text-black dark:text-white" />}
        <h3 className="text-xl font-bold uppercase tracking-wider">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className="px-3 py-1 bg-white dark:bg-neutral-800 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-neutral-700">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language].skills;
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.skill-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section id="skills" ref={container} className="py-24 px-8 md:px-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="mb-16">
        <h2 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 ${language === 'jp' ? 'font-noto' : ''}`}>
             {language === 'en' ? <>Technical<br/>Expertise</> : t.title}
        </h2>
        <p className={`text-gray-600 dark:text-gray-400 max-w-xl text-lg ${language === 'jp' ? 'font-noto' : ''}`}>
            {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillCard 
            title={t.frontend} 
            skills={['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'HTML5', 'CSS3/SASS', 'Redux', 'Motion']}
            icon={SiReact}
            className={language === 'jp' ? 'font-noto' : ''}
        />
        <SkillCard 
            title={t.backend}
            skills={['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Firebase']}
            icon={SiNodedotjs}
            className={language === 'jp' ? 'font-noto' : ''}
        />
        <SkillCard 
            title={t.data}
            skills={['Python', 'Pandas', 'NumPy', 'SQL', 'Tableau', 'Excel', 'D3.js']}
            icon={SiPython}
            className={language === 'jp' ? 'font-noto' : ''}
        />
        <SkillCard 
            title={t.tools}
            skills={['Git/GitHub', 'Docker', 'Postman', 'VS Code', 'Figma', 'Jira', 'Vercel']}
            icon={SiDocker}
            className={language === 'jp' ? 'font-noto' : ''}
        />
      </div>

       <div className="mt-16 p-8 bg-gray-100 dark:bg-white text-black flex flex-col md:flex-row justify-between items-center rounded-2xl">
            <div className="mb-4 md:mb-0">
                <h3 className={`text-2xl font-bold uppercase ${language === 'jp' ? 'font-noto' : ''}`}>{t.results}</h3>
                <p className={`text-sm opacity-70 mt-1 max-w-md ${language === 'jp' ? 'font-noto' : ''}`}>
                    {t.results_desc}
                </p>
            </div>
            <button className={`px-8 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-full ${language === 'jp' ? 'font-noto' : ''}`}>
                {t.view_projects}
            </button>
       </div>
    </section>
  );
};

export default Skills;
