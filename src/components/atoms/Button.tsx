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
      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300
        ${
          disabled || loading
            ? "bg-[#2c1c3f] cursor-not-allowed opacity-50"
            : "bg-gradient-to-br from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 transform hover:scale-105 active:scale-95 active:shadow-inset-lg hover:shadow-lg hover:shadow-purple-500/50 active:shadow-purple-700/70 hover:cursor-pointer"
        } text-white font-poppins focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75
        ${loading ? "flex items-center justify-center" : ""}
        ${!disabled && !loading ? "animate-pulse-once" : ""}
        `}
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
