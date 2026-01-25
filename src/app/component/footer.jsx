"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

const AnimatedText = ({ text, className }) => {
  return (
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true }}
        className={className}
      >
        {text}
      </motion.h2>
    </div>
  );
};

export default function Footer() {
  const [time, setTime] = useState("");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  
  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" };
      const formattedTime = now.toLocaleTimeString("en-GB", options);
      setTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer ref={container} className="relative w-full bg-gray-50 dark:bg-neutral-950 text-black dark:text-white overflow-hidden pt-20 pb-10 transition-colors duration-300">
      {/* Background massive text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[20vw] font-bold whitespace-nowrap leading-none text-black dark:text-white animate-marquee">
          LET'S CONNECT — LET'S CONNECT —
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <AnimatedText 
              text="Let's build something" 
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-2" 
            />
            <AnimatedText 
              text="extraordinary together." 
              className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-500 dark:text-gray-500" 
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-xl text-gray-600 dark:text-gray-400 font-light"
            >
              Feel free to reach out anytime! open for collaborations.
            </motion.p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
          >
            <FaArrowUp className="text-2xl" />
          </motion.button>
        </div>

        <div className="h-px w-full bg-black/10 dark:bg-white/10 mb-16"></div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Contact Details</p>
              <a href="mailto:kumararahul795@gmail.com" className="block text-xl md:text-2xl font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors mb-2">
                kumararahul795@gmail.com
              </a>
              <a href="tel:+918882410076" className="block text-xl md:text-2xl font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                +91 8882410076
              </a>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/rahul4580" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-black/10 dark:border-white/10 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/rahul-b45153359/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border border-black/10 dark:border-white/10 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
             <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Location</p>
             <div className="text-2xl font-light">
                <p>New Delhi, India</p>
                <p className="text-gray-500">Asia</p>
             </div>
             <div className="mt-6 flex items-center gap-2 text-green-500">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium tracking-wider text-gray-400">OPEN TO WORK</span>
             </div>
          </div>

          {/* Time */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Local Time</p>
            <p className="text-4xl font-mono tabular-nums">{time}</p>
            <p className="text-gray-500 mt-2">GMT+5:30</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 dark:border-white/10 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Rahul Kumar. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
