import React, { useCallback, useState, useEffect, useMemo } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import numeral from "numeral";
import { Box, Button, Container, Modal, ModalContent, ModalProps, ModalTitle, Separator, Spacer } from "react-neu";
import FancyValue from "components/FancyValue";
import Split from "components/Split";
import useBalances from "hooks/useBalances";
import useVesting from "hooks/useVesting";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import useSDK from "hooks/useSDK";
import UnlockWalletModal from "components/UnlockWalletModal";

const User: React.FC = () => {
  const { account, reset } = useWallet();
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const { yamV2Balance, yamV3Balance } = useBalances();
  const { yamBalance } = useSDK();

  const { isClaiming, onClaim, vestedDelegatorRewardBalance, vestedMigratedBalance, vestedBalance } = useVesting();

  const getDisplayBalance = useCallback((value?: any) => {
    if (value) {
      return numeral(value).format("0.00a");
    } else {
      return "--";
    }
  }, []);

  // TODO Move these to their own component
  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);


  const ClaimButton = useMemo(() => {
    const hasVestedYams = vestedBalance && vestedBalance.toNumber() > 0;
    if (isClaiming) {
      return <Button disabled text="Claiming YAM..." variant="secondary" />;
    }
    if (hasVestedYams) {
      return <Button onClick={onClaim} text="Claim Vested YAM" />;
    }
    return <Button disabled text="Claim YAM" variant="secondary" />;
  }, [isClaiming, onClaim, vestedBalance]);

  return (
    <Page>
      <PageHeader icon={"🍠"} title="Your Page" subtitle="Everything you have on yam!" />
      <Spacer size="md" />

      <Container>

        {account
          ? <>
            <Split>
              <Box row>
                <FancyValue icon="🍠" label="YAM balance" value={getDisplayBalance(yamBalance)} />
              </Box>
              <Box row>
                <FancyValue
                  icon={
                    <span role="img" style={{ opacity: 0.5 }}>
                      🍠
                    </span>
                  }
                  label="YAMV2 balance"
                  value={getDisplayBalance(yamV2Balance)}
                />
              </Box>
            </Split>
            <Spacer />
            <Separator />
            <Spacer />
            <Split>
              <Box row>
                <FancyValue icon="🎁" label="Vested YAM (Delegator)" value={getDisplayBalance(vestedDelegatorRewardBalance)} />
              </Box>
              <Box row>
                <FancyValue icon="🦋" label="Vested YAM (Migrated)" value={getDisplayBalance(vestedMigratedBalance)} />
              </Box>
            </Split>
            <Spacer />

            <Box alignItems="center" row justifyContent="space-between">
              <Box alignItems="center" row>
                <Button text="Vote" to="/governance" variant="tertiary" />
                <Spacer />
                <Button text="Delegate" to="/delegate" variant="tertiary" />
              </Box>
              <Box alignItems="center" row justifyContent="space-between">
                <Box>{ClaimButton}</Box>
              </Box>
            </Box>
          </>
          : (
            <>
              <Box row justifyContent="center">
                <Button onClick={handleUnlockWalletClick} text="Unlock wallet to display proposals" variant="secondary" />
              </Box>
              <UnlockWalletModal isOpen={unlockModalIsOpen} onDismiss={handleDismissUnlockModal} />
            </>
          )
        }
      </Container>
    </Page>
  );
};

export default User;
