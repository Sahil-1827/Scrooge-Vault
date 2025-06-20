import React, { useState, useEffect } from "react";

interface TimerProps {
  initialSeconds: number;
  onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimerEnd }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onTimerEnd();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimerEnd]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: remainingSeconds.toString().padStart(2, "0")
    };
  };

  const { minutes, seconds: formattedSeconds } = formatTime(seconds);

  // Determine if timer is stopped for applying glowing effect
  const isStopped = seconds <= 0;

  return (
    <div className="flex space-x-2">
      <div className={`flex flex-col items-center justify-center bg-[#2c1c3f] p-3 sm:p-4 rounded-lg min-w-[60px] h-[60px] sm:min-w-[70px] sm:h-[70px] text-white border-2 border-emerald-400 ${isStopped ? 'animate-glow-green' : ''}`}> {/* Adjusted padding and size for small screens */}
        <span className="text-3xl sm:text-4xl font-playfair text-pink-400">{minutes}</span> {/* Adjusted font size for small screens */}
        <span className="text-xs text-emerald-200 font-poppins">Minutes</span>
      </div>
      <div className={`flex flex-col items-center justify-center bg-[#2c1c3f] p-3 sm:p-4 rounded-lg min-w-[60px] h-[60px] sm:min-w-[70px] sm:h-[70px] text-white border-2 border-emerald-400 ${isStopped ? 'animate-glow-green' : ''}`}> {/* Adjusted padding and size for small screens */}
        <span className="text-3xl sm:text-4xl font-playfair text-pink-400">{formattedSeconds}</span> {/* Adjusted font size for small screens */}
        <span className="text-xs text-emerald-200 font-poppins">Seconds</span>
      </div>
    </div>
  );
};

export default Timer;