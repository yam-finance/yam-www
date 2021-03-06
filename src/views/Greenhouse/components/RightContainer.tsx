import React from "react";

import styled from "styled-components";
import TopCarousel from "./TopRightCarousel";
import BigNFT from "./ParentNFT";
import useGreenhouse from "hooks/useGreenhouse";

const RightContainer: React.FC = () => {
  const {
    parentTwoNftId,
  } = useGreenhouse();
  return (
    <DivContainer>
      <TopCarousel />
      <BigNFT nftId={parentTwoNftId} />
    </DivContainer>
  );
};

const DivContainer = styled.div``;

export default RightContainer;
