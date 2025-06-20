import React from 'react';

// Props for the LogItem component
interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
}

const LogItem: React.FC<LogItemProps> = ({ claimId, amount, timestamp }) => {
  return (
    <div className="flex justify-between text-sm text-gray-300 py-2 border-b border-gray-700">
      <span className="truncate">{claimId}</span>
      <span>{amount.toFixed(2)} ST</span>
      <span>{timestamp}</span>
    </div>
  );
};

export default LogItem;