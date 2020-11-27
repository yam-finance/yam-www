import React from 'react'

import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'

interface HomePageHeaderProps {
    imgSrc: string,
    subtitle?: string,
    title?: string,
    imgSrc2?: string
}

const HomePageHeader: React.FC<HomePageHeaderProps> = ({ imgSrc, subtitle, title, imgSrc2 }) => {
    return (
            <StyledHomePageHeader>
                <StyledHomePageContainer>
                    <Spacer size="sm" />
                    <StyledTitle>{title}</StyledTitle>
                    <StyledSubtitle>{subtitle}</StyledSubtitle>
                    <StyledStrnButton href="https://uniswap.exchange/swap?inputCurrency=ETH&outputCurrency=0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f" target="_blank">Buy STRN</StyledStrnButton>
                    <StyledStrnButton href="https://app.uniswap.org/#/add/0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f/ETH" target="_blank">Provide LP</StyledStrnButton>
                </StyledHomePageContainer>
                <StyledHomePageContainer2>
                    <img src={imgSrc2} height={384}/>
                </StyledHomePageContainer2>
            </StyledHomePageHeader>
    )
};

const StyledHomePageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
  width: 80% !important;
`;

const StyledHomePageContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;
  
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-left: 30px;
  }
`;

const StyledHomePageContainer2 = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;
  
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledTitle = styled.h1`
  color: #61B5FD;
  font-family: gopher, sans-serif;
  font-weight: 700;
  margin: 15px 0;
  padding: 0;
  text-align: left;
  width: 80%;
`;

const StyledSubtitle = styled.h3`
  color: #FFFFFF ;
  font-size: 16px;
  font-weight: 400;
  margin: 0px 0;
  padding: 10px 0;
  margin: auto;
  text-align: left;
`;

const StyledStrnButton = styled.a`
    display: block;
    width: 140px;
    height: 50px;
    border: solid 1px #00AC69;
    border-radius: 3px;
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: #00AC69;
    background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    margin-top: 15px;
    font-weight: bold;
    
    :hover {
      background-color: #00AC69;
      color: #08182E;
    } 
`;

export default HomePageHeader
