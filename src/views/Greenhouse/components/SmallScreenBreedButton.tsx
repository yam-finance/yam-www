import React from "react";

import styled from "styled-components";

const SmallScreenBreedButton: React.FC = () => {
  return (
    <DivContainer>
      <ButtonContainer>
        <BreedButtonSmallScreen>Breed</BreedButtonSmallScreen>
      </ButtonContainer>
    </DivContainer>
  );
};

const DivContainer = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;

  @media (min-width: 980px) {
    visibility: hidden;
    display: none;
  }
`;

const BreedButtonSmallScreen = styled.a`
  display: block;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1rem;
  border-radius: 0.5rem;
  background-color: #00AC69;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-align: center;
  color: black;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default SmallScreenBreedButton;
