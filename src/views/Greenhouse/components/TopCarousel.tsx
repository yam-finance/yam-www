import React from "react";

import styled from "styled-components";
import arrowLeft from "../../../assets/arrowLeft.png";
import arrowRight from "../../../assets/arrowRight.png";
import arrowDown from "../../../assets/arrowDown.png";

const AsideContainer: React.FC = () => {
  return (
    <>
      <CarouselOuterContainer>
        <CarouselInnerContainer>
          <CarouselControlIconsWrap>
            <CarouselControlPrevIcon src={arrowLeft} />
          </CarouselControlIconsWrap>
          <CarouselStrainsWrap>
            <DivContainer>
              <img
                src="https://nft-image-service.herokuapp.com/genome/10411111"
                alt=""
                style={{ width: "72px" }}
              />
            </DivContainer>
            <DivContainer>
              <img
                src="https://nft-image-service.herokuapp.com/genome/11411111"
                alt=""
                style={{ width: "72px" }}
              />
            </DivContainer>
            <DivContainer>
              <img
                src="https://nft-image-service.herokuapp.com/genome/12411111"
                alt=""
                style={{ width: "72px" }}
              />
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

export default AsideContainer;
