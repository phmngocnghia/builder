/**
 * Source from https://github.com/correttojs/graphql-codegen-apollo-next-ssr
 */
import { ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloLink } from '@apollo/client/link/core'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'
import { cache, resolvers } from './apollo-cache'
import { apiLink } from './links/apiLink'
import { authLink } from './links/authLink'
import { errorLink } from './links/errorLink'
import { typeDefs } from '@codelab/generated'

export interface ApolloContext {
  authToken?: string
  graphqlUri?: string
}

const defaultContext: ApolloContext = {
  graphqlUri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
}

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<any> | undefined

/** Creates a new ApolloClient instance */
export const getApolloClient = (ctx: ApolloContext = {}) => {
  const link = ApolloLink.from([
    setContext(() => ({ ...defaultContext, ...ctx })),
    errorLink,
    authLink,
    apiLink,
  ])

  const client = new ApolloClient({
    link,
    cache,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: typeof window === 'undefined',
    typeDefs,
  })

  client.addResolvers(resolvers)

  return client
}

export const initializeApollo = (
  ctx: ApolloContext = {},
  initialState: Record<string, any> | undefined | null = null,
) => {
  const _apolloClient = apolloClient ?? getApolloClient(ctx)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient
  }

  return _apolloClient
}

export const addApolloState = (client: ApolloClient<any>, pageProps: any) => {
  if (pageProps?.props) {
    // eslint-disable-next-line no-param-reassign
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]

  return useMemo(() => initializeApollo(undefined, state), [state])
}
