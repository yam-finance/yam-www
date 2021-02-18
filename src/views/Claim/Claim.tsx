import React from "react";
import { Container, Spacer } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";

import ClaimCard from "./components/ClaimCard";
import VestingNotice from "./components/VestingNotice";

const Claim: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="🦋" subtitle="" title="Claim YAMs!" />
      <Container>
        <Spacer />
        <VestingNotice />
        <Spacer />
        <Split>
          <ClaimCard />
        </Split>
      </Container>
    </Page>
  );
};

export default Claim;
