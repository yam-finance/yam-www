import React from "react";
import styled from "styled-components";
import StyledRouterLink from "./StyledRouterLink";
import StyledLink from "./StyledLink";
import StyledNestedLink from "./StyledNestedLink";

interface NavProps {
  onDismiss: () => void;
  mobileMenu?: boolean;
}

const Nav: React.FC<NavProps> = ({ onDismiss, mobileMenu }) => {
  return (
    <>
      { mobileMenu && (
        <StyledBackdrop onClick={onDismiss} />
      )}
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
    </>
  );
};

const StyledNav = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 770px) {
    flex-direction: column;
    position: fixed;
    background: rgb(243, 237, 239);
    width: 300px;
    top: 0;
    right: 0;
    bottom: 0;
    left: calc(100% - 300px);
    z-index: 1000;
  }
`;

const StyledBackdrop = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  opacity: 0.75;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Nav;
