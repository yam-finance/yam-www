import React from 'react'

import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'

interface PageHeaderProps {
  imgSrc: string,
  subtitle?: string,
  title?: string,
  imgSrc2?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ imgSrc, subtitle, title, imgSrc2 }) => {
  return (
    <Container size="sm">
    <StyledPageHeader>
      {imgSrc && <img src={imgSrc} height={96}/>}
      <Spacer size="sm" />
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
      {imgSrc2 && <img src={imgSrc2} height={192}/>}
    </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.span.attrs({
  role: 'img'
})`
  font-size: 96px;
  height: 96px;
  line-height: 96px;
  text-align: center;
  min-width: 96px;
`

export const StyledTitle = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`

export const StyledSubtitle = styled.h3`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
  text-align: center;
`

export default PageHeader
