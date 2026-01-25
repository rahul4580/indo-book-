'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';

const SocialLink = ({ icon: Icon, label, href, index }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, x: 5 }}
    className="group flex items-center gap-4 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-4 relative overflow-hidden rounded-2xl"
  >
    <div className="absolute top-0 left-0 h-full w-1 bg-black dark:bg-white scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
    <Icon className="text-2xl text-black dark:text-white z-10" />
    <span className="text-lg font-medium z-10">{label}</span>
    <FaArrowRight className="ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
  </motion.a>
);

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [formStatus, setFormStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setFormStatus('sending');

    const form = event.target;
    const formData = new FormData(form);

    formData.append("access_key", "cac0db14-8c2f-4f4e-b193-4c4b1edc2189");
    formData.append("email", "kumararahul795@gmail.com");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      console.error(error);
      setTimeout(() => setFormStatus(''), 3000);
    }
  }

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/rahul4580' },
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahul-b45153359/' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 ${language === 'jp' ? 'font-noto' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg ${language === 'jp' ? 'font-noto' : ''}`}>
          {t.subtitle}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Left Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-2xl font-bold uppercase mb-8 ${language === 'jp' ? 'font-noto' : ''}`}>
            {t.form_title}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="email" value="kumararahul795@gmail.com" />

            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder={t.name_placeholder}
                required
                className={`w-full bg-gray-100 dark:bg-neutral-900/50 border-none px-6 py-4 rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none ${language === 'jp' ? 'font-noto' : ''}`}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="user_email"
                placeholder={t.email_placeholder}
                required
                className={`w-full bg-gray-100 dark:bg-neutral-900/50 border-none px-6 py-4 rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none ${language === 'jp' ? 'font-noto' : ''}`}
              />
            </div>

            <div className="relative">
              <textarea
                name="message"
                placeholder={t.message_placeholder}
                rows={5}
                required
                className={`w-full bg-gray-100 dark:bg-neutral-900/50 border-none px-6 py-4 rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none resize-none ${language === 'jp' ? 'font-noto' : ''}`}
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={formStatus === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-black text-white dark:bg-white dark:text-black py-4 font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors relative overflow-hidden group rounded-full ${language === 'jp' ? 'font-noto' : ''}`}
            >
              <span className="relative z-10">
                {formStatus === 'sending' ? t.sending : formStatus === 'success' ? t.success : formStatus === 'error' ? t.error : t.button}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </motion.button>

            {formStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-center"
              >
                ✓ {t.success_message}
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Right Column - Social Links & Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h3 className={`text-2xl font-bold uppercase mb-8 ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.connect_title}
            </h3>
            
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <SocialLink key={link.label} {...link} index={index} />
              ))}
            </div>
          </div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-100 dark:bg-white text-black p-8 mt-8 rounded-2xl"
          >
            <h4 className={`text-xl font-bold uppercase mb-4 ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.availability_title}
            </h4>
            <p className={`text-sm leading-relaxed ${language === 'jp' ? 'font-noto' : ''}`}>
              {t.availability_text}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm font-semibold ${language === 'jp' ? 'font-noto' : ''}`}>
                {t.available_now}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
