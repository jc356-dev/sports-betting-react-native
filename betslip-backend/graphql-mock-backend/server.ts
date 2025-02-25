import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';

const schema = createSchema({
  typeDefs: `
    type User {
      id: ID!
      name: String!
      email: String!
    }

    type Query {
      users: [User!]!
    }
  `,
  resolvers: {
    Query: {
      users: () => [
        { id: '1', name: 'Alice', email: 'alice@example.com' },
        { id: '2', name: 'Bob', email: 'bob@example.com' },
      ],
    },
  },
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/', 
  landingPage: false,   
});

// Create HTTP Server
const server = createServer(yoga);

server.listen(4000, () => {
  console.log('🚀 GraphQL Server running at http://localhost:4000/');
});
