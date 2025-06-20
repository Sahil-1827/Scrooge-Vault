import React from "react";

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
}

const LogItem: React.FC<LogItemProps> = ({ claimId, amount, timestamp }) => {
  return (
    <div className="flex justify-between text-sm text-[#CCCCCC] py-3 border-b border-gray-700 last:border-b-0"> {/* Changed border color */}
      <span className="truncate font-lora">{claimId}</span> {/* Applied Lora */}
      <span className="text-amber-300 font-poppins">{amount.toFixed(2)} ST</span> {/* Applied Poppins, changed to amber */}
      <span className="text-gray-400 font-lora text-xs">{timestamp}</span> {/* Applied Lora, slightly smaller, changed text color */}
    </div>
  );
};

export default LogItem; 