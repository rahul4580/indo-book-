"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../../../components/Navbar";
import { db, storage, auth } from "../../../../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { ref, onValue, push, remove, query, limitToLast, orderByChild } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { gsap } from "gsap";
import { Send, Zap, Clock, Sparkles, Paperclip, Loader2, File, AlertCircle } from "lucide-react";

export default function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. Initialize Auth & User ID
  useEffect(() => {
    // Authenticate anonymously to allow Storage/DB access depending on rules
    signInAnonymously(auth)
      .then((userCredential) => {
        // Use the Firebase Auth UID if possible, or fallback to local ID
        // setUserId(userCredential.user.uid); 
        // Keeping logic consistent with user request "cookie for each guy", let's restart local ID logic 
        // OR better: link them. For now, let's just sign in.
      })
      .catch((error) => {
        console.warn("Auth failed (likely explicitly disabled). Continuing in public mode. If your rules require auth, actions will fail.", error);
        // Do not show global error unless an actual operation fails
      });

    let storedUserId = localStorage.getItem("chat_user_id");
    if (!storedUserId) {
      storedUserId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chat_user_id", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // 2. Optimized Listen to Messages
  useEffect(() => {
    const messagesRef = ref(db, "messages");
    const recentMessagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(50));
    
    const unsubscribe = onValue(recentMessagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const now = Date.now();
        const tenHours = 10 * 60 * 60 * 1000;
        const validMessages = [];

        messageList.forEach((msg) => {
          if (now - msg.timestamp > tenHours) {
             remove(ref(db, `messages/${msg.id}`)).catch(() => {});
          } else {
            validMessages.push(msg);
          }
        });

        validMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(validMessages);
      } else {
        setMessages([]);
      }
      setLoading(false);
    }, (error) => {
        // Error listener
        console.error("DB Error:", error);
        setError("Failed to sync messages.");
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
        const behavior = loading ? "auto" : "smooth";
        messagesEndRef.current.scrollIntoView({ behavior });
    }
  }, [messages, loading]);
  
  // 4. Animation
  useEffect(() => {
    if (!loading && chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { opacity: 0, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const textPayload = newMessage;
    setNewMessage(""); 

    try {
        const messagesRef = ref(db, "messages");
        await push(messagesRef, {
          text: textPayload,
          userId: userId,
          timestamp: Date.now(),
          type: 'text'
        });
    } catch (err) {
        setError("Failed to send message. Check connection.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset error
    setError(null);
    setUploading(true);
    
    try {
        // Filename hygiene
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const path = `uploads/${Date.now()}_${cleanName}`;
        const fileRef = storageRef(storage, path);
        
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const messagesRef = ref(db, "messages");
        const type = file.type.startsWith('image/') ? 'image' : 'file';
        
        await push(messagesRef, {
            text: file.name,
            fileUrl: downloadURL,
            userId: userId,
            timestamp: Date.now(),
            type: type
        });
    } catch (err) {
        console.error("Upload failed details:", err);
        // Show user-friendly error
        if (err.code === 'storage/unauthorized') {
            setError("Permission denied: Enabling secure access...");
            // Retry auth might be needed, but usually header failure
        } else {
            setError(`Upload failed: ${err.message}`);
        }
    } finally {
        setUploading(false);
        e.target.value = null;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#fafafa] dark:bg-black text-black dark:text-white font-sans transition-colors duration-500 overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Error Toast */}
      {error && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[60] bg-red-500/90 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl animate-bounce flex items-center gap-2 backdrop-blur-md">
            <AlertCircle size={14} /> {error}
            <button onClick={() => setError(null)} className="ml-2 hover:text-white/80">×</button>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center pt-24 pb-4 px-4 h-full relative w-full">
        
       {/* Background */}
       <div className="absolute inset-0 pointer-events-none -z-10 transform-gpu opacity-50 dark:opacity-100">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 dark:bg-indigo-900/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[100px]" />
       </div>

        <div 
          ref={chatContainerRef}
          className="w-full max-w-5xl h-full max-h-[85vh] md:max-h-[80vh] bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[32px] shadow-2xl shadow-black/5 dark:shadow-black/50 flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <header className="h-14 px-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between shrink-0 bg-white/40 dark:bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-white/10">
                 <Zap size={16} />
              </div>
              <h1 className="text-sm font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
                Ephemeral Uplink
              </h1>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
              <Clock size={10} className="mr-1" />
              10H Retention
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 scroll-smooth custom-scrollbar">
            {loading ? (
              <div className="space-y-4 p-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
                    <div className={`h-10 rounded-2xl bg-black/5 dark:bg-white/5 w-[40%] ${i % 2 === 0 ? 'rounded-tr-sm' : 'rounded-tl-sm'}`} />
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
                  <Sparkles size={24} className="text-black/30 dark:text-white/30" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-black/60 dark:text-white/60">No Signal Yet</p>
                  <p className="text-xs text-black/40 dark:text-white/40">Initiate the protocol.</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => {
                const isMine = msg.userId === userId;
                
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMine ? "items-end" : "items-start"} fade-in-up`}
                  >
                    <div className="relative max-w-[85%] md:max-w-[60%] group">
                      <div
                        className={`
                          px-4 py-2.5 text-[14px] leading-relaxed shadow-sm break-words
                          ${isMine 
                            ? "bg-black text-white dark:bg-white dark:text-black rounded-[18px] rounded-tr-sm" 
                            : "bg-white text-black dark:bg-neutral-800 dark:text-white border border-black/5 dark:border-white/5 rounded-[18px] rounded-tl-sm"}
                        `}
                      >
                         {msg.type === 'image' ? (
                            <div className="space-y-1">
                                <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-white/10 dark:border-black/10">
                                    <img src={msg.fileUrl} alt="attachment" className="w-full h-auto object-cover max-h-[300px]" loading="eager" />
                                </a>
                            </div>
                         ) : msg.type === 'file' ? (
                             <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-black/10 dark:bg-white/10 rounded-full">
                                    <File size={16} />
                                </div>
                                <span className="text-xs font-medium underline decoration-dotted truncate max-w-[150px]">
                                    {msg.text || "File"}
                                </span>
                             </a>
                         ) : (
                             msg.text
                         )}
                      </div>
                      <div className={`mt-1 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity text-black/30 dark:text-white/30 ${isMine ? "text-right" : "text-left"}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* Input Area */}
          <footer className="p-3 bg-white/80 dark:bg-black/60 backdrop-blur-xl border-t border-black/5 dark:border-white/5 shrink-0 z-20">
            <form 
              onSubmit={handleSendMessage}
              className={`
                flex items-center gap-2 p-1.5 rounded-[24px] bg-white dark:bg-neutral-900 border transition-all duration-200
                ${isFocused 
                    ? "border-black/20 dark:border-white/20 ring-1 ring-black/5 dark:ring-white/5" 
                    : "border-black/5 dark:border-white/5"}
              `}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-black/40 dark:text-white/40 transition-colors"
                title="Attach file"
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Paperclip size={18} />}
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Message..."
                disabled={uploading}
                className="flex-1 bg-transparent border-none text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 px-2 py-2 focus:ring-0 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || uploading}
                className={`
                  p-2.5 rounded-full transition-all duration-200 flex items-center justify-center
                  ${newMessage.trim() && !uploading
                    ? "bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95" 
                    : "bg-black/5 text-black/20 dark:bg-white/5 dark:text-white/20 cursor-not-allowed"}
                `}
              >
                <Send size={16} className={newMessage.trim() ? "translate-x-0.5" : ""} />
              </button>
            </form>
          </footer>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .fade-in-up {
            animation: fadeInUp 0.25s cubic-bezier(0.2, 0.0, 0.2, 1) forwards;
            will-change: transform, opacity;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
