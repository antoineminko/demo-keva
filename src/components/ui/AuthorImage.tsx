import React from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const AuthorImage = ({ src, alt, ...rest }: Props) => {
  return (
    <div className="relative w-64 h-64 group sm:w-auto sm:h-auto">
      <img
        src={src}
        alt={alt}
        width={300}
        height={300}
        className={`rounded-lg object-cover ${rest.className || ''}`}
      />
      <div className="absolute inset-0 border-[3px] z-[-1] rounded border-accent translate-x-6 translate-y-6 group-hover:translate-x-4 group-hover:translate-y-4 duration-150 hidden sm:block"></div>
    </div>
  );
};

export default AuthorImage;
