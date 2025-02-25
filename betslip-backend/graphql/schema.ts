import gql from "graphql-tag";

export const typeDefs = gql`
  type Bet {
    id: ID!
    match: String!
    betDetail: String!
    odds: String!
    amount: Int!
    type: String
  }

  type Query {
    bets: [Bet!]!
  }

  input PlaceBetInput {
    match: String!
    betDetail: String!
    odds: String!
    amount: Int!
    type: String!
  }

  type Mutation {
    placeBet(input: PlaceBetInput!): Bet!
  }
`;
