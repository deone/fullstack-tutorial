import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://185.20.49.94:25155/'
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
})

// ... above is the instantiation of the client object.
client
  .query({
    query: gql`
      query GetLaunch {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result))