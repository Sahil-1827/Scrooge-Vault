import React from 'react';

// Props for the reusable Button component
interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 
        ${disabled 
          ? 'bg-gray-600 cursor-not-allowed opacity-50' 
          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 animate-glow'
        } text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;