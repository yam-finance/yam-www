import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import strain from '../../assets/randomStrainNFT.png'
import StyledNotice from 'views/Common/StyledNotice'

const Apothecary: React.FC = () => {

  return (
    <Page>
      <Container>
        <StyledNotice>
          <h1>Apothecary</h1>
          <NFTCard> 
            <h3>Alien Cookies</h3>
            <h4>Indica</h4>
            <img src={strain} height={120}/>
            <RarityButton>earthy</RarityButton>
            </NFTCard>
        </StyledNotice>
        <Spacer size="md" />
        <StyledNotice>
          </StyledNotice>
      </Container>
    </Page>
  )
}


const NFTCard = styled.div`
width: 200px; 
height: 250px;
background-color: #0E2B52;
border-radius: 20px;
color: white;
text-align: center;
display: inline-block !important;
margin: 0 20px;
`
const RarityButton = styled.button`
width: 100px;
height: 26px;
background-color: #7AF7B6;
border: 0;
border-radius: 6px;
font-family: Gopher;
`

export default Apothecary

