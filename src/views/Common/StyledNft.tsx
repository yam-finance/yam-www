import {
  attributeNames,
  NftInstance,
  DEFAULT_NFT_SIZE,
  POOL_NAMES,
  PoolIds,
  ENABLE_BURN_REWARDS_AMOUNT,
} from "constants/poolValues";
import useStrainNfts from "hooks/useStrainNfts";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Spacer } from "react-neu";
import numeral from "numeral";
import styled from "styled-components";
import { Tooltip } from "react-lightweight-tooltip";
import StyledPrimaryButton from "./StyledButton";
import AdditionalStakeModal from "views/Modals/AdditionalStakeModal";
import useBalances from "hooks/useBalances";

const StyledNft = ({ nft, isDispensary = false}: { nft: NftInstance, isDispensary?: Boolean }) => {
  const [isNftLoading, setIsNftLoading] = useState(false);
  const [updatedNft, setUpdatedNft] = useState<NftInstance>();
  const [canBurn, setCanBurn] = useState<boolean>(false);
  const [addStakeModalIsOpen, setAddStakeModalIsOpen] = useState<boolean>(
    false
  );

  const {
    onRetrieve,
    onDestroyNft,
    earnedStrnBalance,
    isAdding,
    onAddNftStake,
  } = useStrainNfts();

  const { strnEthLpBalance, strnXiotLpBalance } = useBalances();

  const poolName = useMemo(() => POOL_NAMES[Number(nft?.poolId)], [
    nft?.poolId,
  ]);

  useEffect(() => {
    if (nft && !updatedNft) {
      setIsNftLoading(true);
      onRetrieve(nft)
        .then((updated: NftInstance) => {
          setUpdatedNft(updated);
          setIsNftLoading(false);
        })
        .catch((e: Error) => {
          console.error(e);
          setIsNftLoading(false);
        });
    }
  }, [nft?.nftId, updatedNft]);

  useEffect(() => {
    if (earnedStrnBalance === undefined) return setCanBurn(false);
    setCanBurn(earnedStrnBalance.lte(ENABLE_BURN_REWARDS_AMOUNT));
  }, [earnedStrnBalance]);

  const getAttribute = (name: string): string => {
    if (!updatedNft) return "-";
    const attributes = updatedNft?.attribs?.attributes;
    if (!attributes) return "-";
    const found = attributes.find((a) => a.trait_type === name);
    if (!found) return "-";
    return found.value;
  };

  const getName = () => {
    if (!nft) return "-";
    if (nft?.nftName) return nft?.nftName;
    return updatedNft?.attribs?.name;
  };

  const handelUnstake = () => {
    if (!nft?.poolId) {
      console.error("for some reason the nft doesn't have a pool id");
      return;
    }
    onDestroyNft(nft.poolId, nft);
  };

  const handleAddStakeClick = useCallback(() => {
    setAddStakeModalIsOpen(true);
  }, [setAddStakeModalIsOpen]);

  const handleDismissStakeModal = useCallback(() => {
    setAddStakeModalIsOpen(false);
  }, [setAddStakeModalIsOpen]);

  const handleOnAdditionalStake = useCallback(
    (amount: string, stxpAmount: string) => {
      const poolId = nft?.poolId || "0"; // assume pool 0, nft?.poolId should always be populated
      onAddNftStake(poolId, nft.nftId, amount, stxpAmount);
      handleDismissStakeModal();
    },
    [handleDismissStakeModal, onAddNftStake]
  );

  const walletBalance = useMemo(() => {
    // need better way to get specific pool balance
    return nft.poolId === "0" ? strnEthLpBalance : strnXiotLpBalance;
  }, [strnEthLpBalance, strnXiotLpBalance]);

  const formattedLPBalance = useMemo(() => {
    if (nft && nft?.lpBalance) {
      if (PoolIds.STRN_ETH === nft.poolId)
        return numeral(nft.lpBalance).format("0.00a");
      else return nft.lpBalance.toFixed(8);
    } else {
      return "--";
    }
  }, [nft]);

  const greenRoundedStyle = {
    content: {
      backgroundColor: "hsl(215deg 70.4% 33.1% / 100%)",
      color: "#FFFFFF",
      fontWeight: 600,
    },
    wrapper: {},
    gap: {},
    tooltip: {
      backgroundColor: "hsl(215deg 70.4% 33.1% / 100%)",
      borderRadius: "10px",
    },
    arrow: {
      borderTop: "solid hsl(215deg 70.4% 33.1% / 100%) 5px",
    },
  };

  return (
    <>
      <NFTCard>
        {!isNftLoading && (
          <>
            <StyledHeader>
              <StyledTitle>{getName()}</StyledTitle>
              <h3>#{getAttribute(attributeNames.MINTED)}</h3>
            </StyledHeader>
            <h4>{getAttribute(attributeNames.VIBES)}</h4>
            <Spacer size="sm" />
            <img src={updatedNft?.attribs?.image} height={DEFAULT_NFT_SIZE} />
            <Spacer size="sm" />
            <RarityPill>{getAttribute(attributeNames.RARITY)}</RarityPill>
            <StyledInfo>
              <Tooltip
                styles={greenRoundedStyle}
                content={
                  isDispensary ? `Buy / Sell Your NFT ${nft.nftName}` : !canBurn
                    ? "In order to burn your NFT, you must first claim your rewards."
                    : "Burning will release your LP tokens"
                }
              >
                {isDispensary ? <StyledPrimaryButton
                  // onClick={}
                  // disabled={}
                  text={
                    "Buy for 2 ETH"
                  }
                  size="sm"
                /> : <StyledPrimaryButton
                  onClick={handelUnstake}
                  disabled={nft.isDestroying || !canBurn}
                  text={
                    !canBurn
                      ? "Claim first (i)"
                      : nft.isDestroying
                      ? "Burning ..."
                      : "Burn"
                  }
                  size="sm"
                />}
              </Tooltip>
              <StyledLabels>
                <StyledLpLabel>
                  <div>{poolName}</div>
                  <StyledValue>
                    {nft?.lpBalance ? formattedLPBalance : "-"}
                  </StyledValue>
                </StyledLpLabel>
                {isDispensary ? null : <StyledPrimaryButton
                  text={isAdding ? "..." : "+"}
                  onClick={handleAddStakeClick}
                  size={"sm"}
                />}
              </StyledLabels>
            </StyledInfo>
          </>
        )}
        {isNftLoading && <StyledLoading>Loading ...</StyledLoading>}
      </NFTCard>
      <AdditionalStakeModal
        isOpen={addStakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onAddStake={handleOnAdditionalStake}
        label={`${getAttribute(attributeNames.LP_TYPE)} UNI-V2 LP`}
        fullBalance={walletBalance}
      />
      <Spacer size="md" />
    </>
  );
};

const StyledLpLabel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 0.5rem;
`;

const StyledHeader = styled.div`
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.h3`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NFTCard = styled.div`
  display: flex;
  flex-flow: column;
  width: 300px;
  max-height: 450px;
  background-color: #0e2b52;
  border-radius: 20px;
  color: white;
  text-align: center;
  display: inline-block !important;
  margin: 1rem;
`;
const RarityPill = styled.button`
  width: 100px;
  height: 26px;
  background-color: #7af7b6;
  border: 0;
  border-radius: 6px;
  font-family: Gopher;
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;

const StyledLabels = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  > div {
    width: unset;
  }
`;

const StyledValue = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export default StyledNft;
