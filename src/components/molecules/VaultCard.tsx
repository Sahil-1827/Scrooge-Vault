import React, { useState } from 'react';
import Timer from '../atoms/Timer';
import Button from '../atoms/Button';

// Props for the VaultCard component
interface VaultCardProps {
  balance: number;
  isClaimable: boolean;
  onClaim: () => void;
  onTimerEnd: () => void;
  timerKey: number; // New prop for key to reset timer
}

const VaultCard: React.FC<VaultCardProps> = ({ balance, isClaimable, onClaim, onTimerEnd, timerKey }) => {
  const [isClaiming, setIsClaiming] = useState(false); // State to track loading

  const handleClaimClick = async () => {
    setIsClaiming(true);
    // Simulate an async operation for the claim
    await new Promise(resolve => setTimeout(resolve, 2000)); // Added a delay to show GIF
    onClaim(); // Call the original onClaim logic
    setIsClaiming(false);
  };

  return (
    <div className="bg-[#292231] p-0 rounded-xl shadow-lg shadow-black/30 max-w-md w-full overflow-hidden">
      {/* Top Bar (Header) */}
      <div className="flex items-center p-4 bg-[#211A2C] border-b border-[#3A3247]">
        <button className="text-white text-2xl mr-4" aria-label="Go back">
          &larr; {/* Left arrow character */}
        </button>
        <h1 className="text-white text-xl font-bold flex-grow text-center pr-10">Vault</h1>
      </div>

      {/* Vault Chest Image Section */}
      <div className="bg-gray-800 h-56 flex items-center justify-center overflow-hidden">
        <img
          src="/vault-chest.png" // You need to place your image file here, e.g., in the public folder
          alt="Vault Chest"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-[#AAAAAA] mb-2 text-left">Vault Balance</h2>
        <div className="text-4xl font-mono text-white text-left mb-8">
          {balance.toFixed(2)} ST
        </div>

        <h3 className="text-xl font-bold text-[#AAAAAA] mb-4 text-left">Claim in</h3>
        <div className="flex justify-start mb-8">
          <Timer key={timerKey} initialSeconds={60} onTimerEnd={onTimerEnd} /> {/* Added key prop */}
        </div>
        <Button disabled={!isClaimable || isClaiming} onClick={handleClaimClick} loading={isClaiming}>
          Claim
        </Button>
      </div>
    </div>
  );
};

export default VaultCard;