import React, { useMemo, useState } from "react";

import styled from "styled-components";
import arrowLeft from "../../../assets/arrowLeft.png";
import arrowRight from "../../../assets/arrowRight.png";
import arrowDown from "../../../assets/arrowDown.png";
import useStrainNfts from "hooks/useStrainNfts";
import CarouselNFT from "./CarouselNFT";

import changeParentIcon from "../../../assets/changeParent.png";
import useGreenhouse from "hooks/useGreenhouse";

const TopCarousel: React.FC = () => {
  const [changeParent, setChangeParent] = useState<Boolean>(false);

  const { strainNftCollection } = useStrainNfts();

  const { parentOneNftId, parentTwoNftId } = useGreenhouse();

  const ChangeParentOne = useMemo(() => {
    if (changeParent === false) {
      return (
        <ChangeParentContainer>
          <ChangeParentIcons
            src={changeParentIcon}
            alt="changeParentIcon"
            onClick={() => {
              setChangeParent(false);
            }}
          />
        </ChangeParentContainer>
      );
    } else {
      return (
        <ChangeParentIcons
          src={changeParentIcon}
          alt="changeParentIcon"
          onClick={() => {
            setChangeParent(false);
          }}
        />
      );
    }
  }, [changeParent]);

  const ChangeParentTwo = useMemo(() => {
    if (changeParent === true) {
      return (
        <ChangeParentContainer>
          <ChangeParentIcons
            src={changeParentIcon}
            alt="changeParentIcon"
            onClick={() => {
              setChangeParent(true);
            }}
          />
        </ChangeParentContainer>
      );
    } else {
      return (
        <ChangeParentIcons
          src={changeParentIcon}
          alt="changeParentIcon"
          onClick={() => {
            setChangeParent(true);
          }}
        />
      );
    }
  }, [changeParent]);

  return (
    <>
      {strainNftCollection.length > 0 ? (
        <CarouselDiv>
            {parentOneNftId && parentTwoNftId ? ChangeParentOne : null}
          <StyledText>Select Strains</StyledText>
            {parentOneNftId && parentTwoNftId ? ChangeParentTwo : null}
        </CarouselDiv>
      ) : null}
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
                  <CarouselNFT
                    key={nft.nftId}
                    nft={nft}
                    changeParent={changeParent}
                  />
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
  font-size: 1.1rem;
  line-height: 1.75rem;
  font-weight: 800;
  line-height: 1.5rem;
  text-align: center;
  padding: 0 16px 1rem 16px;
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
  padding-bottom: 25px;
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
  width: 360px;
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
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
`;

const CarouselArrowDownInnerWrap = styled.div`
  width: auto;
  margin-left: auto;
  margin-right: auto;
`;

const CarouselArrowDownIcon = styled.img``;

const ChangeParentIcons = styled.img`
  height: 30px;
  cursor: pointer;
`;

const ChangeParentContainer = styled.div`
  background-color: #183d69;
  border-radius: 16px;
  padding: 3px;
`;

export default TopCarousel;
