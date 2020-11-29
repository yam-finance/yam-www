import React from 'react'
import blankStrainNFT from '../../assets/shadyStrainNFT.png'
import styled from 'styled-components'
import { DEFAULT_NFT_SIZE } from 'constants/poolValues'

const StyledImage = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const StyledBlankNFT = () => {

    return (
        <StyledImage>
            <img src={blankStrainNFT} alt="Blank Strain NFT" height={DEFAULT_NFT_SIZE} />
        </StyledImage>
    )
}

export default StyledBlankNFT
