import React, { useCallback, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Container,
  Spacer,
} from "react-neu";
import { useWallet } from "use-wallet";

import Label from "components/Label";
import Value from "components/Value";

import useFarming from "hooks/useFarming";

import StakeModal from "views/Modals/StakeModal";
import UnstakeModal from "views/Modals/UnstakeModal";
import styled from "styled-components";
import useApproval from "hooks/useApproval";
import useBalances from "hooks/useBalances";
import SplitRow from "components/SplitRow";
import { StyledSubtitle } from "components/PageHeader/PageHeader";
import { getItemValue } from "utils";

const Stake: React.FC<{
  poolId: string;
  lpEmoji?: string;
  lpLabel: string;
  lpImage?: string;
}> = ({ poolId, lpEmoji, lpImage, lpLabel }) => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false);
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false);
  const { status } = useWallet();
  const {
    getPoolLPAddress,
    setConfirmTxModalIsOpen,
    isStaking,
    isUnstaking,
    onStake,
    onUnstake,
    getIncentivizerAddress,
  } = useFarming();

  const {
    strnEthLpBalance,
    strnXiotLpBalance,
    strnEthLpPoolBalance,
    strnXiotLpPoolBalance,
  } = useBalances();

  // need better way to get pool specific data
  const sigDigits = poolId === "0" ? 2 : 8;
  const poolBalance = useMemo(() => {
    // need better way to get specific pool balance
    return poolId === "0" ? strnEthLpPoolBalance : strnXiotLpPoolBalance;
  }, [strnEthLpPoolBalance, strnXiotLpPoolBalance]);

  const walletBalance = useMemo(() => {
    // need better way to get specific pool balance
    return poolId === "0" ? strnEthLpBalance : strnXiotLpBalance;
  }, [strnEthLpBalance, strnXiotLpBalance]);

  const { isApproved, isApproving, onApprove } = useApproval(
    getPoolLPAddress(poolId),
    getIncentivizerAddress(poolId),
    () => setConfirmTxModalIsOpen(false)
  );

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true);
    onApprove();
  }, [onApprove, setConfirmTxModalIsOpen]);

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false);
  }, [setStakeModalIsOpen]);

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false);
  }, [setUnstakeModalIsOpen]);

  const handleOnStake = useCallback(
    (amount: string) => {
      onStake(poolId, amount);
      handleDismissStakeModal();
    },
    [handleDismissStakeModal, onStake]
  );

  const handleOnUnstake = useCallback(
    (amount: string) => {
      onUnstake(poolId, amount);
      handleDismissUnstakeModal();
    },
    [handleDismissUnstakeModal, onUnstake]
  );

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true);
  }, [setStakeModalIsOpen]);

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true);
  }, [setUnstakeModalIsOpen]);

  const StakeButton = useMemo(() => {
    if (status !== "connected") {
      return <Button disabled full text="Stake" variant="secondary" />;
    }
    if (getItemValue(isStaking, poolId)) {
      return <Button disabled full text="Staking..." variant="secondary" />;
    }
    if (!isApproved) {
      // disable staking
      return (
        <Button
          disabled
          full
          onClick={handleApprove}
          text={!isApproving ? "Approve staking" : "Approving staking..."}
          variant={
            isApproving || status !== "connected" ? "secondary" : "default"
          }
        />
      );
    }

    if (isApproved) {
      return <Button disabled full onClick={handleStakeClick} text="Stake" />;
    }
  }, [handleStakeClick, isApproving, isStaking, handleApprove, status]);

  const UnstakeButton = useMemo(() => {
    const hasStaked = poolBalance && poolBalance.toNumber() > 0;
    if (status !== "connected" || !hasStaked) {
      return <Button disabled full text="Unstake" variant="secondary" />;
    }
    if (getItemValue(isUnstaking, poolId)) {
      return <Button disabled full text="Unstaking..." variant="secondary" />;
    }
    return (
      <Button
        full
        disabled
        onClick={handleUnstakeClick}
        text="Unstake"
        variant="secondary"
      />
    );
  }, [handleUnstakeClick, isApproving, isUnstaking, handleApprove, status]);

  const formattedStakedBalance = useMemo(() => {
    if (poolBalance) {
      return poolBalance.gt(0) ? poolBalance.toFixed(sigDigits) : "0.00";
    } else {
      return "--";
    }
  }, [poolBalance]);

  const formattedWalletBalance = useMemo(() => {
    if (walletBalance) {
      return walletBalance.gt(0) ? walletBalance.toFixed(sigDigits) : "0.00";
    } else {
      return "--";
    }
  }, [walletBalance]);

  const StyledImage = styled.img`
    display: block;
    width: "50px";
  `;

  return (
    <>
      <Card>
        <Container size="sm">
          <Spacer />
          <StyledSubtitle>{`${lpLabel} LP `}</StyledSubtitle>
        </Container>
        <CardIcon>
          {lpEmoji ? (
            lpEmoji
          ) : (
            <StyledImage src={require(`../../../../assets/${lpImage}`)} />
          )}
        </CardIcon>
        <CardContent>
          <Box alignItems="center" row>
            <SplitRow>
              <>
                <Value value={formattedStakedBalance} />
                <Label text={`Staked`} />
              </>
              <>
                <Value value={formattedWalletBalance} />
                <Label text={`Wallet`} />
              </>
            </SplitRow>
          </Box>
        </CardContent>
        <CardActions>
          {UnstakeButton}
          {StakeButton}
        </CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
        label={`${lpLabel} UNI-V2 LP`}
        fullBalance={walletBalance}
      />
      <UnstakeModal
        isOpen={unstakeModalIsOpen}
        onDismiss={handleDismissUnstakeModal}
        onUnstake={handleOnUnstake}
        label={`${lpLabel} UNI-V2 LP`}
        fullBalance={poolBalance}
      />
    </>
  );
};

export default Stake;
