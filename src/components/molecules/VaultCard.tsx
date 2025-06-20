import React from 'react';
import Timer from '../atoms/Timer';
import Button from '../atoms/Button';

// Props for the VaultCard component
interface VaultCardProps {
  balance: number;
  isClaimable: boolean;
  onClaim: () => void;
  onTimerEnd: () => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ balance, isClaimable, onClaim, onTimerEnd }) => {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-indigo-900 p-6 rounded-xl shadow-lg shadow-cyan-500/50 max-w-md w-full">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Vault Balance</h2>
      <div className="text-4xl font-mono text-yellow-400 text-center mb-4">
        {balance.toFixed(2)} ST
      </div>
      <div className="flex justify-center mb-6">
        <Timer initialSeconds={60} onTimerEnd={onTimerEnd} />
      </div>
      <Button disabled={!isClaimable} onClick={onClaim}>
        Claim Now
      </Button>
    </div>
  );
};

export default VaultCard;