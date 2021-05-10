import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "react-neu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";

import TopBar from "components/TopBar";

import { BalancesProvider } from "contexts/Balances";
import { FarmingProvider } from "contexts/Farming";
import { MigrationProvider } from "contexts/Migration";
import { PricesProvider } from "contexts/Prices";
import { VestingProvider } from "contexts/Vesting";
import { GovernanceProvider } from "contexts/Governance";
import YamProvider from "contexts/YamProvider";
import useLocalStorage from "hooks/useLocalStorage";

import Farm from "views/Farm";
import FAQ from "views/FAQ";
import Home from "views/Home";
import Migrate from "views/Migrate";
import Dashboard from "views/Dashboard";
import Governance from "views/Governance";
import Addresses from "views/Addresses";
import Umbrella from "views/Landings/Umbrella";
import Daohouse from "views/Landings/Daohouse";
import Contributor from "views/Contributor";
import Delegate from "views/Delegate";
import Claim from "views/Claim";
import Start from "views/Start";
import Registration from "views/Registration";


const App: React.FC = () => {

  return (
    <Router>
      <Providers>
        <TopBar />
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route exact path="/farm">
            <Farm />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route exact path="/migrate">
            <Migrate />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/treasury">
            <Dashboard />
          </Route>
          <Route exact path="/governance">
            <Governance />
          </Route>
          <Route exact path="/addresses">
            <Addresses />
          </Route>
          <Route exact path="/umbrella">
            <Umbrella />
          </Route>
          <Route exact path="/daohouse">
            <Daohouse />
          </Route>

          <Route exact path="/contributor">
            <Contributor />
          </Route>
          <Route exact path="/contributors">
            <Contributor />
          </Route>
          <Route exact path="/delegate">
            <Delegate />
          </Route>
          <Route exact path="/claim">
            <Claim />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
        </Switch>
      </Providers>
    </Router>
  );
};

const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage("darkMode", false);
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme({
      baseColor: { h: 338, s: 100, l: 41 },
      baseColorDark: { h: 339, s: 89, l: 49 },
      borderRadius: 28,
    });
  }, []);
  return (
    <ThemeProvider darkModeEnabled={darkModeSetting} darkTheme={darkTheme} lightTheme={lightTheme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
        }}
      >
        <YamProvider>
          <PricesProvider>
            <BalancesProvider>
              <FarmingProvider>
                <MigrationProvider>
                  <VestingProvider>
                    <GovernanceProvider>{children}</GovernanceProvider>
                  </VestingProvider>
                </MigrationProvider>
              </FarmingProvider>
            </BalancesProvider>
          </PricesProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
