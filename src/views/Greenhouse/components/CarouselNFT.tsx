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

interface CarouselProps {
  activeParent: any;
}

const StyledNft = ({ nft, changeParent }: { nft: NftInstance, changeParent: Boolean }) => {
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
  }, [nft, onRetrieve, updatedNft]);

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
  } = useGreenhouse();

  const NFTCarousel = useMemo(() => {
    if (parentOneNftId === nft.nftId) {
      return (
        <CarouselNFTWrap>
          <img src={updatedNft?.attribs?.image} height="70px" />
          <ParentText>Parent 1</ParentText>
        </CarouselNFTWrap>
      );
    } else if (parentTwoNftId === nft.nftId) {
      return (
        <CarouselNFTWrap>
          <img src={updatedNft?.attribs?.image} height="70px" />
          <ParentText>Parent 2</ParentText>
        </CarouselNFTWrap>
      );
    } else {
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={updatedNft?.attribs?.image}
          height="70px"
          onClick={() => {
            if (!parentOneNftId) {
              setParentOneNftId(nft.nftId);
            } else if (parentOneNftId && !parentTwoNftId) {
              setParentTwoNftId(nft.nftId);
            } else if (changeParent === false) {
              setParentOneNftId(nft.nftId);
            } else if (changeParent === true) {
              setParentTwoNftId(nft.nftId);
            }
          }}
        />
      );
    }
  }, [
    nft.nftId,
    parentOneNftId,
    parentTwoNftId,
    setParentOneNftId,
    setParentTwoNftId,
    updatedNft,
  ]);

  return (
    <>
      <Spacer size="sm" />

      {NFTCarousel}
    </>
  );
};

const CarouselNFTWrap = styled.div`
  background-color: #183d69;
  border-radius: 12px;
`;

const ParentText = styled.span`
  font-size: 12px;
  padding-left: 12px;
  color: #03f190;
  font-weight: 500;
`;

export default StyledNft;
