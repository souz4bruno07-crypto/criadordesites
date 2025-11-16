
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white border border-transparent rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-yellow-500/50 group" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
      <div className="overflow-hidden">
        <img
          src={product.imagem}
          alt={product.nome}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-fancy text-black truncate">{product.nome}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-semibold text-black">
            R$ {product.preco.toFixed(2).replace('.', ',')}
          </p>
          {product.estoque ? (
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Disponível
            </span>
          ) : (
            <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
              Esgotado
            </span>
          )}
        </div>
        <button
          onClick={() => onViewDetails(product)}
          // FIX: Replaced the invalid `style` prop with a Tailwind `hover` class using an arbitrary value to set the background color.
          className="w-full mt-4 bg-black text-white py-2 rounded-md transition-colors duration-300 hover:bg-[#d4af37] font-medium"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
};

export default ProductCard;