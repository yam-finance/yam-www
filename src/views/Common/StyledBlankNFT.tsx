import React from 'react'
import blankStrainNFT from '../../assets/shadyStrainNFT.png'
import styled from 'styled-components'

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
            <img src={blankStrainNFT} alt="Blank Strain NFT" />
        </StyledImage>
    )
}

export default StyledBlankNFT
