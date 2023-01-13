import React, { useCallback, useEffect, useMemo, useState, } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { Box, Button, Card, CardContent, Container, ModalTitle, Spacer } from "react-neu";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import useSDK from "hooks/useSDK";
import UnlockWalletModal from "components/UnlockWalletModal";
import Label from "components/Label";
import Value from "components/Value";
import useAllowance from "hooks/useAllowance";
import useApproval from "hooks/useApproval";
import { ethers } from "ethers";

const Redemption: React.FC = () => {
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const { account, status } = useWallet();
  const { yamContract, redeemerContract, yamBalance } = useSDK();
  const { isApproved, isApproving, onApprove } = useApproval(yamContract?.address, redeemerContract?.address);

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);
  
  const redeemClick = useCallback(async () => {
    const yamAmount = new BigNumber(yamBalance).multipliedBy(new BigNumber(10).pow(18)).toString();
    const redeem = await redeemerContract.redeem(account, yamAmount);
    console.log("redeem", redeem);
  }, [yamBalance, account, status]);
  
  const RedeemButton = useMemo(() => {
    if (!yamBalance) {
      return <Button disabled text="Redeem" />
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={onApprove}
          text={!isApproving ? "Approve Redeemer" : "Approving Redeemer..."}
          variant={isApproving || status !== "connected" ? "secondary" : "default"}
        />
      );
    }
    if (isApproved) {
      return <Button disabled={!yamBalance} onClick={redeemClick} text="Redeem" />;
    }
  }, [yamBalance, isApproving, onApprove, status]);

  const YourYamBalance = useMemo(() => {
    console.log("yamBalance", yamBalance);
    if (typeof yamBalance === "undefined") {
      return <b>Loading...</b>
    }
    if (yamBalance == 0) {
      return <b>You have no YAM.</b>
    }
    if (yamBalance) {
      return <Value suffix="You have" value={yamBalance} prefix="YAM." />
    }
  }, [yamBalance, account, status]);

  return (
    <Page>
      <PageHeader icon={"🍠"} title="Yam Redemption" subtitle="Redeem your YAM in exchange for treasury assets." />
      <Container>
        {account
          ? <>
            <Card>
              <CardContent>
                <Box alignItems="center" column minHeight={85}>
                  {YourYamBalance}
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
                {RedeemButton}
              </Box>
            </Box>
          </>
          : (
            <>
              <Box row justifyContent="center">
                <Button onClick={handleUnlockWalletClick} text="Unlock wallet to redeem" variant="secondary" />
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
