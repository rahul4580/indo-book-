'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { FaChevronLeft, FaBookOpen, FaPlay, FaPause, FaVolumeUp, FaTimes, FaCheck, FaArrowRight, FaRedo } from 'react-icons/fa';
import { READING_DATA } from '../../../../utils/readingData';

export default function ReadingPage() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeWord, setActiveWord] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Audio handling
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayText = (text, rate = 0.9) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = rate;
    u.onend = () => setIsPlaying(false);
    
    setIsPlaying(true);
    synth.speak(u);
  };

  const startChapter = (chapter) => {
    setSelectedChapter(chapter);
    setActiveStepIndex(0);
    setQuizMode(false);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setShowQuizResult(false);
  };

  const handleNextStep = () => {
    if (activeStepIndex < selectedChapter.steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
      // Auto play audio for next step could be nice, but maybe intrusive. Let's keep it manual.
    } else {
      // End of steps, offer quiz
      setQuizMode(true);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const handleQuizAnswer = (optionIndex) => {
    const currentQuestion = selectedChapter.quiz[currentQuizIndex];
    if (optionIndex === currentQuestion.answer) {
      setQuizScore(prev => prev + 1);
      // Maybe play a happy sound?
    }

    if (currentQuizIndex < selectedChapter.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setShowQuizResult(false);
  };

  return (
    <div className="bg-[#fafafa] dark:bg-black min-h-screen text-black dark:text-white selection:bg-rose-500 selection:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-32 min-h-screen">
        {/* Navigation Header */}
        <div className="mb-8 flex justify-between items-center">
            {selectedChapter ? (
                 <button 
                 onClick={() => {
                     setSelectedChapter(null);
                     setActiveWord(null);
                     if(window.speechSynthesis) window.speechSynthesis.cancel();
                     setIsPlaying(false);
                 }}
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
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-16">
                         <span className="text-xs font-black text-rose-500 tracking-widest uppercase mb-2 block">Japanese Day by Day</span>
                         <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                            Day in the Life
                         </h1>
                         <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                             Follow Tanaka-san through his daily routine. Step-by-step simple stories with audio, translation, and quizzes.
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {READING_DATA.map((chapter) => (
                            <motion.div
                                key={chapter.id}
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer relative"
                                onClick={() => startChapter(chapter)}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${chapter.color} opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-3xl`} />
                                <div className="relative bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-3xl flex flex-col shadow-xl overflow-hidden h-full">
                                     {/* Cover Image */}
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                     <div className="h-48 overflow-hidden relative">
                                         <img src={chapter.coverImage} alt={chapter.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                     </div>
                                     
                                     <div className="p-8 flex-1 flex flex-col">
                                         <div className="flex gap-2 mb-4">
                                             <span className="px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">{chapter.level}</span>
                                         </div>

                                         <h3 className="text-2xl font-black mb-1">{chapter.title}</h3>
                                         <p className="text-sm font-bold opacity-60 mb-2">{chapter.jpTitle}</p>
                                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 flex-1">
                                             {chapter.description}
                                         </p>

                                         <div className="mt-auto w-full">
                                             <div className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors">
                                                 <FaBookOpen /> Start Chapter
                                             </div>
                                         </div>
                                     </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                // READER / QUIZ VIEW
                <motion.div
                    key="reader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-5xl mx-auto"
                >
                    {!quizMode ? (
                        // STORY STEPS VIEW
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
                            {/* Left Side: Image */}
                            <motion.div 
                                key={`img-${activeStepIndex}`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] border border-black/10 dark:border-white/10"
                            >
                                <img 
                                    src={selectedChapter.steps[activeStepIndex].image} 
                                    alt={`Step ${activeStepIndex + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs">
                                    Step {activeStepIndex + 1} / {selectedChapter.steps.length}
                                </div>
                            </motion.div>

                            {/* Right Side: Text & Content */}
                            <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-xl relative">
                                <motion.div
                                    key={`text-${activeStepIndex}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex-1 flex flex-col justify-center"
                                >
                                    {/* Japanese Text (Clickable) */}
                                    <div className="mb-8">
                                        <div className="flex flex-wrap gap-2 text-3xl md:text-4xl font-black font-noto leading-relaxed">
                                            {selectedChapter.steps[activeStepIndex].words.map((word, idx) => (
                                                <span 
                                                    key={idx}
                                                    onClick={() => setActiveWord(word)}
                                                    className={`
                                                        cursor-pointer transition-all border-b-2 border-transparent hover:border-rose-500 hover:text-rose-500
                                                        ${activeWord === word ? 'text-rose-500 border-rose-500' : ''}
                                                    `}
                                                >
                                                    {word.jp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Translation & Grammar */}
                                    <div className="space-y-4 mb-8">
                                        <div className="bg-gray-50 dark:bg-black/30 p-4 rounded-xl border-l-4 border-rose-500">
                                            <p className="text-sm font-bold uppercase tracking-wider opacity-50 mb-1">Translation</p>
                                            <p className="text-lg font-medium">{selectedChapter.steps[activeStepIndex].translation}</p>
                                        </div>
                                        {selectedChapter.steps[activeStepIndex].grammarPoint && (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
                                                <p className="text-sm font-bold uppercase tracking-wider opacity-50 mb-1 text-blue-600 dark:text-blue-400">Grammar Focus</p>
                                                <p className="text-lg font-medium text-blue-800 dark:text-blue-200">{selectedChapter.steps[activeStepIndex].grammarPoint}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Audio Button */}
                                    <button 
                                        onClick={() => handlePlayText(selectedChapter.steps[activeStepIndex].text)}
                                        className="self-start flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold hover:scale-105 transition-transform"
                                    >
                                        {isPlaying ? <FaPause /> : <FaPlay />} <span className="text-xs uppercase tracking-widest">Listen</span>
                                    </button>
                                </motion.div>

                                {/* Navigation Buttons */}
                                <div className="mt-8 flex justify-between items-center pt-8 border-t border-gray-100 dark:border-white/10">
                                    <button 
                                        onClick={handlePrevStep}
                                        disabled={activeStepIndex === 0}
                                        className="px-6 py-3 rounded-xl font-bold opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity"
                                    >
                                        Back
                                    </button>
                                    
                                    <button 
                                        onClick={handleNextStep}
                                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] transition-all flex items-center gap-2"
                                    >
                                        {activeStepIndex === selectedChapter.steps.length - 1 ? (
                                            <>Take Quiz <FaCheck /></>
                                        ) : (
                                            <>Next Step <FaArrowRight /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // QUIZ VIEW
                        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center min-h-[50vh] flex flex-col justify-center">
                            {!showQuizResult ? (
                                <motion.div
                                    key={`question-${currentQuizIndex}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 mb-6">
                                        Question {currentQuizIndex + 1} / {selectedChapter.quiz.length}
                                    </p>
                                    
                                    <h3 className="text-3xl font-black mb-2 font-noto">{selectedChapter.quiz[currentQuizIndex].question}</h3>
                                    <p className="text-lg text-gray-500 mb-10 italic">({selectedChapter.quiz[currentQuizIndex].meaning})</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedChapter.quiz[currentQuizIndex].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(idx)}
                                                className="p-6 rounded-2xl bg-gray-50 dark:bg-black/30 border border-transparent hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 font-bold text-xl transition-all"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-6xl mb-6">🎉</div>
                                    <h2 className="text-4xl font-black mb-4">Quiz Complete!</h2>
                                    <p className="text-xl mb-8">
                                        You scored <span className="text-rose-500 font-bold text-3xl">{quizScore} / {selectedChapter.quiz.length}</span>
                                    </p>
                                    
                                    <div className="flex justify-center gap-4">
                                        <button 
                                            onClick={resetQuiz}
                                            className="px-8 py-3 rounded-full bg-gray-200 dark:bg-zinc-700 font-bold hover:bg-gray-300 transition-colors flex items-center gap-2"
                                        >
                                            <FaRedo /> Retry Quiz
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setSelectedChapter(null);
                                                setActiveStepIndex(0);
                                                setQuizMode(false);
                                            }}
                                            className="px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold hover:scale-105 transition-transform"
                                        >
                                            Next Chapter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Active Word Popover (Same as before but simplified) */}
                    <AnimatePresence>
                        {activeWord && (
                            <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-center sm:items-center p-6">
                                <div 
                                    className="absolute inset-0 bg-black/20 pointer-events-auto" 
                                    onClick={() => setActiveWord(null)}
                                />
                                <motion.div
                                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                                    className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto relative border border-gray-100 dark:border-white/10"
                                >
                                    <button 
                                        onClick={() => setActiveWord(null)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
                                    >
                                        <FaTimes />
                                    </button>
                                    <div className="text-center">
                                        <div className="text-4xl font-black font-noto mb-2">{activeWord.jp}</div>
                                        <div className="text-rose-500 font-bold tracking-widest uppercase text-sm mb-4">{activeWord.romaji}</div>
                                        <div className="bg-gray-50 dark:bg-black/20 px-6 py-3 rounded-xl mb-6 inline-block">
                                            <p className="text-lg font-medium">{activeWord.en}</p>
                                        </div>
                                        <br/>
                                        <button
                                            onClick={() => handlePlayText(activeWord.jp)}
                                            className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-bold text-sm"
                                        >
                                            <FaVolumeUp /> Pronounce
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
