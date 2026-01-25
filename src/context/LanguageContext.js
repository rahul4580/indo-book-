'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Persist language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = (lang) => {
    // If a specific language is provided, use it; otherwise toggle
    const newLang = lang ? lang : (language === 'en' ? 'jp' : 'en');
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
