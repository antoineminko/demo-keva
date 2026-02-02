interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
  withPadding?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

import { Link as RouterLink } from 'react-router-dom';

const Link = ({
  href = '#',
  className = '',
  children,
  onClick = () => { },
  withPadding = false,
  ...rest
}: Props) => {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (withPadding) {
    if (isInternal) {
      return (
        <RouterLink
          to={href}
          className={`group ${className}`}
          onClick={onClick}
          {...(rest as any)}
        >
          <span className="relative w-fit">
            {children}
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full group-focus:w-full bg-accent duration-300 ease-in-scroll"></span>
          </span>
        </RouterLink>
      );
    }
    return (
      <a
        href={href}
        className={`group ${className}`}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        <span className="relative w-fit">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full group-focus:w-full bg-accent duration-300 ease-in-scroll"></span>
        </span>
      </a>
    );
  }

  if (isInternal) {
    return (
      <RouterLink
        to={href}
        className={`relative ${className} group`}
        onClick={onClick}
        {...(rest as any)}
      >
        {children}
        <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full group-focus:outline-none group-focus:w-full bg-accent duration-300 ease-in-scroll"></span>
      </RouterLink>
    );
  }

  return (
    <a
      href={href}
      className={`relative ${className} group`}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full group-focus:outline-none group-focus:w-full bg-accent duration-300 ease-in-scroll"></span>
    </a>
  );
};

export default Link;
