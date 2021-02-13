import React from "react";

import styled from "styled-components";
import TopCarousel from "./TopCarousel";
import BigNFT from "./BigNFT";

const AsideContainer: React.FC = () => {
  return (
    <DivContainer>
      <TopCarousel />
      <BigNFT />
    </DivContainer>
  );
};

const DivContainer = styled.div``;

export default AsideContainer;
