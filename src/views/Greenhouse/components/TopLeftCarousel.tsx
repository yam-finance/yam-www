import React from "react";

import styled from "styled-components";
import arrowLeft from "../../../assets/arrowLeft.png";
import arrowRight from "../../../assets/arrowRight.png";
import arrowDown from "../../../assets/arrowDown.png";
import useStrainNfts from "hooks/useStrainNfts";
import CarouselNFT from "./CarouselNFT";

const TopLeftCarousel: React.FC = () => {
  const { strainNftCollection } = useStrainNfts();

  return (
    <>
      {/* {strainNftCollection.length < 0 ? (
        <CarouselDiv>
          <StyledText>Select The First Big NFT</StyledText>
        </CarouselDiv>
      ) : null} */}
      <CarouselOuterContainer>
        <CarouselInnerContainer>
          <CarouselControlIconsWrap>
            <CarouselControlPrevIcon src={arrowLeft} />
          </CarouselControlIconsWrap>
          <CarouselStrainsWrap>
            <CarouselNftContainer>
              {strainNftCollection.length <= 0 ? (
                <NoStrainsText>Generate NFT's First</NoStrainsText>
              ) : (
                strainNftCollection.map((nft) => (
                  <CarouselNFT key={nft.nftId} nft={nft} />
                ))
              )}
            </CarouselNftContainer>
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

const CarouselNftContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const NoStrainsText = styled.div`
  font-size: 1.4rem;
  line-height: 1.75rem;
  font-weight: 800;
  line-height: 1.5rem;
  text-align: center;
`;

const StyledText = styled.div`
  font-size: 0.9rem;
  line-height: 1.75rem;
  font-weight: 800;
  line-height: 1.5rem;
  text-align: center;
  padding-bottom: 1.3rem;
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
`;

const CarouselControlNextIcon = styled.img`
  height: 1rem;
`;

const CarouselStrainsWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 260px;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  padding-bottom: 1.4rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 0.6rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #00ac69;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #183d69;
    border-radius: 20px;
  }
`;

const CarouselDiv = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
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
