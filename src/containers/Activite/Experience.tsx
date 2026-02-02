'use client';

import { getSectionAnimation } from '@/styles/animations';
import { motion } from 'framer-motion';

const Experience = () => {
  const activities = [
    { id: 1, img: '/images/activite/exploration.webp', title: 'Exploration' },
    { id: 2, img: '/images/activite/drone.webp', title: 'Drone View' },
    { id: 3, img: '/images/activite/landscape.webp', title: 'Landscape' },
  ];

  return (
    <motion.section
      id="activite"
      className="w-full py-32 relative z-10"
      {...getSectionAnimation}
    >
      <div className="flex flex-col items-center justify-center w-full">

        {/* Gallery Cards - Centered */}
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center">
          {activities.map((item, index) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-3xl shadow-2xl cursor-pointer transition-all duration-500 hover:w-[400px] w-full md:w-[280px] h-[400px] flex-shrink-0 ${index === 1 ? 'md:-mt-12' : ''}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${item.img}')` }}
              ></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-white font-bold text-xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default Experience;
