import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'
import Pages from './pages'
import injectStyles from './styles'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://185.20.49.94:25155/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
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