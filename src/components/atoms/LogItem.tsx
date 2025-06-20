import React from "react";

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
}

const LogItem: React.FC<LogItemProps> = ({ claimId, amount, timestamp }) => {
  return (
    <div className="flex justify-between text-sm text-[#AAAAAA] py-3 border-b border-[#3A3247] last:border-b-0">
      <span className="truncate">{claimId}</span>
      <span>{amount.toFixed(2)} ST</span>
      <span>{timestamp}</span>
    </div>
  );
};

export default LogItem;
