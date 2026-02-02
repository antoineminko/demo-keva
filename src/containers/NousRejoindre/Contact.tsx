'use client';

import { contactSection } from '@/lib/content/contact';
import { Button } from '@/components';
import { getSectionAnimation } from '@/styles/animations';
import { motion } from 'framer-motion';

const Contact = () => {
  const { title, link } = contactSection;

  const cards = [
    { id: 1, img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80', text: 'Conservation' },
    { id: 2, img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=400&q=80', text: 'Biodiversité' },
    { id: 3, img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80', text: 'Aventure' },
  ];

  return (
    <motion.section
      id="nous-rejoindre"
      className="w-full relative mt-32 mb-16"
      {...getSectionAnimation}
    >
      {/* Cards Row - Floating above the pill */}
      <div className="absolute -top-24 left-0 w-full flex flex-col md:flex-row justify-center items-center gap-6 z-20 pointer-events-none">
        {cards.map((card) => (
          <div key={card.id} className="relative group w-64 h-64 rounded-3xl overflow-hidden shadow-xl pointer-events-auto">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('${card.img}')` }}
            ></div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>

            {/* Plus Button */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-accent text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transform translate-y-20 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-2xl font-bold mb-1">+</span>
            </div>
          </div>
        ))}
      </div>

      {/* Green Pill Container */}
      <div className="bg-[#0f291e] rounded-[3rem] pt-48 pb-16 px-6 md:px-12 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative circles/blobs if needed */}

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Text below cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {cards.map((card) => (
              <div key={card.id} className="text-center">
                <h3 className="text-white font-bold text-lg mb-2">{card.text}</h3>
                <p className="text-white/60 text-sm">Découvrir nos initiatives et actions sur le terrain.</p>
              </div>
            ))}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>

          <p className="text-white/80 mb-10 max-w-lg mx-auto leading-relaxed">
            Rejoignez-nous dans cette aventure unique. Préservons ensemble la beauté naturelle du Gabon pour les générations futures.
          </p>

          <Button type="link" size="lg" to={link} center className="bg-white text-[#0f291e] hover:bg-accent hover:text-white">
            Nous Contacter
          </Button>
        </div>
      </div>

    </motion.section>
  );
};

export default Contact;
