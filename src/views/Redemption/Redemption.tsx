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
import Web3 from "web3";
import { provider, TransactionReceipt } from "web3-core";
import { AbiItem, isAddress, toChecksumAddress } from "web3-utils";
import { waitTransaction } from "../../utils/index";

const Redemption: React.FC = () => {
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const { account, ethereum, status } = useWallet();
  const { yamContract, redeemerContract, yamBalanceOf, yamBalance } = useSDK();
  const redeemerAddress = "0x54D9Ec9E1246F56A1ccbDE0B6fFd76Eb129fFCAA"
  const yamAddress = "0x0AaCfbeC6a24756c20D41914F2caba817C0d8521"
  const { isApproved, isApproving, onApprove } = useApproval(yamAddress, redeemerAddress, () => console.log("here"));


  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);

  const redeemClick = useCallback(async () => {
    const yamAmount = yamBalanceOf;
    const web3 = new Web3(ethereum);
    const redeemerContract2 = new web3.eth.Contract(
      (redeemerContract.abis.redeemer.abi as unknown) as AbiItem,
      redeemerAddress
    );
    try {
      setIsRedeeming(true);
      const redeem = await redeemerContract2.methods
        .redeem(account, yamAmount)
        .send(
          { from: account },
          async (error: any, txHash: string) => {
            setIsRedeeming(false);
            if (error) {
              console.log("Some error occurred:", error);
              return false;
            }
            const status = await waitTransaction(ethereum, txHash);
            if (!status) {
              console.log("Redeem transaction failed.");
              return false;
            }
            return true;
          }
        );
    } catch (e) {
      console.log("error", e);
      setIsRedeeming(false);
      return false;
    }
  }, [setIsRedeeming, yamBalanceOf, account, status]);

  const approveClick = useCallback(async () => {
    console.log("approve");
    console.log(yamAddress, redeemerAddress)
    onApprove()
  }, [onApprove]);
  
  const RedeemButton = useMemo(() => {
    if (!yamBalance) {
      return <Button disabled text="Redeem" />
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={approveClick}
          text={!isApproving ? "Approve Redeemer" : "Approving Redeemer..."}
          variant={isApproving || status !== "connected" ? "secondary" : "default"}
        />
      );
    }
    if (isApproved) {
      return <Button
        disabled={!yamBalance || isRedeeming }
        onClick={redeemClick}
        text={!isRedeeming ? "Redeem" : "Redeeming Yam..."}
        variant={isRedeeming || status !== "connected" ? "secondary" : "default"}
      />;
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
