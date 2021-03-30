// import '../src/wdyr'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Global, css } from '@emotion/react'
import { AppProps } from 'next/app'
import { WithRouterProps } from 'next/dist/client/with-router'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { Page } from '@codelab/frontend/shared'
import { RelayEnvironmentProvider } from 'relay-hooks'
import { createEnvironment } from '@codelab/frontend/relay'
import { LayoutFactory } from '../src/pages/LayoutFactory'
import { useApollo } from '@codelab/frontend/apollo'

import '../src/styles/App.less'

const App: React.FunctionComponent<WithRouterProps> = ({
  children,
  router,
}) => {
  return <LayoutFactory router={router}>{children}</LayoutFactory>
}

const RootProviders = ({
  pageProps,
  children,
}: PropsWithChildren<{ pageProps: any }>) => (
  <RecoilRoot>
    <RelayEnvironmentProvider
      environment={createEnvironment(pageProps.relayData)}
    >
      <ApolloProvider client={useApollo(pageProps)}>
        {/* The Provider from react-dnd-multi-backend allows us to use both click and touch for drag and dropping */}
        {/* TODO remove react-dnd if we don't use it */}
        {/* <DndMultiProvider options={HTML5toTouch}>{children}</DndMultiProvider> */}
        <UserProvider>{children}</UserProvider>
      </ApolloProvider>
    </RelayEnvironmentProvider>
  </RecoilRoot>
)

const AppContainer: React.FC<AppProps> = ({ pageProps, Component, router }) => {
  return (
    <RootProviders pageProps={pageProps}>
      <Global
        styles={css({
          '#__next': {
            height: '100%',
          },
          body: {
            overflow:
              router.pathname === Page.PAGE_DETAIL.url ? 'hidden' : 'auto',
          },
        })}
      />
      <App router={router}>
        <Component {...pageProps} />
      </App>
    </RootProviders>
  )
}

export default AppContainer
