import React from "react";

import styled from "styled-components";
import TopCarousel from "./TopLeftCarousel";
import BigNFT from "./ParentNFT";
import useGreenhouse from "hooks/useGreenhouse";

const LeftContainer: React.FC = () => {
  const {
    parentOneNftId,
  } = useGreenhouse();

  return (
    <DivContainer>
      <TopCarousel />
      <BigNFT nftId={parentOneNftId} />
    </DivContainer>
  );
};

const DivContainer = styled.div``;

export default LeftContainer;
