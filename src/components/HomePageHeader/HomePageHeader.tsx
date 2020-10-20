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
                    <StyledBuyStrnButton>Buy STRN</StyledBuyStrnButton>
                </StyledHomePageContainer>
                <StyledHomePageContainer>
                    <img src={imgSrc2} height={236}/>
                </StyledHomePageContainer>
            </StyledHomePageHeader>
    )
};

const StyledHomePageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  max-width: 1200px;
  width: 1200px;
  padding-bottom: ${props => props.theme.spacing[6]}px;
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
`;

const StyledTitle = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: left;
  width: 50%;
`;

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
  text-align: left;
  width: 50%;
`;

const StyledBuyStrnButton = styled.button`
    display: block;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border-width: 4px;
    border-color: #AA50BD;
    color: #AA50BD;
    background-color: Transparent;
    background-repeat:no-repeat;
    cursor:pointer;
    margin-top: 15px;
    font-weight: bold;
`;

export default HomePageHeader
