import React from "react";

import { Container, Spacer } from "react-neu";
import styled from "styled-components";

import Page from "components/Page";
import Breed from "./components/Breed";
import AsideContainer from "./components/AsideContainer";
import SmallScreenBreedButton from "./components/SmallScreenBreedButton";

const Greenhouse: React.FC = () => {
  return (
    <Page>
      <GreenHouseWrapper>
        <AsideContainer />
        <Breed />
        <AsideContainer />
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
