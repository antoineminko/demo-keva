import { NavbarSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

export const navbarSection: NavbarSectionType = {
  navLinks: [
    { name: 'Accueil', url: '/#accueil' },
    { name: 'A propos', url: '/#a-propos' },

    { name: 'Activité', url: '/#activite' },
    { name: 'Projets', url: '/#projects' },
    { name: 'Nous rejoindre', url: '/#nous-rejoindre' },
  ],
  cta: {
    title: 'resume',
    url: `/${resumeFileName}`,
  },
};
