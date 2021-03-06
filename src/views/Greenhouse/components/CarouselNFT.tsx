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
// import StyledPrimaryButton from "./StyledButton";
import AdditionalStakeModal from "views/Modals/AdditionalStakeModal";
import useBalances from "hooks/useBalances";
import useGreenhouse from "hooks/useGreenhouse";

const StyledNft = ({ nft }: { nft: NftInstance }) => {
  const [isNftLoading, setIsNftLoading] = useState(false);
  const [updatedNft, setUpdatedNft] = useState<NftInstance>();

  const {
    onRetrieve,
  } = useStrainNfts();

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
  }, [nft.nftId, updatedNft]);


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

  const greenRoundedStyle = {
    content: {
      backgroundColor: "hsl(215deg 70.4% 33.1% / 100%)",
      color: "#FFFFFF",
      fontWeight: 600,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: "1.2rem",
      paddingLeft: "1.3rem",
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
            <Tooltip
                styles={greenRoundedStyle}
                content={
                  `Click to Select your NFT ${nft.nftName}`
                }
              >
            <img src={updatedNft?.attribs?.image} height="75px" onClick={() => {
              if (!parentOneNftId) {
                setParentOneNftId(nft.nftId)
              } else if (!parentTwoNftId) {
                setParentTwoNftId(nft.nftId)
              }
            }} />
            </Tooltip>
            <Spacer size="sm" />
          </>
  );
};



export default StyledNft;
