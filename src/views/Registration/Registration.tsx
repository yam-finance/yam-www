import React, { useEffect, useCallback, useState } from "react";
import { Container, Spacer, Button } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";

import RegisterNotice from "./components/RegisterNotice";
import RegistrationButton from 'components/RegistrationButton';
import styled from "styled-components";
import { useWallet } from "use-wallet";

const Registration: React.FC = () => {
  const { account } = useWallet();

  return (
    <Page>
      <PageHeader icon={"👏"} title="Registration" subtitle="Register to vote!" />
      <Spacer size="md" />
      
      <Container>
        <RegisterNotice />
        <Spacer size="lg" />
        <Split>
          <Spacer size="sm" />
          <RegistrationButton size="lg" />
          <Spacer size="sm" />
        </Split>
      </Container>
    </Page>
  );
};

export const StyledButtonMain = styled.div`
  font-weight: 600;
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default Registration;
