import React from "react";

// interface ClaimLog {
//   claimId: string;
//   amount: number;
//   timestamp: string;
// }

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
}

const LogItem: React.FC<LogItemProps> = ({ claimId, amount, timestamp }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-[#CCCCCC] py-3 border-b border-gray-700 last:border-b-0 space-y-1 sm:space-y-0">
      {/* Claim ID: Stacks on top, allows breaking long words */}
      <span className="font-lora text-xs sm:text-sm break-all sm:w-1/2 md:w-auto">{claimId}</span>

      {/* Amount and Timestamp: Grouped together, justified responsively */}
      <div className="flex justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
        <span className="text-amber-300 font-poppins text-sm sm:text-base">{amount.toFixed(2)} ST</span>
        <span className="text-gray-400 font-lora text-xs sm:text-sm">{timestamp}</span>
      </div>
    </div>
  );
};

export default LogItem;