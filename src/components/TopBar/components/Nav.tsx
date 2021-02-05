import React from "react";
import styled from "styled-components";
import StyledRouterLink from "./StyledRouterLink";
import StyledLink from "./StyledLink";
import StyledNestedLink from "./StyledNestedLink";

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledRouterLink target="/dashboard" label="Dashboard" />
      <StyledNestedLink target="/umbrella" label="Projects" type="router" >
        <StyledRouterLink target="/umbrella" label="Umbrella" style={{ height: 26, display: "flex", alignItems: "center" }} />
        <StyledLink href="https://degenerative.finance/" label="Degenerative" style={{ height: 26, display: "flex", alignItems: "center" }} />
      </StyledNestedLink>
      <StyledRouterLink target="/governance" label="Govern" />
      <StyledRouterLink target="/farm" label="Farm" />
      <StyledRouterLink target="/migrate" label="Migrate" />
      <StyledLink href="https://docs.yam.finance/" label="FAQ" />
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`;

export default Nav;
