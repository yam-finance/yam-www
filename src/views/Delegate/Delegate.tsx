import React, { useState, useCallback } from 'react';
import { Container, Spacer, Button } from "react-neu";
import { useWallet } from "use-wallet";
import Page from 'components/Page';
import PageHeader from "components/PageHeader";
import Box from 'components/BoxWithDisplay';
import UnlockWalletModal from "components/UnlockWalletModal";
import DelegateToken from 'components/DelegateToken';
import DelegateLP from 'components/DelegateLP';

const Delegate = () => {
  const { account } = useWallet();
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen])

  return (
    <Page>
      <Container>
        <PageHeader icon="📜" title="Delegate" subtitle="Delegate and join in on governance voting!" />
        {account
          ? (
            <>
              <DelegateToken />
              <Spacer size="md" />
              <DelegateLP />
            </>
          )
          : (
            <>
              <Box row justifyContent="center">
                <Button onClick={handleUnlockWalletClick} text="Unlock wallet to delegate" variant="secondary" />
              </Box>
              <UnlockWalletModal isOpen={unlockModalIsOpen} onDismiss={handleDismissUnlockModal} />
            </>
          )
        }
      </Container>
    </Page>
  );
}

export default Delegate;
