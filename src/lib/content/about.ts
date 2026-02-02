import { AboutSectionType } from '@/lib/types/sections';

export const aboutSection: AboutSectionType = {
  title: 'about me',
  // Paragraphs need to be changed from `/containers/About.tsx`
  // Because it wasn't possible to insert anchor tags like this
  list: {
    title: 'Here are a few technologies I’ve been working with recently:',
    items: [
      {
        title: 'Modern Tech',
        description: 'Building with Next.js, React and modern frameworks.',
        icon: 'mdi:react',
      },
      {
        title: 'Backend Ready',
        description: 'Experience with Express, Prisma and Database management.',
        icon: 'mdi:server',
      },
      {
        title: 'Creative Design',
        description: 'Passionate about UI/UX and smooth animations.',
        icon: 'mdi:palette',
      },
      {
        title: 'Mobile Apps',
        description: 'Exploring React Native for cross-platform apps.',
        icon: 'mdi:cellphone',
      },
    ],
  },
  img: '/vatsal-singh.png',
};
