'use client';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingControls = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'agent' | 'user', text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Auto-open chat on load with greeting
    // Delay slightly for effect
    const timer = setTimeout(() => {
      setIsChatOpen(true);
      setMessages([
        { role: 'agent', text: "Salut, je suis Keva, assistant. Je suis assistant Keva, que puis-je faire pour vous ?" }
      ]);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'agent', text: "Merci pour votre message. Ceci est une démonstration, je ne peux pas encore répondre réellement." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4 items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 sm:w-96 overflow-hidden flex flex-col mb-2 origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-accent p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon icon="lucide:bot" width="18" height="18" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Assistant Keva</h3>
                  <span className="text-[10px] text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    En ligne
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-white/10 p-1 rounded transition-colors"
              >
                <Icon icon="lucide:x" width="18" height="18" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                      ? 'bg-accent text-white rounded-tr-none'
                      : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:border-accent font-sans text-slate-700"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center hover:bg-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon icon="lucide:send" width="16" height="16" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 items-center">
        {/* Chatbot Toggle Icon (opens/closes) */}
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-white text-accent rounded-full shadow-xl flex items-center justify-center border border-slate-100 hover:shadow-2xl transition-all relative"
            title="Ouvrir le chat"
          >
            <Icon icon="lucide:message-circle" width="28" height="28" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          </motion.button>
        )}

        {/* Scroll To Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0f291e] transition-colors"
              title="Revenir en haut"
            >
              <Icon icon="lucide:arrow-up" width="24" height="24" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingControls;
