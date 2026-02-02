'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../../components/Navbar'; // Adjust import if needed based on structure
import Footer from '../../../../components/Footer';
import { FaChevronLeft, FaPaperPlane, FaUser, FaCircle } from 'react-icons/fa';

export default function ConversationPage() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Polling for new messages
  useEffect(() => {
    let interval;
    if (isJoined) {
      fetchMessages();
      interval = setInterval(fetchMessages, 2000);
    }
    return () => clearInterval(interval);
  }, [isJoined]);

  // Auto-scroll to bottom (Contained)
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);


  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText(''); 

    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: username,
          text: textToSend,
        }),
      });
      fetchMessages();
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="bg-[#fafafa] dark:bg-[#050505] min-h-screen text-black dark:text-white transition-colors duration-500 overflow-hidden flex flex-col font-mono">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-32 pb-8 flex flex-col h-screen">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-4 flex items-center justify-between"
        >
           <a href="/more/languages" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
             <FaChevronLeft /> Exit Room
           </a>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-500">Live</span>
           </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col justify-center max-w-4xl mx-auto w-full relative z-10 h-full">
          
          {!isJoined ? (
            // JOIN SCREEN
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl backdrop-blur-md text-center max-w-md mx-auto w-full shadow-2xl shadow-neutral-200 dark:shadow-red-900/10"
            >
              <h1 className="text-3xl font-black mb-2 tracking-tighter">
                会話 <span className="text-red-500 dark:text-red-600">CHAT</span>
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
                Enter your nickname (ニックネーム) to join.
              </p>
              
              <form onSubmit={handleJoin} className="space-y-4">
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Tanaka-san" 
                    className="w-full bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white px-12 py-4 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-neutral-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={15}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!username.trim()}
                  className="w-full bg-black dark:bg-red-600 hover:bg-neutral-800 dark:hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  START CHAITING
                </button>
              </form>
            </motion.div>
          ) : (
            // CHAT ROOM
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-[65vh] md:h-[70vh] bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl"
            >
              {/* Messages Area - Hidden Scrollbar Style */}
              <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-transparent"
              >
                <div className="text-center py-4">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest border-b border-neutral-200 dark:border-neutral-800 pb-1">
                    History
                  </span>
                </div>
                
                <AnimatePresence initial={false}>
                  {messages.map((msg) => {
                    const isMe = msg.user === username;
                    const isSystem = msg.user === 'System';
                    
                    if (isSystem) {
                      return (
                        <motion.div 
                          key={msg.id} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-center my-2"
                        >
                          <span className="bg-neutral-100 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 text-xs px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800">
                            {msg.text}
                          </span>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                          <span className={`text-[10px] mb-1 px-1 ${isMe ? 'text-blue-500 dark:text-red-400' : 'text-neutral-400 dark:text-neutral-500'}`}>
                            {msg.user}
                          </span>
                          <div 
                            className={`px-4 py-2 rounded-2xl break-words text-sm md:text-base ${
                              isMe 
                                ? 'bg-blue-600 dark:bg-red-600 text-white rounded-tr-none shadow-md' 
                                : 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-neutral-200 rounded-tl-none border border-neutral-200 dark:border-neutral-700'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[9px] text-neutral-400 mt-1 px-1 opacity-50">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-gray-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Message..."
                    className="flex-grow bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 text-black dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-red-500 transition-colors placeholder:text-neutral-400"
                  />
                  <button 
                    type="submit" 
                    className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-xl hover:opacity-80 transition-opacity disabled:opacity-50"
                    disabled={!inputText.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}



