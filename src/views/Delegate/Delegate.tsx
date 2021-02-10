import React from 'react';
import { Container, Spacer } from "react-neu";
import Page from 'components/Page';
import PageHeader from "components/PageHeader";
import DelegateForm from "components/DelegateForm";
import { useWallet } from "use-wallet";

const Delegate = () => {

  return (
    <Page>
      <Container>
        <PageHeader icon="📜" title="Delegate" />
        <Spacer size="md" />
        <DelegateForm />
      </Container>
    </Page>
  );
}

export default Delegate;
