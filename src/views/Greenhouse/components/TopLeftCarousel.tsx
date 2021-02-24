import React from "react";

import styled from "styled-components";
import arrowLeft from "../../../assets/arrowLeft.png";
import arrowRight from "../../../assets/arrowRight.png";
import arrowDown from "../../../assets/arrowDown.png";
import useStrainNfts from "hooks/useStrainNfts";
import StyledNft from "views/Common/StyledNft";

const TopLeftCarousel: React.FC = () => {

  const { strainNftCollection } = useStrainNfts();

  return (
    <>
      <CarouselOuterContainer>
        <CarouselInnerContainer>
          <CarouselControlIconsWrap>
            <CarouselControlPrevIcon src={arrowLeft} />
          </CarouselControlIconsWrap>
          <CarouselStrainsWrap>
            <DivContainer>
            {strainNftCollection.length <= 0 ?
            <NoStrainsText>Generate NFT's First</NoStrainsText> : 
            strainNftCollection
            .filter((nft,index) => index <= 3)
            .map((nft) => (
              <StyledNft key={nft.nftId} nft={nft} />
              
            ))}
            </DivContainer>
          </CarouselStrainsWrap>
          <CarouselControlIconsWrap>
            <CarouselControlNextIcon src={arrowRight} />
          </CarouselControlIconsWrap>
        </CarouselInnerContainer>
      </CarouselOuterContainer>
      <CarouselArrowDownOuterWrap>
        <CarouselArrowDownInnerWrap>
          <CarouselArrowDownIcon src={arrowDown} />
        </CarouselArrowDownInnerWrap>
      </CarouselArrowDownOuterWrap>
    </>
  );
};

const DivContainer = styled.div``;

const NoStrainsText = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 800;
  line-height: 1.5rem;
  text-align: center;
`;

const CarouselOuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CarouselInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CarouselControlIconsWrap = styled.div`
  width: 1rem;
`;

const CarouselControlPrevIcon = styled.img`
  height: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const CarouselControlNextIcon = styled.img`
  height: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const CarouselStrainsWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: auto;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const CarouselArrowDownOuterWrap = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media (min-width: 980px) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
`;

const CarouselArrowDownInnerWrap = styled.div`
  width: auto;
  margin-left: auto;
  margin-right: auto;
`;

const CarouselArrowDownIcon = styled.img``;

export default TopLeftCarousel;
