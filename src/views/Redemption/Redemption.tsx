import React, { useCallback, useState, } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { Box, Button, Card, CardContent, Container, Spacer } from "react-neu";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import useSDK from "hooks/useSDK";
import UnlockWalletModal from "components/UnlockWalletModal";
import Label from "components/Label";
import Value from "components/Value";

const Redemption: React.FC = () => {
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const { account } = useWallet();
  const { redeemerContract, yamBalance } = useSDK();

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);

  // TODO update redeemer for it to work
  const redeemClick = useCallback(async () => {
    const yamAmount = new BigNumber(yamBalance).multipliedBy(new BigNumber(10).pow(18)).toString();
    const redeem = redeemerContract.redeem(account, yamAmount)
  }, [yamBalance]);

  return (
    <Page>
      <PageHeader icon={"🍠"} title="Yam Redemption" subtitle="Redeem your YAM in exchange for treasury assets." />
      <Container>
        {account
          ? <>
            <Card>
              <CardContent>
                <Box alignItems="center" column minHeight={85}>
                  <Value suffix="Your have" value={yamBalance} prefix="YAM." />
                  <Spacer size="sm" />
                  <Box alignItems="center" column maxWidth={550}>
                    <Label text={"After redeeming you will recieve shares from the treasury as tokens in exchange for your YAM. Your YAM will be burnt forever."} labelPosition="center" />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Spacer />
            <Box alignItems="center" row justifyContent="space-between">
              <Box alignItems="center" row>
                <Button to="/dashboard" text="Go back" variant="tertiary" />
                {/* <Button onClick={donateClick} text="Donate" /> */}
              </Box>
              <Box alignItems="center" row justifyContent="space-between">
                <Button onClick={redeemClick} text="Redeem" />
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

export default Redemption;
