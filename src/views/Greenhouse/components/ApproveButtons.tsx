import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Spacer } from "react-neu";

import styled from "styled-components";
import useApproval from "hooks/useApproval";
import { getAddresses } from "constants/tokenAddresses";
import useStrainNfts from "hooks/useStrainNfts";
import { useWallet } from "use-wallet";
import {
  MIN_LP_AMOUNTS,
  MIN_LP_AMOUNTS_DISPLAY,
  MIN_STRN_GEN_VALUE,
  PoolIds,
  POOL_NAMES,
} from "constants/poolValues";
import NamedGeneratingModal from "views/Modals/NamedGeneratingModal";
import BigNumber from "bignumber.js";
import numeral from "numeral";
import Label from "components/Label";
import StyledPrimaryButton from "views/Common/StyledButton";
import useBalances from "hooks/useBalances";

const GenerateNftButton = ({
  poolId,
  walletBalance,
}: {
  poolId: string;
  walletBalance?: BigNumber;
}) => {
  const [generateModalIsOpen, setGenerateModalIsOpen] = useState(false);
  const [canGenerate, setCanGenerate] = useState(false);

  const { setConfirmTxModalIsOpen, isCreating, onCreateNft } = useStrainNfts();

  const { strnTokenBalance } = useBalances();

  const { status } = useWallet();

  const poolName = useMemo(() => POOL_NAMES[Number(poolId)], [poolId]);
  const minAmountLpTokens = useMemo(() => MIN_LP_AMOUNTS[Number(poolId)], [
    poolId,
  ]);

  const getLpTokenAddress = () => {
    if (poolId === PoolIds.STRN_ETH) return getAddresses().strnLPTokenAddress;
    return getAddresses().strnXiotLPTokenAddress;
  };

  const {
    isApproved,
    isApproving,
    onApprove,
  } = useApproval(
    getLpTokenAddress(),
    getAddresses().strainNFTCrafterAddress,
    () => setConfirmTxModalIsOpen(false)
  );

  const {
    isApproved: isApprovedStrn,
    isApproving: isApprovingStrn,
    onApprove: onApproveStrn,
  } = useApproval(
    getAddresses().strnTokenAddress,
    getAddresses().strainNFTCrafterAddress,
    () => setConfirmTxModalIsOpen(false)
  );

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true);
    onApprove();
  }, [onApprove, setConfirmTxModalIsOpen]);

  const handleApproveStrn = useCallback(() => {
    setConfirmTxModalIsOpen(true);
    onApproveStrn();
  }, [onApprove, setConfirmTxModalIsOpen]);
  const handleGenerateClick = useCallback(() => {
    setGenerateModalIsOpen(true);
  }, [setGenerateModalIsOpen]);

  const handleOnGenerate = (amount: string, name: string) => {
    onCreateNft(poolId, amount, name);
    handleDismissGenerateModal();
  };

  const handleDismissGenerateModal = useCallback(() => {
    setGenerateModalIsOpen(false);
  }, [setGenerateModalIsOpen]);

  useEffect(() => {
    const hasEnoughStrn = strnTokenBalance
      ? strnTokenBalance?.gte(MIN_STRN_GEN_VALUE)
      : false;
    if (!minAmountLpTokens || !walletBalance || !hasEnoughStrn) {
      setCanGenerate(false);
    } else if (
      walletBalance &&
      new BigNumber(walletBalance).gte(new BigNumber(minAmountLpTokens))
    ) {
      setCanGenerate(true);
    }
  }, [walletBalance, poolId, strnTokenBalance]);

  const formattedLPBalance = useMemo(() => {
    if (walletBalance) {
      return poolId === PoolIds.STRN_ETH
        ? numeral(walletBalance).format("0.00a")
        : walletBalance.toFixed(8);
    } else {
      return "--";
    }
  }, [walletBalance, poolId]);

  const GenerateButton = useMemo(() => {
    if (status !== "connected") {
      return (
        <>
          <StyledPrimaryButton
            disabled
            full
            text={"Not Connected"}
            variant="secondary"
          />
        </>
      );
    }
    if (walletBalance === undefined) {
      return (
        <>
          <StyledPrimaryButton
            disabled
            full
            text="Loading ..."
            variant="secondary"
          />
        </>
      );
    }

    if (!canGenerate) {
      return (
        <>
          <Spacer size={"sm"} />
          <StyledPrimaryButton
            disabled
            full
            text="Insufficient LP or STRN balance"
            variant="secondary"
          />
        </>
      );
    }

    if (isCreating) {
      return (
        <>
          <StyledPrimaryButton
            disabled
            full
            text="Generating..."
            variant="secondary"
          />
        </>
      );
    }

    if (!isApproved || !isApprovedStrn) {
      // disable generation
      return (
        <StyledButtonRow>
          <StyledPrimaryButton
            onClick={handleApprove}
            disabled={isApproved}
            full
            size={"sm"}
            text={
              isApproving
                ? "Approving ..."
                : !isApproved
                ? "Approve Generating"
                : "Approved"
            }
            variant={
              isApproving || status !== "connected" ? "secondary" : "default"
            }
          />
          <StyledPrimaryButton
            onClick={handleApproveStrn}
            disabled={isApprovedStrn}
            full
            size={"sm"}
            text={
              isApprovingStrn
                ? "Approving ..."
                : !isApprovedStrn
                ? "Approve STRN Fee"
                : "Approved"
            }
            variant={
              isApprovingStrn || status !== "connected"
                ? "secondary"
                : "default"
            }
          />
        </StyledButtonRow>
      );
    }

    if (isApproved && isApprovedStrn) {
      return (
        <>
          {canGenerate && (
            <>
              <StyledPrimaryButton
                full
                onClick={handleGenerateClick}
                text={`wrap ${poolName} LP`}
              />
            </>
          )}
        </>
      );
    }
  }, [
    handleGenerateClick,
    isApproved,
    isApproving,
    isApprovedStrn,
    isApprovingStrn,
    isApprovedStrn,
    isCreating,
    handleApprove,
    status,
  ]);

  return (
    <>
      {status !== "connected" && <Spacer size="sm" />}
      <div>
        {poolName} LP: <StyledValue>{formattedLPBalance}</StyledValue>
      </div>
      <Label
        text={`Min: ${String(
          MIN_LP_AMOUNTS_DISPLAY[Number(poolId)]
        )} ${poolName} LP`}
      />
      <Spacer size="sm" />

      {GenerateButton}

      <NamedGeneratingModal
        isOpen={generateModalIsOpen}
        onDismiss={handleDismissGenerateModal}
        onGenerate={handleOnGenerate}
        label={poolName}
        fullBalance={walletBalance}
        minAmount={minAmountLpTokens}
        poolId={poolId}
      />
    </>
  );
};

const StyledValue = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const StyledButtonRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  > div {
    margin: 0 0.25rem;
  }
`;

export default GenerateNftButton;
