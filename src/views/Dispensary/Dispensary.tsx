import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import StyledNotice from 'views/Common/StyledNotice'
import StyledNft from 'views/Common/StyledNft'
import useStrainNfts from 'hooks/useStrainNfts'
import blankStrainNFT from '../../assets/shadyStrainNFT.png'
import { DEFAULT_NFT_SIZE } from 'constants/poolValues'

const Dispensary: React.FC = () => {

  const { strainNftCollection } = useStrainNfts();

  return (
    <Page>
        {/* <DispensaryContainer>
          {strainNftCollection.length <= 0 ?
                  <>
                  <img style={{paddingBottom: "30px"}} src={blankStrainNFT} alt="Blank Strain NFT" height={DEFAULT_NFT_SIZE} />
                  <StyledNotice
                    messages={["Generate NFT's First"]}
                  />
                  </> : 
            strainNftCollection
            .map((nft) => (
                  <StyledNft key={nft.nftId} nft={nft} isDispensary={true} />
            ))}
        </DispensaryContainer> */}
    </Page>
  )
}

const DispensaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default Dispensary;
