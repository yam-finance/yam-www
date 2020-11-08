import React, { useCallback, useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from 'react-neu'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'

import { BalancesProvider } from 'contexts/Balances'
import { FarmingProvider } from 'contexts/Farming'
import { MigrationProvider } from 'contexts/Migration'
import { PricesProvider } from 'contexts/Prices'
import { VestingProvider } from 'contexts/Vesting'
import { GovernanceProvider } from 'contexts/Governance'
import YamProvider from 'contexts/YamProvider'

import useLocalStorage from 'hooks/useLocalStorage'

import Farm from 'views/Farm'
import FAQ from 'views/FAQ'
import Home from 'views/Home'
import Migrate from 'views/Migrate'
import Governance from 'views/Governance'

import styled from 'styled-components'
import { chainId } from 'constants/tokenAddresses'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])
  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Router>
      <Providers>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/stake">
            <Farm />
          </Route>
          {/*<Route path="/faq">
            <FAQ />
          </Route>
          <Route exact path="/migrate">
            <Migrate />
          </Route>
          <Route exact path="/governance">
            <Governance />
          </Route>
          <StyledLink href="https://yam.gitbook.io/yam/" target="_blank">Docs</StyledLink>
        */}
        </Switch>
      </Providers>
    </Router>
  )
}

const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage('darkMode', true)
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme({
      baseColorDark: { h: 215, s: 70.4, l: 33.1 },
      borderRadius: 28,
    })
  }, [])

  return (
    <ThemeProvider
      darkModeEnabled={darkModeSetting}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
    >
      <UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <YamProvider>
          <PricesProvider>
            <BalancesProvider>
              <FarmingProvider>
                <MigrationProvider>
                  <VestingProvider>
                    {/*<GovernanceProvider>*/}
                      {children}
                    {/*</GovernanceProvider>*/}
                  </VestingProvider>
                </MigrationProvider>
              </FarmingProvider>
            </BalancesProvider>
          </PricesProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const StyledLink = styled.a`
  color: ${props => props.theme.colors.grey[500]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
`

export default App
