'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { FaChevronLeft, FaPlay, FaBookOpen, FaLanguage, FaLightbulb, FaVolumeUp, FaLaughSquint, FaStar } from 'react-icons/fa';
import { ANIME_MANGA_DATA, RECOMMENDED_N5_ANIME, FUNNY_ANIME_2000S } from '../../../../utils/animeMangaData';

export default function AnimeMangaPage() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [activeTab, setActiveTab] = useState('dialogue'); // 'dialogue', 'vocab', 'notes'
  
  // Audio synthesis
  const handlePlayText = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ja-JP';
        u.rate = 1.0; 
        window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-[#fafafa] dark:bg-black min-h-screen text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 overflow-hidden font-sans">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-32 min-h-screen">
        {/* Navigation Header */}
        <div className="mb-8 flex justify-between items-center z-20 relative">
            {selectedChapter ? (
                 <button 
                 onClick={() => setSelectedChapter(null)}
                 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
               >
                 <FaChevronLeft /> Back to Library
               </button>
            ) : (
                <a href="/more/languages" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                    <FaChevronLeft /> Back to Languages
                </a>
            )}
        </div>

        <AnimatePresence mode='wait'>
            {!selectedChapter ? (
                // LIBRARY VIEW
                <motion.div 
                    key="library"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="text-center mb-16 relative">
                         <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
                            Anime Study
                         </h1>
                         <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                             Learn real Japanese from your favorite scenes.
                         </p>
                    </div>

                    {/* EPISODES GRID */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-8">
                             <h2 className="text-2xl font-black tracking-tight">N5 Lessons</h2>
                             <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {ANIME_MANGA_DATA.map((chapter) => (
                                <motion.div
                                    key={chapter.id}
                                    whileHover={{ y: -5 }}
                                    className="group cursor-pointer bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden hover:border-black/20 dark:hover:border-white/30 transition-all duration-300 shadow-lg dark:shadow-none"
                                    onClick={() => setSelectedChapter(chapter)}
                                >
                                    {/* Thumbnail */}
                                    <div className="aspect-video bg-black relative overflow-hidden">
                                         <img src={chapter.thumbnail} alt={chapter.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                         
                                         <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white rounded text-[10px] font-bold border border-white/10 uppercase tracking-wider">
                                            {chapter.level}
                                         </div>
                                         
                                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                             <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform">
                                                 <FaPlay className="ml-1" />
                                             </div>
                                         </div>
                                    </div>
                                    
                                    <div className="p-5">
                                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{chapter.theme}</p>
                                         <h3 className="text-lg font-black leading-tight mb-1">{chapter.title}</h3>
                                         <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">{chapter.jpTitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RECOMMENDATIONS SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                         {/* TOP 10 N5 LIST */}
                         <div>
                            <div className="flex items-center gap-3 mb-8">
                                <FaStar className="text-xl" />
                                <h2 className="text-2xl font-black tracking-tight">Top 10 N5 Anime</h2>
                            </div>
                            <div className="space-y-4">
                                {RECOMMENDED_N5_ANIME.map((anime, i) => (
                                    <div key={anime.id} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
                                        <div className="text-2xl font-black opacity-20 w-8">{i + 1}</div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-none mb-1">{anime.title}</h3>
                                            <p className="text-xs text-gray-500 mb-2">{anime.jpTitle}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug mb-2">{anime.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {anime.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-gray-500">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>

                         {/* FUNNY ANIME LIST */}
                         <div>
                            <div className="flex items-center gap-3 mb-8">
                                <FaLaughSquint className="text-xl" />
                                <h2 className="text-2xl font-black tracking-tight">Funny Anime (2000-Now)</h2>
                            </div>
                            <div className="space-y-4">
                                {FUNNY_ANIME_2000S.map((anime, i) => (
                                    <div key={anime.id} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors">
                                        <div className="text-2xl font-black opacity-20 w-8">{i + 1}</div>
                                        <div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-lg leading-none">{anime.title}</h3>
                                                <span className="text-xs font-mono opacity-50">{anime.year}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-2">{anime.jpTitle}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug mb-2">{anime.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {anime.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-gray-500">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>

                </motion.div>
            ) : (
                // PLAYER VIEW
                <motion.div
                    key="player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT COLUMN: Player & Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Video Player Wrapper */}
                            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                                <iframe 
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedChapter.videoId}`} 
                                    title={selectedChapter.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-black mb-1">{selectedChapter.title}</h2>
                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span className="font-black text-white">{selectedChapter.jpTitle}</span>
                                        <span>•</span>
                                        <span>{selectedChapter.theme}</span>
                                    </div>
                                </div>
                                <div className="bg-black/5 dark:bg-white/5 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-sm max-w-sm">
                                    <FaBookOpen className="inline mb-1 mr-2 opacity-50"/> 
                                    {selectedChapter.description}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Content Tabs */}
                        <div className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-xl">
                            {/* Tabs Header */}
                            <div className="flex border-b border-black/5 dark:border-white/5">
                                {[
                                    { id: 'dialogue', label: 'Script', icon: <FaLanguage /> },
                                    { id: 'vocab', label: 'Vocab', icon: <FaBookOpen /> },
                                    { id: 'notes', label: 'Notes', icon: <FaLightbulb /> },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${activeTab === tab.id ? 'text-black dark:text-white bg-black/5 dark:bg-white/5 border-b-2 border-black dark:border-white' : 'text-gray-400'}`}
                                    >
                                        <span className="text-lg">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                {activeTab === 'dialogue' && (
                                    <div className="space-y-6">
                                        {selectedChapter.dialogue.map((line, idx) => (
                                            <div key={idx} className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-xs font-black uppercase opacity-40">{line.character}</span>
                                                    <button onClick={() => handlePlayText(line.jp)} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-black dark:hover:text-white">
                                                        <FaVolumeUp />
                                                    </button>
                                                </div>
                                                <p className="text-lg font-bold mb-1 font-noto">{line.jp}</p>
                                                <p className="text-xs text-gray-500 font-mono mb-2">{line.romaji}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 border-t border-black/5 dark:border-white/5 pt-2 mt-2">{line.en}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'vocab' && (
                                    <div className="space-y-3">
                                        {selectedChapter.vocabulary.map((word, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-black/5 dark:border-white/5 last:border-0">
                                                <div className="bg-black text-white dark:bg-white dark:text-black p-2 rounded-lg font-black text-xl min-w-[50px] text-center font-noto">
                                                    {word.jp}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-300">{word.romaji}</p>
                                                    <p className="text-xs text-gray-500">{word.en}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'notes' && (
                                    <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-2xl">
                                        <h4 className="font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2 opacity-60">
                                            <FaLightbulb /> Cultural Note
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                            {selectedChapter.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
