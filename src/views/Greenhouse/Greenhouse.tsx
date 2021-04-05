import React from "react";

import styled from "styled-components";

import Page from "components/Page";
import TopCarousel from "./components/TopCarousel";
import BigNFTs from "./components/BigNFTs";
import Breed from "./components/Breed";
// import SmallScreenBreedButton from "./components/SmallScreenBreedButton";

const Greenhouse: React.FC = () => {

  return (
    <Page>
      <GreenHouseWrapper>
        <TopCarousel />
        <BigNFTs />
        <Breed />
      </GreenHouseWrapper>
    </Page>
  );
};

const GreenHouseWrapper = styled.div`
  margin-top: 1.4rem;
  justify-content: space-between;

  @media (min-width: 980px) {
    display: flex;
    flex-direction: column;
  }
`;

export default Greenhouse;
