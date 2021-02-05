import React from 'react';
import { Container, Card, CardTitle, CardContent, Separator, Surface, Button, Input } from "react-neu";
import Box from 'components/BoxWithDisplay';
import Page from 'components/Page';
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import DelegateForm from "components/DelegateForm";
import { useWallet } from "use-wallet";

const Delegate = () => {
  const { account } = useWallet();

  return (
    <Page>
      <Container>
        <PageHeader icon="📜" title="Delegate" />
        {account && (
          <Card>
            <CardTitle text="Delegate Vote" />
            <CardContent>
              <Box display="grid" alignItems="center" paddingLeft={4} paddingRight={4} paddingBottom={1} row>
                <DelegateForm />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
}

export default Delegate;