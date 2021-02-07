import React from "react";

import styled from "styled-components";

const BigNFT: React.FC = () => {
  return (
    <>
      <BigNFTOuterContainer>
        <BigNFTInnerContainer>
          <BigNFTNameTextContainer>
            <BigNFTLeftTextContainer>
              <BigNFTTitle>Murkemur</BigNFTTitle>
              <BigNFTSubtitle>Ruderalis</BigNFTSubtitle>
            </BigNFTLeftTextContainer>
            <BigNFTRightTextContainer>
              <Hashtag>#</Hashtag>
              <BigNFTId>75</BigNFTId>
            </BigNFTRightTextContainer>
          </BigNFTNameTextContainer>
          <DivContainer>
            <img
              width="250"
              src="https://nft-image-service.herokuapp.com/genome/11011111"
            />
          </DivContainer>
        </BigNFTInnerContainer>
        <BigNFTType>Supernova</BigNFTType>
      </BigNFTOuterContainer>
    </>
  );
};

const DivContainer = styled.div``;

const BigNFTOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BigNFTInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  padding: 1.25rem;
  border-radius: 0.3rem;
  background-color: rgba(12, 245, 164, 1);
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const BigNFTNameTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const BigNFTLeftTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgba(6, 15, 30, 1);
`;

const BigNFTTitle = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 800;
  line-height: 1.5rem;
`;

const BigNFTSubtitle = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const BigNFTRightTextContainer = styled.div`
  text-align: right;
`;

const Hashtag = styled.span`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: black;
`;

const BigNFTId = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: black;
`;

const BigNFTType = styled.div`
  width: auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.3rem;
  background-color: rgba(119, 252, 109, 1);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 800;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  text-transform: uppercase;
  margin-top: 1rem;
  color: black;
`;

export default BigNFT;
