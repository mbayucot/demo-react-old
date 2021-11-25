import fetch from 'cross-fetch';
import { RetryLink } from '@apollo/client/link/retry';
import QueueLink from 'apollo-link-queue';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const queueLink = new QueueLink();
const retryLink = new RetryLink();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token') || '',
    },
  };
});

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_HOST_URL}/graphql`,
  fetch,
});

export const apolloClient = new ApolloClient({
  link: from([authLink, retryLink, queueLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
  },
});
