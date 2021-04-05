import React from "react";

import styled from "styled-components";
import BigNFT from "./ParentNFT";
import useGreenhouse from "hooks/useGreenhouse";

const BigNFTs: React.FC = () => {
  const {
    parentOneNftId,
    parentTwoNftId,
  } = useGreenhouse();

  return (
    <BigNFTsContainer>
      <BigNFT nftId={parentOneNftId} />
      <BigNFT nftId={parentTwoNftId} />
    </BigNFTsContainer>
  );
};

const BigNFTsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export default BigNFTs;
