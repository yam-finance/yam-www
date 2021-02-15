import React from "react";

import styled from "styled-components";

const Breed: React.FC = () => {
  return (
    <DivContainer>
      <BetweenCardsOuterContainer>
        <BetweenCardsInnerContainer>
          <BurnSTXPContainer>
            <MidContainerTitle>Burn STXP</MidContainerTitle>
            <BurnSTXPSubtitle>Increase chance of rarity</BurnSTXPSubtitle>
            <AproveButtonContainer>
              <AproveButton>Aprove STXP</AproveButton>
            </AproveButtonContainer>
            <AproveButtonContainer>
              <AproveButton>Aprove STRN</AproveButton>
            </AproveButtonContainer>
            <AproveButtonContainer>
              <AproveButton>Aprove LP</AproveButton>
            </AproveButtonContainer>
          </BurnSTXPContainer>
          <InputContainer>
            <MidContainerTitle>LP amount</MidContainerTitle>
            <DivContainer>
              <InputForm />
            </DivContainer>
          </InputContainer>
          <InputContainer>
            <MidContainerTitle>STXP amount</MidContainerTitle>
            <DivContainer>
              <InputForm />
            </DivContainer>
            <STRNFeeLabel>420 STRN Fee</STRNFeeLabel>
          </InputContainer>
          <DivContainer>
            <BreedButtonContainer>
              <BreedButton>Breed</BreedButton>
            </BreedButtonContainer>
          </DivContainer>
        </BetweenCardsInnerContainer>
      </BetweenCardsOuterContainer>
    </DivContainer>
  );
};

const BetweenCardsOuterContainer = styled.div`
  align-self: flex-end;
  padding: 60px;
  @media (min-width: 980px) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 1040px) {
    padding: 30px;
  }
`;

const DivContainer = styled.div``;

const BetweenCardsInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BurnSTXPContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-top: 2rem;

  @media (min-width: 980px) {
    margin-top: 0;
  }
`;

const MidContainerTitle = styled.div`
  line-height: 1rem;
  padding-bottom: 0.25rem;
  font-weight: 700;
`;

const BurnSTXPSubtitle = styled.div`
  line-height: 1rem;
  font-weight: 300;
`;

const AproveButtonContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const AproveButton = styled.a`
  display: block;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.375rem;
  background-color: #00ac69;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-align: center;
  --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  color: #121013;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  @media (min-width: 980px) {
    margin-bottom: 3rem;
  }
`;

const InputForm = styled.input`
  /* width: 100%; */
  border-radius: 0.25rem;
  background-color: rgba(6, 15, 30, 1);
  color: rgba(119, 252, 109, 1);
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 200;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: rgba(18, 49, 96, 1);
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const STRNFeeLabel = styled.div`
  text-align: right;
  color: rgba(229, 229, 229, 1);
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-right: 0.25rem;
`;

const BreedButtonContainer = styled.div`
  visibility: hidden;
  width: 100%;

  @media (min-width: 980px) {
    visibility: visible;
  }
`;

const BreedButton = styled.a`
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 0.5rem;
  background-color: #00ac69;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  color: #121013;
  cursor: pointer;

  &:hover {
    background-color: white;
  }

  @media (min-width: 980px) {
    display: block;
  }
`;

export default Breed;
