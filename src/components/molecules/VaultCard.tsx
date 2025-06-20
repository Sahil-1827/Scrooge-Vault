import React, { useState } from "react";
import Timer from "../atoms/Timer";
import Button from "../atoms/Button";

interface VaultCardProps {
  balance: number;
  isClaimable: boolean;
  onClaim: () => void;
  onTimerEnd: () => void;
  timerKey: number;
}

const VaultCard: React.FC<VaultCardProps> = ({
  balance,
  isClaimable,
  onClaim,
  onTimerEnd,
  timerKey
}) => {
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimClick = async () => {
    setIsClaiming(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onClaim();
    setIsClaiming(false);
  };

  return (
    <div className="bg-[#292231] p-0 rounded-xl shadow-2xl shadow-purple-900/50 max-w-md w-full overflow-hidden border border-purple-800"> {/* Enhanced shadow and border */}
      {/* Top Bar (Header) */}
      <div className="flex items-center p-4 bg-[#211A2C] border-b border-[#3A3247]">
        <h1 className="text-white text-xl font-bold flex-grow text-center">
          Vault
        </h1>
      </div>

      <div className=" h-56 flex items-center justify-center overflow-hidden">
        <img
          src="/box.png" // You need to place your image file here, e.g., in the public folder
          alt="Vault Chest"
          className="w-44 h-44 md:w-56 md:h-56 object-cover animate-float" // Added float animation
        />
      </div>

      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-purple-300 mb-2 text-left"> {/* Accent color for text */}
          Vault Balance
        </h2>
        <div className="text-5xl font-mono text-yellow-300 text-left mb-8 animate-pulse-light"> {/* Vibrant balance, subtle pulse */}
          {balance.toFixed(2)} ST
        </div>

        <h3 className="text-xl font-bold text-purple-300 mb-4 text-left"> {/* Accent color for text */}
          Claim in
        </h3>
        <div className="flex justify-start mb-8">
          <Timer key={timerKey} initialSeconds={60} onTimerEnd={onTimerEnd} />{" "}
        </div>
        <Button
          disabled={!isClaimable || isClaiming}
          onClick={handleClaimClick}
          loading={isClaiming}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};

export default VaultCard;