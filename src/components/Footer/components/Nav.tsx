import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import { contributors } from "utils/misc";

import footers from 'constants/Footers.json';

const Nav: React.FC = () => {
  const { account, status } = useWallet();

  const CheckContributor = useMemo(() => {
    if (status === "connected" && contributors.hasOwnProperty(account?.toLowerCase())) {
      return <StyledRouterLinkColor exact to="/contributor">Contributor</StyledRouterLinkColor>;
    }
  }, [status, account]);

  return (
    <StyledNav>
      <>
      {footers.map((footer:any, index:any) => (
          <div key={index}>
          {
            footer.router ? <StyledRouterLink exact to={footer.url}>{footer.name}</StyledRouterLink>
                          : <StyledLink href={footer.url} target="_blank">{footer.name}</StyledLink>
          }
          </div>
        ))}
      </>
      {CheckContributor}
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

const StyledRouterLinkColor = styled(StyledRouterLink)`
  color: ${(props) => props.theme.colors.primary.main};
`;

export default Nav;
