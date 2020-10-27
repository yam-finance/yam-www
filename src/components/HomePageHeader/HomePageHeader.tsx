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
                    {/*<img src={imgSrc} height={96}/>*/}
                    <Spacer size="sm" />
                    <StyledTitle>{title}</StyledTitle>
                    <StyledSubtitle>{subtitle}</StyledSubtitle>
                    <StyledStrnButton href="https://uniswap.exchange/swap?inputCurrency=ETH&outputCurrency=0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f" target="_blank">Buy STRN</StyledStrnButton>
                </StyledHomePageContainer>
                <StyledHomePageContainer>
                    <img src={imgSrc2} height={384}/>
                </StyledHomePageContainer>
            </StyledHomePageHeader>
    )
};

const StyledHomePageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  max-width: 1200px;
  width: 1200px;
  margin: 0 auto;
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
`;

const StyledTitle = styled.h1`
  color: #6C63FF;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: left;
  width: 65%;
`;

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.textColor};
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
  margin: auto;
  text-align: left;
`;

const StyledStrnButton = styled.a`
    display: block;
    width: 100px;
    height: 40px;
    border: solid 1px #6C63FF;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    text-decoration: none;
    color: #6C63FF;
    background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    margin-top: 15px;
    font-weight: bold;
`;

export default HomePageHeader
