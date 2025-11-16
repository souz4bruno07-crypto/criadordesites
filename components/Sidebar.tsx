
import React from 'react';
import { CloseIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, categories, selectedCategory, onSelectCategory }) => {
  const handleCategoryClick = (category: string | null) => {
    onSelectCategory(category);
    onClose();
  };
    
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 h-full bg-white text-black w-64 p-6 transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] lg:bg-transparent lg:w-56 lg:p-0 lg:pr-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#fdf7f9' }}
      >
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h2 className="text-xl font-bold font-fancy">Categorias</h2>
          <button onClick={onClose} className="text-black">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-3">
              <button
                onClick={() => handleCategoryClick(null)}
                // FIX: Removed the invalid `style` prop and consolidated styling into Tailwind classes.
                // This correctly applies the custom background color, font weight, text color, and hover opacity.
                className={`w-full text-left px-3 py-2 rounded-md text-lg transition-colors duration-200 ${
                  selectedCategory === null
                    ? 'bg-[#f7c5d8] font-bold text-black'
                    : 'hover:bg-pink-100 hover:bg-opacity-50'
                }`}
              >
                Todos
              </button>
            </li>
            {categories.map((category) => (
              <li key={category} className="mb-3">
                <button
                  onClick={() => handleCategoryClick(category)}
                  // FIX: Removed the invalid `style` prop and consolidated styling into Tailwind classes.
                  // This correctly applies the custom background color, font weight, text color, and hover opacity.
                  className={`w-full text-left px-3 py-2 rounded-md text-lg transition-colors duration-200 capitalize ${
                    selectedCategory === category
                      ? 'bg-[#f7c5d8] font-bold text-black'
                      : 'hover:bg-pink-100 hover:bg-opacity-50'
                  }`}
                >
                  {category.replace('kits', 'Kits / Combos')}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;