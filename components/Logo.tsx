import React from 'react';

interface LogoProps {
  size: 'small' | 'large';
  // The className will be passed from the parent to control color and other styles
  className?: string;
}

export const MirraStoreLogo: React.FC<LogoProps> = ({ size, className }) => {
  const mirraSize = size === 'large' ? 'text-7xl md:text-8xl' : 'text-4xl';
  const storeSize = size === 'large' ? 'text-lg md:text-xl tracking-[0.4em]' : 'text-sm tracking-[0.3em]';
  const storeMargin = size === 'large' ? '-mt-3 md:-mt-4' : '-mt-1.5';

  return (
    // font-fancy is defined in index.html for Playfair Display
    <div className={`flex flex-col items-center justify-center font-fancy ${className}`}>
      <span className={`font-bold tracking-wider ${mirraSize}`}>
        MIRRA
      </span>
      {/* The default body font is Montserrat, so no extra class is needed here */}
      <span className={`uppercase font-light ${storeSize} ${storeMargin}`}>
        STORE
      </span>
    </div>
  );
};
