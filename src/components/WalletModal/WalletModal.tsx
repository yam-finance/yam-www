import React, { useCallback, useState, useEffect, useMemo } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import numeral from "numeral";
import { Box, Button, Modal, ModalContent, ModalProps, ModalTitle, Separator, Spacer } from "react-neu";
import FancyValue from "components/FancyValue";
import Split from "components/Split";
import useBalances from "hooks/useBalances";
import useVesting from "hooks/useVesting";
import AddressButton from "components/AddressButton";
import styled from "styled-components";

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const { account, reset } = useWallet();

  const { isClaiming, onClaim, vestedDelegatorRewardBalance, vestedMigratedBalance, vestedBalance } = useVesting();

  const getDisplayBalance = useCallback((value?: any) => {
    if (value) {
      return numeral(value).format("0.00a");
    } else {
      return "--";
    }
  }, []);


  const ClaimButton = useMemo(() => {
    const hasVestedYams = vestedBalance && vestedBalance.toNumber() > 0;
    if (isClaiming) {
      return <Button disabled full text="Claiming..." variant="secondary" />;
    }
    if (hasVestedYams) {
      return <Button full onClick={onClaim} text="Claim YAMs" />;
    }
    return <Button disabled full text="Claim" variant="secondary" />;
  }, [isClaiming, onClaim, vestedBalance]);


  const handleSignOut = useCallback(() => {
    localStorage.removeItem("account");
    localStorage.removeItem("walletProvider");
    setWalletModalIsOpen(false);
    reset();
    if (onDismiss) {
      onDismiss();
    }
  }, [reset]);

  useEffect(() => {
    isOpen = !isOpen;
  }, [setWalletModalIsOpen]);

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalTitle text="My Wallet" />
      <ModalContent>
        <StyledText>{account}</StyledText>
        {/* <AddressButton
          address={account?.toString().toLowerCase()}
          uniswap={false}
        /> */}
        <Spacer />
      </ModalContent>

      <Separator />
      <Box justifyContent="space-between" alignItems="center" height={96} row paddingHorizontal={4}>
        <Button onClick={onDismiss} to="/user" text="User page" variant="secondary" />
        <Box row justifyContent="flex-end" alignItems="center">
          <Button onClick={onDismiss} text="Cancel" variant="secondary" />
          <Spacer />
          <Button onClick={handleSignOut} text="Sign Out" />
        </Box>
      </Box>
    </Modal>
  );
};

const StyledText = styled.div`
  font-size: 18px;
  text-align: center;
`;

export default WalletModal;
