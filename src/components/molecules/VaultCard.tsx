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
    <div className="bg-[#1e1430] p-0 rounded-xl shadow-[0_0_30px_rgba(200,0,255,0.8)] max-w-md w-full overflow-hidden border-2 border-amber-400">
      {/* Top Bar (Header) */}
      <div className="flex items-center p-4 bg-[#140b20] border-b-2 border-amber-600">
        <h1 className="text-white text-xl font-bold flex-grow text-center font-playfair">
          Vault
        </h1>
      </div>

      <div className=" h-56 flex items-center justify-center overflow-hidden">
        <img
          src="/box.png"
          alt="Vault Chest"
          className="w-44 h-44 md:w-56 md:h-56 object-cover animate-float"
        />
      </div>

      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-purple-300 mb-2 text-left font-poppins">
          Vault Balance
        </h2>
        <div className="text-4xl sm:text-5xl text-amber-300 text-left mb-8 animate-pulse-light font-playfair"> {/* Adjusted font size for small screens */}
          {balance.toFixed(2)} ST
        </div>

        {/* Conditional rendering for "Claim in" / "Claim Available!" text and hiding/showing timer */}
        <h3 className="text-xl font-bold text-purple-300 mb-4 text-left font-poppins">
          {isClaimable ? "Claim Available!" : "Claim in"}
        </h3>
        <div className="flex justify-start mb-8">
          {isClaimable ? (
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-playfair animate-pulse-light"> {/* Adjusted font size for small screens */}
              Your reward awaits!
            </div>
          ) : (
            <Timer key={timerKey} initialSeconds={10} onTimerEnd={onTimerEnd} />
          )}
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