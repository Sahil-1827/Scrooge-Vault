import React, { useState, useEffect } from 'react';
import VaultCard from '../molecules/VaultCard';
import ClaimLogs from '../molecules/ClaimLogs';
import { toast, ToastContainer } from 'react-toastify';

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
  const [balance, setBalance] = useState(1234567.00);
  const [isClaimable, setIsClaimable] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [claimCycle, setClaimCycle] = useState(0);

  // Initialize logs state using a function that reads from localStorage once
  const [logs, setLogs] = useState<ClaimLog[]>(() => {
    const storedLogs = localStorage.getItem('claimLogs');
    if (storedLogs) {
      try {
        const parsedLogs = JSON.parse(storedLogs);
        // Only return parsed logs if they actually contain data
        // Otherwise, fall back to dummy data
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
    setTimerActive(true);
  }, []); // Empty dependency array means this runs once on mount

  // Effect to save logs to localStorage whenever the logs state changes
  useEffect(() => {
    localStorage.setItem('claimLogs', JSON.stringify(logs));
  }, [logs]); // Runs whenever 'logs' state changes

  // Handler for timer end
  const handleTimerEnd = () => {
    setIsClaimable(true);
    setTimerActive(false);
  };

  // Handler for claim button click
  const handleClaim = () => {
    if (isClaimable) {
      const claimAmount = 50.25;
      const newBalance = balance + claimAmount;
      setBalance(newBalance);

      const newLog: ClaimLog = {
        claimId: `CLM${Date.now()}`,
        amount: claimAmount,
        timestamp: new Date().toLocaleString('en-US', { hour12: true }),
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

      setIsClaimable(false);
      setTimerActive(true);
      setClaimCycle((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
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
  );
};

export default VaultClaimModule;