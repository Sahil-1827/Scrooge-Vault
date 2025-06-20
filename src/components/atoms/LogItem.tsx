import React from "react";

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
  index: number;
}

const LogItem: React.FC<LogItemProps> = ({ amount, timestamp, index }) => {
  const formatRelativeTime = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 45) return "just now";
    if (diffMinutes === 1) return "1 min ago";
    if (diffMinutes < 60) return `${diffMinutes} mins ago`;
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const displayedTimestamp = formatRelativeTime(timestamp);

  const bgColorClass = index % 2 === 0 ? "bg-[#2a1e3f]" : "bg-[#1f1632]";

  return (
    <div
      className={`flex justify-between text-sm py-3 px-2 rounded-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 ${bgColorClass} animate-fade-in border border-transparent hover:border-purple-600`}
    >
      <span className="text-amber-300 font-poppins text-sm sm:text-base text-shadow-glow-amber-sm">
        ${amount.toFixed(2)}{" "}
      </span>
      <span className="text-gray-400 font-lora text-xs sm:text-sm">
        {displayedTimestamp}
      </span>
    </div>
  );
};

export default LogItem;
