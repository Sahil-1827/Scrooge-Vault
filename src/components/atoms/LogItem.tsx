import React from "react";

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
}

const LogItem: React.FC<LogItemProps> = ({ claimId, amount, timestamp }) => {
  return (
    <div className="flex justify-between text-sm text-[#CCCCCC] py-3 border-b border-[#3A3247] last:border-b-0"> {/* Adjusted text color for better contrast */}
      <span className="truncate">{claimId}</span>
      <span className="text-purple-300">{amount.toFixed(2)} ST</span> {/* Highlight amount */}
      <span className="text-[#999999]">{timestamp}</span> {/* Slightly subdued timestamp */}
    </div>
  );
};

export default LogItem;