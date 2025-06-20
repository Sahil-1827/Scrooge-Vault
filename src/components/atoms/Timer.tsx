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
  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-mono text-cyan-300" aria-live="polite">
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;