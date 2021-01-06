import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useIntl } from "react-intl";

const Nav: React.FC = () => {
  const intl = useIntl();
  return (
    <StyledNav>
      <StyledRouterLink exact activeClassName="active" to="/dashboard">
        {intl.formatMessage({ id: "menu.dashboard" })}
      </StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/umbrella">
        {intl.formatMessage({ id: "menu.umbrella" })}
      </StyledRouterLink>
      <StyledLink href="https://degenerative.finance/" target="_blank">
        {intl.formatMessage({ id: "menu.degenerative" })}
      </StyledLink>
      <StyledRouterLink exact activeClassName="active" to="/governance">
        {intl.formatMessage({ id: "menu.govern" })}
      </StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/farm">
        {intl.formatMessage({ id: "menu.farm" })}
      </StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/migrate">
        {intl.formatMessage({ id: "menu.migrate" })}
      </StyledRouterLink>
      <StyledLink href="https://docs.yam.finance/" target="_blank">
        {intl.formatMessage({ id: "menu.faq" })}
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`;

const StyledRouterLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.grey[500]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`;

export default Nav;
