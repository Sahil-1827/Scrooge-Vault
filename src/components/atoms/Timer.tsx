import React, { useState, useEffect } from 'react';

// Props for the Timer component
interface TimerProps {
  initialSeconds: number;
  onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimerEnd }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Countdown logic
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

  // Format time as MM:SS
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: remainingSeconds.toString().padStart(2, '0'),
    };
  };

  const { minutes, seconds: formattedSeconds } = formatTime(seconds);

  return (
    <div className="flex space-x-2">
      <div className="flex flex-col items-center justify-center bg-[#3A3247] p-4 rounded-lg min-w-[70px] h-[70px] text-white">
        <span className="text-4xl font-mono">{minutes}</span>
        <span className="text-xs text-[#AAAAAA]">Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-[#3A3247] p-4 rounded-lg min-w-[70px] h-[70px] text-white">
        <span className="text-4xl font-mono">{formattedSeconds}</span>
        <span className="text-xs text-[#AAAAAA]">Seconds</span>
      </div>
    </div>
  );
};

export default Timer;