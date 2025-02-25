import { mockBets } from "./data";
import { Bet } from "./types";

export const resolvers = {
  Query: {
    bets: (): Bet[] => mockBets,
  },
  Mutation: {
    placeBet: (_: any, args: any): Bet => {
      const newBet = { id: Math.random().toString(36).substr(2, 9), ...args.input };
      return newBet;
    },
  },
};
