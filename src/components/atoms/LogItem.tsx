import React from "react";

interface LogItemProps {
  claimId: string;
  amount: number;
  timestamp: string;
  index: number; // New prop for alternating colors
}

const LogItem: React.FC<LogItemProps> = ({ amount, timestamp, index }) => {
  // Helper function to format time relatively
  const formatRelativeTime = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();

    // Calculate difference in milliseconds
    const diffMs = now.getTime() - date.getTime();

    // Convert to seconds, minutes, hours, days
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

    // Fallback to specific date if too old (e.g., "Jun 20, 2025")
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const displayedTimestamp = formatRelativeTime(timestamp);

  // Determine background color based on index for alternating rows
  const bgColorClass = index % 2 === 0 ? "bg-[#2a1e3f]" : "bg-[#1f1632]";

  return (
    <div
      className={`flex justify-between text-sm py-3 px-2 rounded-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 ${bgColorClass} animate-fade-in border border-transparent hover:border-purple-600`}
    >
      {/* Displaying Amount and Formatted Timestamp */}
      <span className="text-amber-300 font-poppins text-sm sm:text-base text-shadow-glow-amber-sm">
        ${amount.toFixed(2)}{" "}
        {/* Changed from {amount.toFixed(2)} ST to ${amount.toFixed(2)} */}
      </span>
      <span className="text-gray-400 font-lora text-xs sm:text-sm">
        {displayedTimestamp}
      </span>
    </div>
  );
};

export default LogItem;
