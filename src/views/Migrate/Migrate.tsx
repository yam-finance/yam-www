import React from "react";
import { Container, Spacer } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import ClaimCard from "components/ClaimCard";

import MigrateCard from "./components/MigrateCard";
import VestingNotice from "./components/VestingNotice";
import EndingMigrationNotice from "./components/EndingMigrationNotice";

const Migrate: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="🦋" subtitle="Everything you need to migrate V2 tokens to V3" title="Migrate to V3" />
      <Container>
        {/** 
        * <EndingMigrationNotice/> 
        <Spacer />
        */}
        <VestingNotice />
        <Spacer />
        <Split>
          <MigrateCard />
          <ClaimCard />
        </Split>
      </Container>
    </Page>
  );
};

export default Migrate;
