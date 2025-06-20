import React from 'react';

// Props for the reusable Button component
interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean; // Add an optional loading prop
}

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading} // Disable the button when loading
      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300
        ${disabled || loading
          ? 'bg-[#3A3247] cursor-not-allowed opacity-50'
          : 'bg-[#5B3E93] hover:bg-[#6a4aa3]'
        } text-white focus:outline-none focus:ring-2 focus:ring-[#5B3E93] focus:ring-opacity-50
        ${loading ? 'flex items-center justify-center' : ''}`} // Center loading indicator
      aria-disabled={disabled || loading}
    >
      {loading ? (
        <img src="/vault-opening.gif" alt="Loading..." className="h-12 w-12" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;