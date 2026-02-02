'use client';
import { navbarSection } from '@/lib/content/navbar';
import { author } from '@/lib/content/portfolio';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { getBreakpointsWidth } from '@/lib/utils/helper';
import { Button, DarkModeButton, Link as CLink, NavButton } from '@/components';
import { Icon } from '@iconify/react';
import { fadeIn, slideIn } from '@/styles/animations';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthModal from '@/components/ui/AuthModal';

type NavItemsProps = {
  href?: string;
  children: React.ReactNode;
  index: number;
  delay: number;
  onClick?: (event: React.MouseEvent) => void;
  textColorClass?: string;
};

const NavItem = ({ href, children, onClick, index, delay, textColorClass }: NavItemsProps) => {
  return (
    <motion.li
      className="group"
      variants={slideIn({ delay: delay + index / 10, direction: 'down' })}
      initial="hidden"
      animate="show"
    >
      <CLink
        href={href || `/#${children}`}
        className={`block p-2 duration-500 hover:text-accent font-medium ${textColorClass}`}
        onClick={onClick}
        withPadding
      >
        {children}
      </CLink>
    </motion.li>
  );
};

const Navbar = () => {
  const { cta, navLinks } = navbarSection;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const windowWidth = useWindowWidth();
  const md = getBreakpointsWidth('md');
  const ANIMATION_DELAY = windowWidth <= md ? 0 : 0.8;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define text color based on scroll state
  const textColorClass = isScrolled ? 'text-[#0f291e]' : 'text-white';
  const logoSrc = "/Logo KEVA_Horiz.png";

  return (
    <>
      <motion.header
        variants={fadeIn(0.5)}
        initial="hidden"
        animate="show"
        id="navbar"
        className={`fixed inset-x-0 top-0 right-0 z-50 flex items-end justify-between px-8 py-4 duration-500 md:px-6 xl:px-12 backdrop-blur-lg transition-colors ${isScrolled ? 'bg-white/95 shadow-md' : 'bg-transparent'
          }`}
      >
        <div className="relative group top-1">
          <Link to="/#hero" className="block">
            <img
              src={logoSrc}
              alt={author.name}
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className={`md:invisible ${textColorClass}`}>
          <NavButton
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            navbarCollapsed={isMenuOpen}
            className={textColorClass}
          />
        </div>

        {(isMenuOpen || windowWidth > md) && (
          <nav className="capitalize absolute text-sm duration-200 md:bg-transparent z-50 w-[90%] left-1/2 -translate-x-1/2 top-full h-max rounded-xl shadow-xl p-6 bg-white md:blocks md:static md:w-auto md:left-auto md:transform-none md:top-auto md:rounded-none md:shadow-none md:p-0 md:h-auto">
            <ul className="flex flex-col items-stretch gap-3 list-style-none lg:gap-5 xl:gap-6 md:flex-row md:items-center">
              {navLinks.map(({ name, url }, i) => (
                <NavItem
                  key={i}
                  href={url}
                  index={i}
                  delay={ANIMATION_DELAY}
                  onClick={() => setIsMenuOpen(false)}
                  // On mobile, menu has white bg, so text should be dark/accent explicitly
                  textColorClass={windowWidth <= md ? 'text-[#0f291e]' : textColorClass}
                >
                  {name}
                </NavItem>
              ))}

              <div className="flex items-center justify-between gap-5 xl:gap-6">
                {cta && (
                  <div
                    className="cursor-pointer"
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                    title="Double click to login"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${isScrolled || windowWidth <= md
                      ? 'border-[#0f291e] text-[#0f291e] hover:bg-[#0f291e] hover:text-white'
                      : 'border-white/30 text-white hover:bg-white/20'
                      }`}>
                      <Icon icon="lucide:user" width="20" height="20" />
                    </div>
                  </div>
                )}

                <div className={windowWidth <= md ? 'text-[#0f291e]' : textColorClass}>
                  <DarkModeButton
                    onClick={() => setIsMenuOpen(false)}
                    variants={slideIn({
                      delay: ANIMATION_DELAY + (navLinks.length + 1) / 10,
                      direction: 'down',
                    })}
                    initial="hidden"
                    animate="show"
                  />
                </div>
              </div>
            </ul>
          </nav>
        )}
      </motion.header>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
