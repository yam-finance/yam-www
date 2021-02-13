import React from "react";

import styled from "styled-components";
import Page from "components/Page";
import useStrainNfts from "hooks/useStrainNfts";
import StyledNft from "views/Common/StyledNft";
import GenerateNFT from "./GenerateNFT";
import Harvest from "./Harvest";

const Apothecary: React.FC = () => {
  const { strainNftCollection } = useStrainNfts();

  return (
    <Page>
      <StyledPageLayout>
        <StyledGenerationForm>
          <GenerateNFT />
          <Harvest />
        </StyledGenerationForm>
        <StyledNftSection>
          {strainNftCollection &&
            strainNftCollection.map((nft) => (
              <StyledNft key={nft.nftId} nft={nft} />
            ))}
        </StyledNftSection>
      </StyledPageLayout>
    </Page>
  );
};

const StyledPageLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledGenerationForm = styled.div`
  margin: 1rem;
  padding: 1rem;
  min-width: 300px;

  @media (max-width: 600px) {
    border-bottom: 1px solid #00ac69;
  }
`;

const StyledNftSection = styled.div`
  border-left: 1px solid #00ac69;
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  @media (max-width: 600px) {
    border-left: unset;
  }
`;

export default Apothecary;
