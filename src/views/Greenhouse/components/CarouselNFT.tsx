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
// import StyledPrimaryButton from "./StyledButton";
import AdditionalStakeModal from "views/Modals/AdditionalStakeModal";
import useBalances from "hooks/useBalances";
import useGreenhouse from "hooks/useGreenhouse";

const StyledNft = ({ nft }: { nft: NftInstance }) => {
  const [isNftLoading, setIsNftLoading] = useState(false);
  const [updatedNft, setUpdatedNft] = useState<NftInstance>();

  const { onRetrieve } = useStrainNfts();

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

  const getName = () => {
    if (!nft) return "-";
    if (nft?.nftName) return nft?.nftName;
    return updatedNft?.attribs?.name;
  };

  const getAttribute = (name: string): string => {
    if (!updatedNft) return "-";
    const attributes = updatedNft?.attribs?.attributes;
    if (!attributes) return "-";
    const found = attributes.find((a) => a.trait_type === name);
    if (!found) return "-";
    return found.value;
  };

  const {
    parentOneNftId,
    setParentOneNftId,
    parentTwoNftId,
    setParentTwoNftId,
    // childName,
    // setChildName,
  } = useGreenhouse();

  return (
    <>
      <Spacer size="sm" />
      <img
        src={updatedNft?.attribs?.image}
        height="75px"
        onClick={() => {
          if (!parentOneNftId) {
            setParentOneNftId(nft.nftId);
          } else if (!parentTwoNftId) {
            setParentTwoNftId(nft.nftId);
          }
        }}
      />

      <Spacer size="sm" />
    </>
  );
};

export default StyledNft;
