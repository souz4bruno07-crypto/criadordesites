
import React from 'react';
import type { Product } from '../types';
import { CloseIcon, WhatsAppIcon } from './icons';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre a joia "${product.nome}". Ainda está disponível?`);
    const phoneNumber = "555192355053"; // Replace with your WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 relative">
          <img src={product.imagem} alt={product.nome} className="w-full h-64 md:h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors md:hidden"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-fancy text-black mb-2">{product.nome}</h2>
            <button
              onClick={onClose}
              className="hidden md:block text-gray-500 hover:text-black transition-colors"
            >
              <CloseIcon className="w-8 h-8" />
            </button>
          </div>
          <p className="text-2xl font-semibold mb-4" style={{ color: '#d4af37' }}>
            R$ {product.preco.toFixed(2).replace('.', ',')}
          </p>
          <div className="mb-4">
            {product.estoque ? (
              <span className="text-sm font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Em Estoque
              </span>
            ) : (
              <span className="text-sm font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                Esgotado
              </span>
            )}
          </div>
          <div className="space-y-4 text-gray-700 flex-grow">
            <div>
              <h4 className="font-bold text-black">Descrição</h4>
              <p>{product.descricao}</p>
            </div>
            <div>
              <h4 className="font-bold text-black">Materiais</h4>
              <p>{product.materiais}</p>
            </div>
            <div>
              <h4 className="font-bold text-black">Tamanho</h4>
              <p>{product.tamanho}</p>
            </div>
          </div>
          <button
            onClick={handleWhatsAppClick}
            disabled={!product.estoque}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Comprar pelo WhatsApp
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;
