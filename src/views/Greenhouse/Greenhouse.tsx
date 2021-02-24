import React from "react";

import styled from "styled-components";

import Page from "components/Page";
import Breed from "./components/Breed";
import RightContainer from "./components/RightContainer";
import LeftContainer from "./components/LeftContainer";
import SmallScreenBreedButton from "./components/SmallScreenBreedButton";

const Greenhouse: React.FC = () => {

  return (
    <Page>
      <GreenHouseWrapper>
        <LeftContainer />
        <Breed />
        <RightContainer />
        <SmallScreenBreedButton />
      </GreenHouseWrapper>
    </Page>
  );
};

const GreenHouseWrapper = styled.div`
  margin-top: 4rem;
  justify-content: space-between;

  @media (min-width: 980px) {
    display: flex;
  }
`;

export default Greenhouse;
