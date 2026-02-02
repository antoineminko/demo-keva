import { useId } from 'react';

type Props = {
  position?: 'top' | 'bottom';
  className?: string;
  gradientColors?: [string, string];
};

const WaveSeparator = ({ position = 'bottom', className = '', gradientColors }: Props) => {
  const isTop = position === 'top';
  const gradId = useId().replace(/:/g, ''); // React 18 useId contains colons which are invalid in CSS IDs sometimes, keeping it clean

  return (
    <div className={`w-full overflow-hidden leading-[0] transform ${isTop ? 'rotate-180' : ''} ${className}`}>
      <svg
        className="relative block w-[calc(110%+1.3px)] h-[60px] sm:h-[120px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill={gradientColors ? `url(#${gradId})` : "currentColor"}
        stroke="none"
      >
        {gradientColors && (
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          </defs>
        )}
        <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default WaveSeparator;
