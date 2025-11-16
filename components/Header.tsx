import React from 'react';
import { MenuIcon } from './icons';
import { MirraStoreLogo } from './Logo';

interface HeaderProps {
  onMenuClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 bg-white shadow-md z-20 h-[72px] flex items-center px-4 md:px-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden text-black">
            <MenuIcon className="w-6 h-6" />
          </button>
          <MirraStoreLogo className="h-10" color="gold" />
        </div>
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-pink-300"
            style={{ borderColor: '#f7c5d8' }}
          />
           <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
    </header>
  );
};

export default Header;