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
      <h3 className="text-xl font-bold text-white mb-4 text-left px-4 font-playfair text-shadow-glow-light"> {/* Added text-shadow-glow-light */}
        Claim Logs
      </h3>
      <div className="bg-[#1e1430] p-4 rounded-xl overflow-y-auto max-h-[300px] space-y-2 border-2 border-purple-800 shadow-[0_0_15px_rgba(150,0,255,0.4)]"> {/* Added subtle border and shadow to log container */}
        {logs.map((log, index) => (
          <LogItem
            claimId={log.claimId}
            key={log.claimId}
            amount={log.amount}
            timestamp={log.timestamp}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimLogs;