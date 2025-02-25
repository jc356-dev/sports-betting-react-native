import { mockBets } from "./data";
import { Bet } from "./types";

export const resolvers = {
  Query: {
    bets: (): Bet[] => mockBets,
  },
  Mutation: {
    placeBet: (_: any, args: Omit<Bet, "id">): Bet => {
      const newBet = { id: `${mockBets.length + 1}`, ...args };
      return newBet;
    },
  },
};
