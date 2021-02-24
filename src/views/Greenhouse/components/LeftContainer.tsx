import React from "react";

import styled from "styled-components";
import TopCarousel from "./TopLeftCarousel";
import BigNFT from "./BigNFTLeft";

const LeftContainer: React.FC = () => {
  return (
    <DivContainer>
      <TopCarousel />
      <BigNFT />
    </DivContainer>
  );
};

const DivContainer = styled.div``;

export default LeftContainer;
