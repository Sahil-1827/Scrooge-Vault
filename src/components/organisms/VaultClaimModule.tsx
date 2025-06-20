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

// Main VaultClaimModule component
const VaultClaimModule: React.FC = () => {
  const [balance, setBalance] = useState(1250.75); // State for dynamic balance
  const [isClaimable, setIsClaimable] = useState(false);
  const [logs, setLogs] = useState<ClaimLog[]>([
    { claimId: 'CLM12345', amount: 50.25, timestamp: '2025-06-20 09:30 AM' },
    { claimId: 'CLM12344', amount: 75.50, timestamp: '2025-06-20 09:15 AM' },
    { claimId: 'CLM12343', amount: 100.00, timestamp: '2025-06-20 09:00 AM' },
    { claimId: 'CLM12342', amount: 25.75, timestamp: '2025-06-20 08:45 AM' },
    { claimId: 'CLM12341', amount: 200.10, timestamp: '2025-06-20 08:30 AM' },
  ]);
  const [timerActive, setTimerActive] = useState(true); // State to control initial timer

  // Handler for timer end
  const handleTimerEnd = () => {
    setIsClaimable(true);
    setTimerActive(false); // Stop the timer after the first cycle
  };

  // Handler for claim button click
  const handleClaim = () => {
    if (isClaimable) {
      const claimAmount = 50.25; // Mocked claim amount
      const newBalance = balance + claimAmount;
      setBalance(newBalance);

      const newLog: ClaimLog = {
        claimId: `CLM${Date.now()}`, // Unique claim ID using timestamp
        amount: claimAmount,
        timestamp: new Date().toLocaleString('en-US', { hour12: true }), // Current time
      };
      setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 4)]); // Add new log, keep last 5

      toast.success(`Claim successful! +${claimAmount} ST`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
      // Do not reset isClaimable to allow multiple claims without timer
    }
  };

  // Reset timerActive when component mounts
  useEffect(() => {
    setTimerActive(true); // Ensure timer starts on mount
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <VaultCard
        balance={balance}
        isClaimable={isClaimable}
        onClaim={handleClaim}
        onTimerEnd={handleTimerEnd}
      />
      <ClaimLogs logs={logs} />
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
};

export default VaultClaimModule;