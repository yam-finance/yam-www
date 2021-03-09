import useGreenhouse from "hooks/useGreenhouse";
import React from "react";

import blankStrainNFT from '../../../assets/shadyStrainNFT.png'
import StyledNft from '../../Common/StyledNft';
import styled from 'styled-components'
import { DEFAULT_NFT_SIZE } from 'constants/poolValues'
import useStrainNfts from "hooks/useStrainNfts";

const ParentNFT = ({ nftId }: { nftId: string}) => {

  const { strainNftCollection, findNftById } = useStrainNfts();

  console.log(strainNftCollection)
  const nft = findNftById(nftId);
  
  return (
    <>
      {nft ? <StyledNft key={nftId} nft={nft} /> :
      (
      <NFTCard>
        <StyledImage>
          <img src={blankStrainNFT} alt="Blank Strain NFT" height={DEFAULT_NFT_SIZE} />
        </StyledImage>
      </NFTCard>
        )}
    </>
  );
};

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
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
`;

const StyledImage = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default ParentNFT;
