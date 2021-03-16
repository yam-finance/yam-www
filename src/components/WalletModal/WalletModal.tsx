import React, { useCallback, useState, useEffect, useMemo } from "react";

import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";

import numeral from "numeral";
import { Box, Button, Modal, ModalContent, ModalProps, ModalTitle, Separator, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";
import Split from "components/Split";

import useBalances from "hooks/useBalances";
import useVesting from "hooks/useVesting";

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const { reset } = useWallet();
  const { yamV2Balance, yamV3Balance } = useBalances();

  const { isClaiming, onClaim, vestedDelegatorRewardBalance, vestedMigratedBalance, vestedBalance } = useVesting();

  const getDisplayBalance = useCallback((value?: BigNumber) => {
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
        <Split>
          <Box row>
            <FancyValue icon="🍠" label="YAM balance" value={getDisplayBalance(yamV3Balance)} />
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
      </ModalContent>
      <Separator />
      <Box justifyContent="space-between" alignItems="center" height={96} row paddingHorizontal={4}>
        <Box>{ClaimButton}</Box>
        <Box row justifyContent="flex-end" alignItems="center">
          <Button onClick={onDismiss} text="Cancel" variant="secondary" />
          <Spacer />
          <Button onClick={handleSignOut} text="Sign Out" />
        </Box>
      </Box>
    </Modal>
  );
};

export default WalletModal;
