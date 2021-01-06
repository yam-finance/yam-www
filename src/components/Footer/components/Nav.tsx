import React from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav: React.FC = () => {
  const intl = useIntl();
  return (
    <StyledNav>
      <StyledRouterLink exact to="/addresses">
        {intl.formatMessage({ id: "menu.addresses" })}
      </StyledRouterLink>
      <StyledLink href="https://github.com/yam-finance/yam-www" target="_blank">
        {intl.formatMessage({ id: "menu.github" })}
      </StyledLink>
      <StyledLink href="https://twitter.com/YamFinance" target="_blank">
        {intl.formatMessage({ id: "menu.twitter" })}
      </StyledLink>
      <StyledLink href="https://discord.gg/nKKhBbk" target="_blank">
        {intl.formatMessage({ id: "menu.discord" })}
      </StyledLink>
      <StyledLink href="https://snapshot.page/#/yam" target="_blank">
        {intl.formatMessage({ id: "menu.proposals" })}
      </StyledLink>
      <StyledLink href="https://medium.com/yam-finance" target="_blank">
        {intl.formatMessage({ id: "menu.medium" })}
      </StyledLink>
      <StyledLink href="https://forum.yam.finance" target="_blank">
        {intl.formatMessage({ id: "menu.forum" })}
      </StyledLink>
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

export default Nav;
