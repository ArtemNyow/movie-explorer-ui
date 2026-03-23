import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[APOLLO] ${message}`, data || "");
  },
  error: (message: string, error?: unknown) => {
    console.error(`[APOLLO ERROR] ${message}`, error || "");
  },
};

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || "/graphql",
  credentials: "same-origin",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

logger.info(
  "Apollo Client initialized with endpoint:",
  import.meta.env.VITE_GRAPHQL_URL || "/graphql",
);
