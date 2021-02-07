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
  background-color: rgba(16, 185, 129, 1);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-align: center;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  color: black;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default SmallScreenBreedButton;
