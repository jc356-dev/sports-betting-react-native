import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const API_URL = "http://localhost:3000/api/graphql"; //@todo: move it to env variable

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache(),
});
