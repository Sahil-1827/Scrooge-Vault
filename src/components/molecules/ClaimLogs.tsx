import React from "react";
import LogItem from "../atoms/LogItem";

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
      <h3 className="text-xl font-bold text-white mb-4 text-left px-4 font-playfair">
        Claim Logs
      </h3>
      <div className="bg-[#1e1430] p-4 rounded-xl overflow-y-auto max-h-[300px] space-y-2"> {/* Added space-y-2 for gap between log items */}
        {logs.map((log, index) => ( // Pass index to LogItem
          <LogItem
            claimId={log.claimId}
            key={log.claimId}
            amount={log.amount}
            timestamp={log.timestamp}
            index={index} // New prop: index for alternating colors
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimLogs;