import React from "react";

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
}

const LogItem: React.FC<LogItemProps> = ({ claimId, amount, timestamp }) => {
  return (
    <div className="flex justify-between text-sm text-[#CCCCCC] py-3 border-b border-[#3A3247] last:border-b-0">
      <span className="truncate font-lora">{claimId}</span> {/* Applied Lora */}
      <span className="text-purple-300 font-poppins">{amount.toFixed(2)} ST</span> {/* Applied Poppins */}
      <span className="text-[#999999] font-lora text-xs">{timestamp}</span> {/* Applied Lora, slightly smaller */}
    </div>
  );
};

export default LogItem;