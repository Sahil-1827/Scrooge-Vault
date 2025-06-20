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

// Initial dummy data for logs
const initialDummyLogs: ClaimLog[] = [
  { claimId: 'CLM1750397959999', amount: 50.25, timestamp: '1/1/2024, 12:00:00 PM' },
  { claimId: 'CLM1750397959888', amount: 50.25, timestamp: '1/1/2024, 11:00:00 AM' },
  { claimId: 'CLM1750397959777', amount: 50.25, timestamp: '1/1/2024, 10:00:00 AM' },
  { claimId: 'CLM1750397959666', amount: 50.25, timestamp: '1/1/2024, 09:00:00 AM' },
  { claimId: 'CLM1750397959555', amount: 50.25, timestamp: '1/1/2024, 08:00:00 AM' },
];

// Main VaultClaimModule component
const VaultClaimModule: React.FC = () => {
  const [balance, setBalance] = useState(1234567.00);
  const [isClaimable, setIsClaimable] = useState(false);
  const [logs, setLogs] = useState<ClaimLog[]>(initialDummyLogs); // Initialize with dummy data
  const [timerActive, setTimerActive] = useState(true);
  const [claimCycle, setClaimCycle] = useState(0);

  // Load logs from localStorage on component mount
  useEffect(() => {
    const storedLogs = localStorage.getItem('claimLogs');
    let loadedLogs: ClaimLog[] = [];
    if (storedLogs) {
      try {
        loadedLogs = JSON.parse(storedLogs);
      } catch (e) {
        console.error("Failed to parse stored logs from localStorage, using default:", e);
      }
    }
    // Combine loaded logs (if any) with dummy data.
    // Ensure unique entries if claimIds can overlap between dummy and stored.
    // For simplicity, this example just prepends loaded logs to dummy data if loadedLogs is not empty.
    // If you want strictly unique, you'd need a more complex merge.
    if (loadedLogs.length > 0) {
      // Filter out dummy logs that might have the same claimId as real logs, if necessary
      // For this case, assuming dummy IDs (100, 200, etc.) won't conflict with CLM + timestamp
      const combinedLogs = [...loadedLogs, ...initialDummyLogs];
      setLogs(combinedLogs);
    } else {
      setLogs(initialDummyLogs); // If no stored logs, just use the dummies
    }

    setTimerActive(true);
  }, []);

  // Save logs to localStorage whenever the logs state changes
  useEffect(() => {
    // Only save logs if they are not just the initial dummy set
    // Or save everything if you want dummy data to persist too
    localStorage.setItem('claimLogs', JSON.stringify(logs));
  }, [logs]);

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