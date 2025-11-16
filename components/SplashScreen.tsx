import React from 'react';
import { MirraStoreLogo } from './Logo';

interface SplashScreenProps {
  isFadingOut: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isFadingOut }) => {
  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <MirraStoreLogo className="w-64 md:w-96" color="gold" />
    </div>
  );
};

export default SplashScreen;