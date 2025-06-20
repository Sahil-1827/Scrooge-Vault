import React from 'react';
import LogItem from '../atoms/LogItem';

// Props for the ClaimLogs component
interface ClaimLog {
  claimId: string;
  amount: number;
  timestamp: string;
}

interface ClaimLogsProps {
  logs: ClaimLog[];
}

const ClaimLogs: React.FC<ClaimLogsProps> = ({ logs }) => {
  return (
    <div className="mt-6 max-w-md w-full">
      <h3 className="text-xl font-bold text-white mb-4">Recent Claims</h3>
      <div className="bg-gray-800 p-4 rounded-lg">
        {logs.map((log) => (
          <LogItem
            key={log.claimId}
            claimId={log.claimId}
            amount={log.amount}
            timestamp={log.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimLogs;