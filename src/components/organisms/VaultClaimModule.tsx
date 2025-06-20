import React, { useState, useEffect, useRef } from "react";
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
  const [balance, setBalance] = useState<number>(12345.0);
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [claimCycle, setClaimCycle] = useState<number>(0);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [confettiOpacity, setConfettiOpacity] = useState<number>(1);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeOutInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [windowDimension, setWindowDimension] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height:
      typeof window !== "undefined" ? document.documentElement.scrollHeight : 0
  }));

  const [logs, setLogs] = useState<ClaimLog[]>(() => {
    if (typeof window !== "undefined") {
      const storedLogs = localStorage.getItem("claimLogs");
      if (storedLogs) {
        try {
          const parsedLogs = JSON.parse(storedLogs);
          return parsedLogs.length > 0 ? parsedLogs : initialDummyLogs;
        } catch (e) {
          console.error("Failed to parse stored logs from localStorage:", e);
          return initialDummyLogs;
        }
      }
    }
    return initialDummyLogs;
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("claimLogs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (showConfetti) {
      setConfettiOpacity(1);

      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
      if (fadeOutInterval.current) clearInterval(fadeOutInterval.current);

      confettiTimeout.current = setTimeout(() => {
        fadeOutInterval.current = setInterval(() => {
          setConfettiOpacity((prevOpacity) => {
            const newOpacity = prevOpacity - 0.1;
            if (newOpacity <= 0.1) {
              if (fadeOutInterval.current)
                clearInterval(fadeOutInterval.current);
              setConfettiOpacity(0);
              setTimeout(() => setShowConfetti(false), 300);
              return 0;
            }
            return newOpacity;
          });
        }, 200);
      }, 3000);
    } else {
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
      if (fadeOutInterval.current) clearInterval(fadeOutInterval.current);
      setConfettiOpacity(1);
    }

    return () => {
      if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
      if (fadeOutInterval.current) clearInterval(fadeOutInterval.current);
    };
  }, [showConfetti]);

  const handleTimerEnd = () => {
    setIsClaimable(true);
  };

  const handleClaim = () => {
    if (!isClaimable) return;

    const claimAmount = Number((Math.random() * (100 - 10) + 10).toFixed(2));
    const newBalance = balance + claimAmount;
    setBalance(newBalance);

    const newLog: ClaimLog = {
      claimId: `CLM${Date.now()}`,
      amount: claimAmount,
      timestamp: new Date().toLocaleString("en-US", { hour12: true })
    };

    setLogs((prevLogs) => [newLog, ...prevLogs]);
    setIsClaimable(false);

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
    setClaimCycle((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-2 sm:px-4 bg-[#0d0617] w-full">
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={5000}
          recycle={false}
          tweenDuration={20000}
          style={{
            opacity: confettiOpacity,
            transition: "opacity 0.3s ease-in-out"
          }}
        />
      )}
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        <div className="bg-[#1e1430] p-6 rounded-xl shadow-[0_0_25px_rgba(255,215,0,0.6)] w-full text-center border-2 border-amber-600">
          {" "}
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-4 animate-pulse-light font-playfair text-shadow-glow">
            Welcome to Scrooge Vault!
          </h2>{" "}
          <p className="text-sm sm:text-md text-amber-100 mb-4 font-lora">
            {" "}
            Unlock your daily rewards effortlessly. The Scrooge Vault is
            designed to provide you with a seamless and exciting claiming
            experience.
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
