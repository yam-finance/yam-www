import React from "react";
import { Container, Spacer, useTheme } from "react-neu";
import { useIntl } from "react-intl";

import Page from "components/Page";
import PageHeader from "components/PageHeader";

import useBalances from "hooks/useBalances";
import useVesting from "hooks/useVesting";

import MigrationNotice from "./components/MigrationNotice";
import RegisterVoteNotice from "./components/RegisterVoteNotice";
import Treasury from "./components/Treasury";
import VestingNotice from "./components/VestingNotice";

const Home: React.FC = () => {
  const intl = useIntl();
  const { darkMode } = useTheme();
  const { yamV2Balance } = useBalances();
  const { vestedBalance } = useVesting();
  return (
    <Page>
      <PageHeader
        icon={darkMode ? "🌚" : "🌞"}
        subtitle={darkMode ? intl.formatMessage({ id: "home.subtitle.dark" }) : intl.formatMessage({ id: "home.subtitle" })}
        title={intl.formatMessage({ id: "home.title" })}
      />
      <Container>
        <RegisterVoteNotice />
        <Spacer />
        {yamV2Balance && yamV2Balance.toNumber() > 0 && (
          <>
            <MigrationNotice />
            <Spacer />
          </>
        )}
        {vestedBalance && vestedBalance.toNumber() > 0 && (
          <>
            <VestingNotice />
            <Spacer />
          </>
        )}
        <Treasury />
      </Container>
    </Page>
  );
};

export default Home;
