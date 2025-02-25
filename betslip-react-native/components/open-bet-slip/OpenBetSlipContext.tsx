import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Bet } from "./type";

interface BetSlipContextProps {
  isCurrencyCoin: boolean;
  setIsCurrencyCoin: (value: boolean) => void;
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
  selectedAmount?: number;
  setSelectedAmount: (amount?: number) => void;
  totalBet: number;
  potentialWin: number;
  xpEarned: number;
  showConfirmation: boolean;
  setShowConfirmation: (value: boolean) => void;
  isConfirming: boolean;
  isConfirmed: boolean;
  handleConfirmBet: () => void;
  handleSelectAmount: (amount: string) => void;
  bets: Bet[];
  deleteBet: (id: number) => void;
}

const BetSlipContext = createContext<BetSlipContextProps | undefined>(
  undefined
);

export enum Tabs {
  Singles = "Singles",
  Parlay = "Parlay",
}

export const BetSlipProvider: React.FC<{
  children: ReactNode;
  defalutBets?: Bet[];
}> = ({ children, defalutBets }) => {
  const [isCurrencyCoin, setIsCurrencyCoin] = useState(true);
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Singles);
  const [selectedAmount, setSelectedAmount] = useState<number>();
  const [totalBet, setTotalBet] = useState(0);
  const [potentialWin, setPotentialWin] = useState(0);
  const [xpEarned, setXpEarned] = useState(360);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bets, setBets] = useState<Bet[]>(defalutBets ?? []);

  const calculateBetValues = () => {
    if (bets.length === 0) {
      setTotalBet(0);
      setPotentialWin(0);
      return;
    }

    const totalBetAmount = bets.reduce(
      (sum, bet) => sum + (bet.amount || 0),
      0
    );

    let potentialWinAmount = 0;

    if (activeTab === Tabs.Singles) {
      potentialWinAmount = bets.reduce((sum, bet) => {
        const win = calculateWin(bet.amount || 0, bet.odds);
        return sum + win;
      }, 0);
    } else if (activeTab === Tabs.Parlay) {
      const decimalOdds = bets.reduce(
        (product, bet) => product * convertToDecimalOdds(bet.odds),
        1
      );
      potentialWinAmount = totalBetAmount * decimalOdds - totalBetAmount;
    }

    setTotalBet(totalBetAmount);
    setPotentialWin(Math.floor(potentialWinAmount));
  };

  const calculateWin = (amount: number, oddsString: string): number => {
    if (!amount) return 0;

    const odds = parseFloat(oddsString.replace("+", ""));

    if (oddsString.startsWith("+")) {
      return (amount * odds) / 100;
    } else {
      return (amount / Math.abs(odds)) * 100;
    }
  };

  const convertToDecimalOdds = (oddsString: string): number => {
    const odds = parseFloat(oddsString.replace("+", ""));
    return oddsString.startsWith("+")
      ? 1 + odds / 100
      : 1 + 100 / Math.abs(odds);
  };

  useEffect(() => {
    calculateBetValues();
  }, [bets, activeTab]);

  const handleConfirmBet = () => {
    if (!selectedAmount) return;

    setIsConfirming(true);
    setIsConfirmed(false);

    setTimeout(() => {
      setIsConfirming(false);
      setIsConfirmed(true);
      setShowConfirmation(true);
    }, 2000);
  };


  const handleSelectAmount = (amount: string) => {
    const numericAmount = parseInt(amount.replace("k", "000")) || 0;
    const numberOfBets = bets.length;
  
    if (numberOfBets === 0) {
      setTotalBet(0);
      setPotentialWin(0);
      setSelectedAmount(undefined);
      return;
    }
    
    setSelectedAmount(numericAmount);

    const splitAmount = Math.floor(numericAmount / numberOfBets); 

    setBets((prevBets) =>
      prevBets.map((bet) => ({
        ...bet,
        amount: splitAmount,
      }))
    );
  
    setTotalBet(numericAmount);
  };

  const deleteBet = (id: number) => {
    setBets(bets.filter((b) => b.id !== id));
  };

  return (
    <BetSlipContext.Provider
      value={{
        isCurrencyCoin,
        setIsCurrencyCoin,
        activeTab,
        setActiveTab,
        selectedAmount,
        setSelectedAmount,
        totalBet,
        potentialWin,
        xpEarned,
        showConfirmation,
        setShowConfirmation,
        isConfirming,
        isConfirmed,
        handleConfirmBet,
        handleSelectAmount,
        bets,
        deleteBet,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = (): BetSlipContextProps => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error("useBetSlip must be used within a BetSlipProvider");
  }
  return context;
};
