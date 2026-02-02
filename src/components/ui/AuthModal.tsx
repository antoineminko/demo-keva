import { motion, AnimatePresence } from 'framer-motion';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const navigate = useNavigate();

  // Prevent click propagation from modal content to overlay (which closes modal)
  const handleContentClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handleLogin = () => {
    // In a real app, perform validation/auth here
    onClose();
    navigate('/admin');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={handleContentClick}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-dark mb-6">Connexion</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:bg-[#0f291e] transition-colors mt-4"
                >
                  Se connecter
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-dark transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
