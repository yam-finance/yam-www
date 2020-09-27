import React, { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Container,
  Separator,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import CoinDeskIcon from 'components/icons/CoinDeskIcon'
import CoinTelegraphIcon from 'components/icons/CoinTelegraphIcon'
import ForbesIcon from 'components/icons/ForbesIcon'
import GizmodoIcon from 'components/icons/Gizmodo'
import TheDefiantIcon from 'components/icons/TheDefiantIcon'
import TheRegisterIcon from 'components/icons/TheRegisterIcon'

const ASTRONAUTS = [
  '👨‍🚀',
  '👨🏻‍🚀',
  '👨🏼‍🚀',
  '👨🏽‍🚀',
  '👨🏾‍🚀',
  '👩‍🚀',
  '👩🏻‍🚀',
  '👩🏼‍🚀',
  '👩🏽‍🚀',
  '👩🏾‍🚀‍',
  '👩🏿‍🚀'
]

const Home: React.FC = () => {
  const [astronaut, setAstronaut] = useState('👨‍🚀')

  const updateAstronaut = useCallback(() => {
    const newAstro = ASTRONAUTS[Math.floor(Math.random()*ASTRONAUTS.length)]
    setAstronaut(newAstro)
  }, [setAstronaut])

  useEffect(() => {
    const refresh = setInterval(updateAstronaut, 1000)
    return () => clearInterval(refresh)
  }, [updateAstronaut])

  return (
    <Page>
      <PageHeader
        icon={`${astronaut}❤️🍠`}
        subtitle="Fair launch, open participation, and inclusive community."
        title="Fair finance by the people, for the people."
      />
      <Container size="lg">
        <Box row justifyContent="center">
          <Button text="Open App" />
          <Spacer />
          <Button text="Join the Community" variant="secondary" />
        </Box>
        <Spacer size="lg" />
        <Separator />
        <Spacer size="lg" />
        <StyledSectionIcon>⚖️</StyledSectionIcon>
        <StyledSectionTitle>Fair finance for everyone.</StyledSectionTitle>
        <Spacer size="lg" />
        <Split>
          <Card>
            <CardIcon>💸</CardIcon>
            <CardContent>
              <StyledCardName>Growing treasury</StyledCardName>
              <Spacer size="sm" />
              <StyledCardDescription>The YAM treasury grows on every positive rebase.</StyledCardDescription>
            </CardContent>
            <CardActions>
              <Box row justifyContent="center">
                <Button text="View treasury" variant="secondary" />
              </Box>
            </CardActions>
          </Card>
          <Card>
            <CardIcon>👨‍🌾</CardIcon>
            <CardContent>
              <StyledCardName>Yield farming</StyledCardName>
              <Spacer size="sm" />
              <StyledCardDescription>Earn your YAMs by participating in the protocol.</StyledCardDescription>
            </CardContent>
            <CardActions>
              <Box row justifyContent="center">
                <Button text="Start farming" variant="secondary" />
              </Box>
            </CardActions>
          </Card>
          <Card>
            <CardIcon>🗣️</CardIcon>
            <CardContent>
              <StyledCardName>Decentralized governance</StyledCardName>
              <Spacer size="sm" />
              <StyledCardDescription>The future of YAM is in the hands of YAM holders.</StyledCardDescription>
            </CardContent>
            <CardActions>
              <Box row justifyContent="center">
                <Button text="Go vote" variant="secondary" />
              </Box>
            </CardActions>
          </Card>
        </Split>
        <Spacer size="lg" />
        <Separator />
        <Spacer size="lg" />
        <Box>
          <StyledSectionIcon>👁️</StyledSectionIcon>
          <StyledSectionTitle>As seen in</StyledSectionTitle>
          <Spacer size="lg" />
          <Split gapSize="lg">
            <StyledLogo>
              <CoinTelegraphIcon />
            </StyledLogo>
            <StyledLogo>
              <TheDefiantIcon />
            </StyledLogo>
            <StyledLogo>
              <CoinDeskIcon />
            </StyledLogo>
          </Split>
          <Spacer size="lg" />
          <Split gapSize="lg">
            <StyledLogo>
              <GizmodoIcon />
            </StyledLogo>
            <StyledLogo>
              <ForbesIcon />
            </StyledLogo>
            <StyledLogo>
              <TheRegisterIcon />
            </StyledLogo>
          </Split>
          <Spacer size="lg" />
        </Box>
      </Container>
    </Page>
  )
}

const StyledCardName = styled.div`
  color: ${props => props.theme.textColor};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`

const StyledCardDescription = styled.div`
  color: ${props => props.theme.colors.grey[500]};
  font-size: 16px;
  min-height: 56px;
  text-align: center;
`

const StyledSectionTitle = styled.div`
  color: ${props => props.theme.colors.primary.main};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledSectionIcon = styled.div`
  font-size: 64px;
  text-align: center;
`

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  opacity: 0.66;
`

export default Home