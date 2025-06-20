import React, { useState, useEffect } from 'react';
import VaultCard from '../molecules/VaultCard';
import ClaimLogs from '../molecules/ClaimLogs';
import { toast, ToastContainer } from 'react-toastify';
import ReactConfetti from 'react-confetti'; // Import ReactConfetti

// Interface for claim log
interface ClaimLog {
  claimId: string;
  amount: number;
  timestamp: string;
}

// Initial dummy data for logs - define it outside the component
const initialDummyLogs: ClaimLog[] = [
  { claimId: 'DUMMY_1', amount: 100.00, timestamp: '2024-01-01 12:00' },
  { claimId: 'DUMMY_2', amount: 200.00, timestamp: '2024-01-01 11:00' },
  { claimId: 'DUMMY_3', amount: 300.00, timestamp: '2024-01-01 10:00' },
  { claimId: 'DUMMY_4', amount: 400.00, timestamp: '2024-01-01 09:00' },
  { claimId: 'DUMMY_5', amount: 500.00, timestamp: '2024-01-01 08:00' },
];

// Main VaultClaimModule component
const VaultClaimModule: React.FC = () => {
  const [balance, setBalance] = useState(1234567.00); // Updated initial balance to match image
  const [isClaimable, setIsClaimable] = useState(false);
  const [timerActive, setTimerActive] = useState(true); // State to control initial timer
  const [claimCycle, setClaimCycle] = useState(0); // State to force Timer re-render

  const [showConfetti, setShowConfetti] = useState(false); // New state for confetti visibility
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight }); // State to get window dimensions for confetti

  // Initialize logs state using a function that reads from localStorage once
  const [logs, setLogs] = useState<ClaimLog[]>(() => {
    const storedLogs = localStorage.getItem('claimLogs');
    if (storedLogs) {
      try {
        const parsedLogs = JSON.parse(storedLogs);
        // Only return parsed logs if they actually contain data
        // Otherwise, fall back to initialDummyLogs
        return parsedLogs.length > 0 ? parsedLogs : initialDummyLogs;
      } catch (e) {
        console.error("Failed to parse stored logs from localStorage, falling back to dummy data:", e);
        return initialDummyLogs; // Fallback to dummy data if stored data is corrupt
      }
    }
    return initialDummyLogs; // If no stored data, use the dummy data
  });

  // Effect to manage timer activation (e.g., on initial component mount)
  useEffect(() => {
    setTimerActive(true); // Ensure timer starts on mount
  }, []);

  // Effect to save logs to localStorage whenever the logs state changes
  useEffect(() => {
    localStorage.setItem('claimLogs', JSON.stringify(logs));
  }, [logs]);

  // Effect to update window dimensions on resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handler for timer end
  const handleTimerEnd = () => {
    setIsClaimable(true);
    setTimerActive(false); // Stop the timer after the first cycle
  };

  // Handler for claim button click
  const handleClaim = () => {
    if (isClaimable) {
      // Generate a random claim amount between 10 and 100 with 2 decimal places
      const claimAmount = Number((Math.random() * (100 - 10) + 10).toFixed(2));
      const newBalance = balance + claimAmount;
      setBalance(newBalance);

      const newLog: ClaimLog = {
        claimId: `CLM${Date.now()}`, // Unique claim ID using timestamp
        amount: claimAmount,
        timestamp: new Date().toLocaleString('en-US', { hour12: true }), // Current time
      };

      // Add new log to the beginning of the array
      setLogs((prevLogs) => [newLog, ...prevLogs]);

      toast.success(`Claim successful! +${claimAmount} ST`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });

      setShowConfetti(true); // Show confetti on successful claim
      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Confetti lasts for 5 seconds

      // Reset for next claim cycle:
      setIsClaimable(false); // Make button unclaimable immediately
      setTimerActive(true); // Restart the timer
      setClaimCycle((prev) => prev + 1); // Increment key to force Timer component re-mount
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-2 sm:px-4 bg-[#211A2C] w-full">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={1000} // Customize number of confetti pieces
          recycle={false} // Confetti falls once and disappears
          tweenDuration={20000} // How long the confetti animation lasts
        />
      )}
      <div className="flex flex-col items-center space-y-6 w-full max-w-md"> {/* Added max-w-md here for outer container */}
        <VaultCard
          balance={balance}
          isClaimable={isClaimable}
          onClaim={handleClaim}
          onTimerEnd={handleTimerEnd}
          timerKey={claimCycle}
        />
        <ClaimLogs logs={logs} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default VaultClaimModule;