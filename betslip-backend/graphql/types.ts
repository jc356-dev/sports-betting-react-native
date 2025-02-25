export interface Bet {
  id: string;
  match: string;
  betDetail: string;
  odds: string;
  amount: number;
}

export interface Query {
  bets: Bet[];
}

export interface Mutation {
  placeBet: (
    match: string,
    betDetail: string,
    odds: string,
    amount: number,
    type: string
  ) => Bet;
}
