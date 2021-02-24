import React from "react";

import styled from "styled-components";
import TopCarousel from "./TopRightCarousel";
import BigNFT from "./BigNFTRight";

const RightContainer: React.FC = () => {
  return (
    <DivContainer>
      <TopCarousel />
      <BigNFT />
    </DivContainer>
  );
};

const DivContainer = styled.div``;

export default RightContainer;
