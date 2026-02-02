'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrapper } from '@/components';
import { Icon } from '@iconify/react';

const slides = [
  {
    id: 1,
    title: "NOTRE VISION",
    description: "Explorer et préserver les merveilles naturelles du Gabon. Nous croyons en un avenir où l'homme et la nature coexistent en harmonie, valorisant la biodiversité unique de notre région.",
    img: "/images/activite/vision.webp",
    features: [
      { label: "Savoirs", icon: "lucide:book-open" },
      { label: "Durabilité", icon: "lucide:leaf" },
      { label: "Inclusivité", icon: "lucide:users" }
    ]
  },
  {
    id: 2,
    title: "NOTRE HISTOIRE",
    description: "Nés d'une passion commune pour l'aventure et la conservation, nous parcourons les forêts et les rivières pour documenter la beauté sauvage et inspirer le changement.",
    img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "À PROPOS",
    description: "",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2000&auto=format&fit=crop"
  }
];

const About = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <section id="a-propos" className="relative w-full min-h-screen py-20 flex items-center justify-center overflow-hidden bg-white">

      {/* Main Slider Container - Centered Card Style */}
      <div className="relative w-[95%] max-w-7xl h-[600px] md:h-[750px] rounded-[30px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-slate-900 group">

        {/* Background Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[activeSlide].img}')` }}
          >
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <Wrapper className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 py-20 md:py-0">

          {/* Active Content */}
          <div className="w-full max-w-xl md:mb-0 mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.h2
                  className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter"
                  style={{ lineHeight: 0.85 }}
                >
                  {slides[activeSlide].title}
                </motion.h2>
                <p className="text-base md:text-lg text-slate-200 mb-8 max-w-md leading-relaxed">
                  {slides[activeSlide].description}
                </p>

                {/* Feature Icons for Vision Slide */}
                {slides[activeSlide].features && (
                  <div className="flex flex-wrap gap-6 mb-8">
                    {slides[activeSlide].features.map((feat, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                          <Icon icon={feat.icon} width="24" height="24" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{feat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="hidden md:inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-accent hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                  En savoir plus
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cards Stack (Thumbnails) */}
          <div className="flex row md:absolute md:right-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex-row gap-4 md:gap-6 items-center overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {slides.map((slide, index) => {
              // We show the items that are NOT the active slide as cards
              if (index === activeSlide) return null;

              return (
                <motion.div
                  layoutId={`card-${slide.id}`}
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className="relative w-40 h-56 md:w-44 md:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all border-2 border-white/20 hover:border-white/60 group/card flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${slide.img}')` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-sm leading-tight uppercase tracking-wider">{slide.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows & Mobile CTA */}
          <div className="flex flex-col md:flex-row items-center gap-6 mt-10 md:absolute md:bottom-10 md:left-20">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-lg backdrop-blur-sm"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-lg backdrop-blur-sm"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>

            <button className="md:hidden w-full px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-accent hover:text-white transition-all shadow-xl">
              En savoir plus
            </button>
          </div>

        </Wrapper>

        {/* Decorative "Creative Coder" Text Footer (optional matching image) */}
        <div className="absolute bottom-4 right-10 text-[10px] text-white/20 font-mono tracking-[0.5em] uppercase">
          KEVA Experience
        </div>

      </div>
    </section>
  ) : (
    <></>
  );
};

export default About;
