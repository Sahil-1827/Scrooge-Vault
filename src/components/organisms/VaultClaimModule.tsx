import React, { useState, useEffect } from "react";
import VaultCard from "../molecules/VaultCard";
import ClaimLogs from "../molecules/ClaimLogs";
import { toast, ToastContainer } from "react-toastify";
import ReactConfetti from "react-confetti";

interface ClaimLog {
  claimId: string;
  amount: number;
  timestamp: string;
}

const initialDummyLogs: ClaimLog[] = [
  {
    claimId: "CLM1750399282435",
    amount: 95.14,
    timestamp: "6/20/2025, 11:31:22 AM"
  },
  {
    claimId: "CLM1750399282434",
    amount: 87.32,
    timestamp: "6/20/2025, 11:30:15 AM"
  },
  {
    claimId: "CLM1750399282433",
    amount: 92.45,
    timestamp: "6/20/2025, 11:29:08 AM"
  },
  {
    claimId: "CLM1750399282432",
    amount: 83.67,
    timestamp: "6/20/2025, 11:28:45 AM"
  },
  {
    claimId: "CLM1750399282431",
    amount: 90.23,
    timestamp: "6/20/2025, 11:27:30 AM"
  }
];

const VaultClaimModule: React.FC = () => {
  const [balance, setBalance] = useState(1234567.0);
  const [isClaimable, setIsClaimable] = useState(false);
  const [claimCycle, setClaimCycle] = useState(0);

  const [showConfetti, setShowConfetti] = useState(false);
  // Initialize with document dimensions for full coverage
  const [windowDimension, setWindowDimension] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight
  });

  const [logs, setLogs] = useState<ClaimLog[]>(() => {
    const storedLogs = localStorage.getItem("claimLogs");
    if (storedLogs) {
      try {
        const parsedLogs = JSON.parse(storedLogs);
        return parsedLogs.length > 0 ? parsedLogs : initialDummyLogs;
      } catch (e) {
        console.error(
          "Failed to parse stored logs from localStorage, falling back to dummy data:",
          e
        );
        return initialDummyLogs;
      }
    }
    return initialDummyLogs;
  });

  useEffect(() => {
    // Update dimensions on window resize and initially on mount
    const handleResize = () => {
      setWindowDimension({
        width: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount to set initial dimensions

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handler for timer end
  const handleTimerEnd = () => {
    setIsClaimable(true);
  };

  // Handler for claim button click
  const handleClaim = () => {
    if (isClaimable) {
      const claimAmount = Number((Math.random() * (100 - 10) + 10).toFixed(2));
      const newBalance = balance + claimAmount;
      setBalance(newBalance);

      const newLog: ClaimLog = {
        claimId: `CLM${Date.now()}`,
        amount: claimAmount,
        timestamp: new Date().toLocaleString("en-US", { hour12: true })
      };

      setLogs((prevLogs) => [newLog, ...prevLogs]);

      toast.success(`Claim successful! +${claimAmount} ST`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });

      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      setIsClaimable(false);
      setClaimCycle((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-2 sm:px-4 bg-[#0d0617] w-full">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={5000}
          recycle={false}
          tweenDuration={10000}
        />
      )}
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {/* New Section for Welcome Text and Features */}
        <div className="bg-[#1e1430] p-6 rounded-xl shadow-[0_0_20px_rgba(150,0,255,0.7)] w-full text-center border-2 border-yellow-500">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-4 animate-pulse-light font-playfair">Welcome to Scrooge Vault!</h2>
          <p className="text-sm sm:text-md text-[#CCCCCC] mb-4 font-lora">
            Unlock your daily rewards effortlessly. The Scrooge Vault is designed to provide you with a seamless and exciting claiming experience.
          </p>
        </div>
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