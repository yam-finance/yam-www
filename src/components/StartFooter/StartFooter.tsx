import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'
import { NavLink } from "react-router-dom";

import Split from 'components/Split'
import footers from 'constants/Footers.json';
import DarkModeSwitch from "../DarkModeSwitch";

const StartFooter: React.FC = () => {

  const footerItems = footers.filter((footer) => (footer.homeDisplay === true));

  const { darkMode } = useTheme()
  return (
    <StyledFooter darkMode={darkMode}>
      <Spacer size="lg" />
      <Container>
        <Split>
          {footerItems.map((footer:any, index:any) => (
            <div key={index}>
            {
              footer.router ? <StyledRouterLink exact to={footer.url}>{footer.name}</StyledRouterLink>
                            : <StyledLink href={footer.url}>{footer.name}</StyledLink>
            }
            </div>
          ))}
        </Split>
      </Container>
      <Spacer size="lg" />
      <StyledFooterText>
        <span style={{ opacity: 0.5 }}>Built with </span>
        <span role="img"> ❤️ </span>
        <span style={{ opacity: 0.5 }}>by the YAM community.</span>
      </StyledFooterText>
      <Spacer />
      <StyledFooterDarkModeSwitch>
        <br />
        <DarkModeSwitch />
        <br />
      </StyledFooterDarkModeSwitch>
      <Spacer size="md" />
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
  color: ${(props) => props.theme.colors.grey[500]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`;

const StyledRouterLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.grey[500]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`;

const StyledFooterDarkModeSwitch = styled.div`
  display: none;
  @media (max-width: 1130px) {
    display: flex;
    justify-content: center;
  }
`;

export default StartFooter;