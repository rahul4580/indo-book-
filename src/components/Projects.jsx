'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, category, description, image, className }) => (
    <motion.div 
        whileHover={{ scale: 0.98 }}
        className={`group cursor-pointer project-card ${className}`}
    >
        <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 relative overflow-hidden mb-4">
            {/* Placeholder for project image */}
            <div className={`absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 transition-colors group-hover:bg-neutral-700`}>
                {image ? (
                     // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                    <span>Project Preview</span>
                )}
            </div>
            <div className="absolute top-4 left-4">
                 <span className="text-xs font-mono bg-black text-white px-2 py-1 uppercase">{category}</span>
            </div>
        </div>
        <h3 className="text-2xl font-bold mb-1 group-hover:underline decoration-1 underline-offset-4">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <div className="flex gap-2 mt-4">
             <button className="px-4 py-1 border border-white/20 text-xs uppercase hover:bg-white hover:text-black transition-colors">React</button>
             <button className="px-4 py-1 border border-white/20 text-xs uppercase hover:bg-white hover:text-black transition-colors">Next.js</button>
        </div>
    </motion.div>
);

const Projects = () => {
    const { language } = useLanguage();
    const t = translations[language].projects;
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: container.current,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }, { scope: container });

    const projects = [
        {
            title: "E-commerce Dashboard",
            category: "React App",
            description: "A comprehensive admin panel for managing products, orders, and analytics with real-time data.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Financial Data Visualizer",
            category: "Data Viz",
            description: "Interactive stock market visualization tool transforming complex datasets into digestible insights.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Social Media API",
            category: "Backend",
            description: "High-performance backend API designed to handle millions of requests for a social platform.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

  return (
    <section id="projects" ref={container} className="py-24 px-8 md:px-20 bg-black text-white border-t border-neutral-900">
       <div className="text-center mb-20">
           <div className={`inline-block border border-white/20 rounded-full px-4 py-1 text-sm uppercase tracking-widest mb-4 ${language === 'jp' ? 'font-noto' : ''}`}>
               {t.label}
           </div>
           <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${language === 'jp' ? 'font-noto' : ''}`}>
                {language === 'en' ? <>Digital Experiences<br />& Data Narratives</> : t.title}
           </h2>
           <p className={`text-gray-400 max-w-2xl mx-auto ${language === 'jp' ? 'font-noto' : ''}`}>
                {t.description}
           </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <ProjectCard key={index} {...project} className={language === 'jp' ? 'font-noto' : ''} />
            ))}
       </div>

       <div className="flex justify-center mt-20">
            <button className={`px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors ${language === 'jp' ? 'font-noto' : ''}`}>
                {t.explore}
            </button>
       </div>
    </section>
  );
};

export default Projects;
