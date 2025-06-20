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
      <h3 className="text-xl font-bold text-white mb-4 text-left px-4">Claim Logs</h3> {/* Changed text to Claim Logs and aligned left */}
      <div className="bg-[#292231] p-4 rounded-xl overflow-y-auto max-h-[300px]"> {/* Darker background, added overflow for scroll if many logs */}
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