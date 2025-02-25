import gql from "graphql-tag";

export const typeDefs = gql`
  type Bet {
    id: ID!
    match: String!
    betDetail: String!
    odds: String!
    amount: Int!
  }

  type Query {
    bets: [Bet!]!
  }

  type Mutation {
    placeBet(match: String!, betDetail: String!, odds: String!, amount: Int!): Bet!
  }
`;    