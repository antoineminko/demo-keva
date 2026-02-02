'use client';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-accent/20 flex flex-col gap-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Icon icon="fluent:app-store-24-filled" width="24" height="24" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Installer l'application</h3>
                <p className="text-xs text-slate-600 mt-0.5">Accédez plus rapidement et hors ligne.</p>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <Icon icon="lucide:x" width="18" height="18" />
            </button>
          </div>

          <button
            onClick={handleInstallClick}
            className="w-full py-2 bg-accent hover:bg-emerald-600 text-white font-bold rounded-lg text-sm transition-colors"
          >
            Installer maintenant
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;
