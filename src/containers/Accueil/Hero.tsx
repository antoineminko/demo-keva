'use client';
import { heroSection } from '@/lib/content/hero';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { getBreakpointsWidth } from '@/lib/utils/helper';
import { useEffect, useState } from 'react';
import { Button } from '@/components';
import { slideUp } from '@/styles/animations';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  // Default values from static content
  const defaults = {
    tagline: heroSection.tagline,
    description: heroSection.description,
    imageUrl: "https://www.keva-in.org/images/banner-slider/PXL_20230716_121628084.jpg"
  };

  const [content, setContent] = useState(defaults);
  const [banner, setBanner] = useState({ text: '', active: false });
  const [isMounted, setIsMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedContent = localStorage.getItem('heroContent');
    if (savedContent) {
      try {
        setContent({ ...defaults, ...JSON.parse(savedContent) });
      } catch (e) {
        console.error("Failed to parse hero content", e);
      }
    }

    const savedBanner = localStorage.getItem('announcementBanner');
    if (savedBanner) {
      try {
        setBanner(JSON.parse(savedBanner));
      } catch (e) {
        console.error("Failed to parse banner", e);
      }
    }

    // Media Cycle Logic: Image (20s) -> Video (10s) -> Loop
    const cycleMedia = () => {
      // Start with Image (default false)
      // Wait 10s (or 5s for demo?) User said "parfois". Let's do 15s Image.
      const imageDuration = 15000;
      const videoDuration = 10000;

      const interval = setInterval(() => {
        setShowVideo(prev => {
          if (!prev) {
            // Switching to Video, create timeout to switch back
            setTimeout(() => setShowVideo(false), videoDuration);
            return true;
          }
          return prev;
        });
      }, imageDuration + videoDuration); // Total cycle time

      return () => clearInterval(interval);
    };

    // Actually, simpler logic with timeouts
    let timer: NodeJS.Timeout;
    const runCycle = () => {
      timer = setTimeout(() => {
        setShowVideo(true); // Play video
        timer = setTimeout(() => {
          setShowVideo(false); // Back to image
          runCycle(); // Recursively call for loop
        }, 10000); // Video duration: 10s
      }, 15000); // Image duration: 15s
    };

    runCycle();

    return () => clearTimeout(timer);
  }, []);

  // Use defaults during server-side render to prevent hydration mismatch
  const displayContent = isMounted ? content : defaults;

  return (
    <section id="accueil" className="relative w-full h-screen overflow-hidden">

      {/* Announcement Banner */}
      {isMounted && banner.active && (
        <div className="absolute top-28 left-0 w-full z-50 bg-red-600/90 backdrop-blur-sm text-white py-2 overflow-hidden shadow-lg border-y border-white/20">
          <motion.div
            className="whitespace-nowrap font-bold text-sm uppercase tracking-widest"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {banner.text} &nbsp; • &nbsp; {banner.text} &nbsp; • &nbsp; {banner.text}
          </motion.div>
        </div>
      )}

      {/* Background Media Wrapper */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {/* Background Image (Always present to avoid flashes, z-index managed) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${displayContent.imageUrl}')`,
            opacity: showVideo ? 0 : 1
          }}
        />

        {/* YouTube Video Iframe */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none ${showVideo ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Using embed with appropriate params */}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/shFSNKY2nj0?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=shFSNKY2nj0&start=0`}
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full object-cover scale-150" // Scale up to remove black bars/controls
            style={{ pointerEvents: "none" }}
          ></iframe>
        </div>

        {/* Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Split Layout Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">

        {/* Left Side - Dark Glass Effect */}
        <div className="w-full md:w-1/2 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >


            <div className="relative">
              <h1 className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-lg">
                Le <br /> GABON <br />
                {/* The masked text needs to pop against the dark glass. 
                        Since the bg is dark, using the same image as mask might be low contrast 
                        unless the image is bright. The provided image is bright green. */}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `url('${displayContent.imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'brightness(1.5) contrast(1.2)' // Boost brightness to make it pop against dark glass
                  }}
                >
                  VERT
                </span>
              </h1>
            </div>

            <h2 className="text-xl md:text-2xl font-light text-slate-200 mt-8 max-w-lg">
              {displayContent.tagline}
            </h2>

            <p className="text-slate-300 text-xs md:text-sm max-w-md mt-4 leading-relaxed border-l-2 border-accent pl-4">
              {displayContent.description}
            </p>

            {/* Decorative "Animals" Placeholders - White Theme */}
            <div className="mt-12 flex items-center gap-8">
              <div className="flex flex-col items-center gap-2 group cursor-pointer text-white/80 hover:text-white">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" /></svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Elephant</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer text-white/80 hover:text-white">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" /></svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Panther</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer text-white/80 hover:text-white">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z" /></svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Mangrove</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Clear View of Forest */}
        <div className="hidden md:block w-1/2 h-full relative">
          {/* Space intentionally left clear to show the forest image from the main container bg */}
        </div>
      </div>

    </section>
  );
};
export default Hero;
