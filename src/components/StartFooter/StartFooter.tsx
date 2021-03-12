import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'

import Split from 'components/Split'

const StartFooter: React.FC = () => {
  const { darkMode } = useTheme()
  return (
    <StyledFooter darkMode={darkMode}>
      <Spacer size="lg" />
      <Container>
        <Split>
          <StyledLink href="https://discord.gg/nKKhBbk">Discord</StyledLink>
          <StyledLink href="https://github.com/yam-finance/yam-www">Github</StyledLink>
          <StyledLink href="https://twitter.com/YamFinance">Twitter</StyledLink>
          <StyledLink href="https://snapshot.page/#/yam">Proposals</StyledLink>
          <StyledLink href="https://forum.yam.finance">Forum</StyledLink>
        </Split>
      </Container>
      <Spacer size="lg" />
      <StyledFooterText>
        <span style={{ opacity: 0.5 }}>Built with </span>
        <span role="img"> ❤️ </span>
        <span style={{ opacity: 0.5 }}>by the YAM community.</span>
      </StyledFooterText>
      <Spacer />
    </StyledFooter>
  )
}

interface StyledFooterProps {
  darkMode?: boolean
}
const StyledFooter = styled.div<StyledFooterProps>`
  background-color: ${props => props.darkMode ? props.theme.colors.grey[800] : props.theme.colors.grey[300]};
`

const StyledFooterText = styled.div`
  text-align: center;
`

const StyledLink = styled.a`
  color: ${props => props.theme.colors.grey[500]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
`

export default StartFooter;