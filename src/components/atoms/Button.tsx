import React from "react";

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  onClick,
  children,
  loading
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 hover:cursor-pointer
        ${
          disabled || loading
            ? "bg-[#3A3247] cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 active:scale-100"
        } text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75
        ${loading ? "flex items-center justify-center" : ""}
        ${!disabled && !loading ? "animate-pulse-once" : ""}
        `} // Added gradient, hover effects, and pulse animation
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
