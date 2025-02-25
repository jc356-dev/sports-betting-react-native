import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Bet } from "./type";

import { useMutation, gql } from "@apollo/client";

const PLACE_BET = gql`
  mutation PlaceBet($input: PlaceBetInput!) {
    placeBet(input: $input) {
      id
      match
      betDetail
      odds
      amount
      type
    }
  }
`;

export enum Tabs {
  Singles = "Singles",
  Parlay = "Parlay",
}

export enum BetStatus {
  NONE,
  CONFIRMING,
  CONFIRMED,
  COMPLETED,
  FAILED,
}

interface BetSlipContextProps {
  isCurrencyCoin: boolean;
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
  selectedAmount?: number;
  setSelectedAmount: (amount?: number) => void;
  totalBet: number;
  potentialWin: number;
  xpEarned: number;
  showConfirmation: boolean;
  setShowConfirmation: (value: boolean) => void;
  handleConfirmBet: () => void;
  handleSelectAmount: (amount: string) => void;
  bets: Bet[];
  deleteBet: (id: number) => void;
  status: BetStatus;
  toggleCurrency: () => void;
}

const BetSlipContext = createContext<BetSlipContextProps | undefined>(
  undefined
);

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
  const [bets, setBets] = useState<Bet[]>(defalutBets ?? []);
  const [status, setStatus] = useState<BetStatus>(BetStatus.NONE);
  const [placeBet] = useMutation(PLACE_BET);

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
    if (!selectedAmount || bets.length === 0) return;

    setStatus(BetStatus.CONFIRMING);


    bets.forEach(async (bet) => {
      const betInput = {
        match: bet.match,
        betDetail: bet.betDetail,
        odds: bet.odds,
        amount: bet.amount || 0,
        currency: isCurrencyCoin ? "coin" : "cash",
        type: activeTab, // "Singles" or "Parlay"
      };

      try {
        await placeBet({ variables: { input: betInput } });
      } catch (error) {
        console.error("Bet submission failed", error);
      }
    });

    setTimeout(() => {
      setStatus(BetStatus.CONFIRMED);
    }, 2000);
  };

  const handleSelectAmount = (amount: string) => {
    const numericAmount = parseInt(isCurrencyCoin ? amount.replace("k", "000") : amount.replace("$", "")) || 0;
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

  const toggleCurrency = () => {
    setIsCurrencyCoin(!isCurrencyCoin);
    setSelectedAmount(undefined);
    setStatus(BetStatus.NONE);
    setActiveTab(Tabs.Singles);
    setBets(bets.map(b => ({...b, amount: 0})));
  }

  return (
    <BetSlipContext.Provider
      value={{
        isCurrencyCoin,
        activeTab,
        setActiveTab,
        selectedAmount,
        setSelectedAmount,
        totalBet,
        potentialWin,
        xpEarned,
        showConfirmation,
        setShowConfirmation,
        handleConfirmBet,
        handleSelectAmount,
        bets,
        deleteBet,
        status,
        toggleCurrency
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
