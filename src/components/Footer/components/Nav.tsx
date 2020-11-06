import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledRouterLink exact to="/addresses">Addresses</StyledRouterLink>
      <StyledLink href="https://github.com/yam-finance/yam-www" target="_blank">Github</StyledLink>
      <StyledLink href="https://twitter.com/YamFinance" target="_blank">Twitter</StyledLink>
      <StyledLink href="https://discord.gg/nKKhBbk" target="_blank">Discord</StyledLink>
      <StyledLink href="https://snapshot.page/#/yam" target="_blank">Proposals</StyledLink>
      <StyledLink href="https://medium.com/yam-finance" target="_blank">Medium</StyledLink>
      <StyledLink href="https://forum.yam.finance" target="_blank">Forum</StyledLink>
      <StyledLink href="https://yam.gitbook.io/yam/" target="_blank">Docs</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
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

const StyledRouterLink = styled(NavLink)`
  color: ${props => props.theme.colors.grey[500]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
`

export default Nav
