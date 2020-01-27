import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import ReactDOM from 'react-dom'

import Pages from './pages'
import Login from './pages/login'
import injectStyles from './styles'
import { resolvers, typeDefs } from './resolvers'

const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://185.20.49.94:25155/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
})

injectStyles()
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
)