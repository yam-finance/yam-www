import React from 'react'

import styled from 'styled-components'
import Page from 'components/Page'
import useStrainNfts from 'hooks/useStrainNfts'
import StyledNft from 'views/Common/StyledNft'
import GenerateNFT from './GenerateNFT'
import Harvest from './Harvest'

const Apothecary: React.FC = () => {

  const {
    strainNftCollection
  } = useStrainNfts()

  return (
    <Page>
        <StyledMessage>
        <h3>Temporarily disabled NFT generation, yields for NFT are inconsistent, we are looking into the issue. Join discord to get up to the current information</h3>
        </StyledMessage>
      <StyledPageLayout>
        <StyledGenerationForm>
          <GenerateNFT />
          <Harvest />
        </StyledGenerationForm>
        <StyledNftSection>
          {strainNftCollection && strainNftCollection.map(nft => (
            <StyledNft
              key={nft.nftId}
              nft={nft}
            />
          ))}
        </StyledNftSection>
      </StyledPageLayout>
    </Page>
  )
}

const StyledMessage = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-content: center;
`

const StyledPageLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr ;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const StyledGenerationForm = styled.div`
  margin: 1rem;
  padding: 1rem;
  min-width: 300px;

  @media (max-width: 600px) {
    border-bottom: 1px solid #00AC69;
  }
`

const StyledNftSection = styled.div`
  border-left: 1px solid #00AC69;
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  @media (max-width: 600px) {
    border-left: unset;
  }
`

export default Apothecary

