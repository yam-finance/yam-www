import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledRouterLink exact activeClassName="active" to="/">Home</StyledRouterLink>
      {/*<StyledRouterLink exact activeClassName="active" to="/stake">Stake</StyledRouterLink>*/}
      {/*<StyledRouterLink exact activeClassName="active" to="/migrate">Migrate</StyledRouterLink>*/}
      {/*<StyledRouterLink exact activeClassName="active" to="/governance">Govern</StyledRouterLink>*/}
      {/*<StyledRouterLink activeClassName="active" to="/faq">FAQ</StyledRouterLink>*/}
      {/*<StyledLink href="https://yam.gitbook.io/yam/" target="_blank">Docs</StyledLink>*/}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledRouterLink = styled(NavLink)`
  color: ${props => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${props => props.theme.colors.primary.main};
  }
`

const StyledLink = styled.a`
  color: ${props => props.theme.colors.grey[500]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
`

export default Nav
