import React, { useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "react-neu";
import { BrowserRouter as Router, Route, Switch, useLocation, Redirect } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";
import { useTranslation } from 'react-i18next';

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
import Projects from "views/Projects";


const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, i18n.language]);

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
          <Route exact path="/projects">
            <Projects />
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
          fortmatic: { apiKey: "pk_live_2B1E18021320B71B" },
          portis: { dAppId: "df008898-2b38-429d-a42a-119623c8e480" }
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
