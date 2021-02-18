import React from "react";
import styled, { keyframes } from "styled-components";
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
        <StyledRouterLink target="/dashboard" label="Dashboard" onDismiss={onDismiss} />
        <StyledNestedLink target="/umbrella" label="Projects" type="router" mobileMenu={mobileMenu} >
          <StyledRouterLink target="/umbrella" label="Umbrella" style={ mobileMenu ? {} : { height: 26, display: "flex", alignItems: "center" }} onDismiss={onDismiss} />
          <StyledLink href="https://degenerative.finance/" label="Degenerative" style={mobileMenu ? {} : { height: 26, display: "flex", alignItems: "center" }} onDismiss={onDismiss} />
        </StyledNestedLink>
        <StyledRouterLink target="/governance" label="Govern" onDismiss={onDismiss} />
        <StyledNestedLink target="/farm" label="Farm" type="router" mobileMenu={mobileMenu} >
          <StyledRouterLink target="/farm" label="Farm" style={ mobileMenu ? {} : { height: 26, display: "flex", alignItems: "center" }} onDismiss={onDismiss} />
          <StyledRouterLink target="/claim" label="Claim" style={ mobileMenu ? {} : { height: 26, display: "flex", alignItems: "center" }} onDismiss={onDismiss} />
        </StyledNestedLink>
        <StyledLink href="https://docs.yam.finance/" label="FAQ" onDismiss={onDismiss} />
      </StyledNav>
    </>
  );
};

const slideIn = keyframes`
  0% {
    transform: translateX(-100%)
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledNav = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 770px) {
    animation: ${slideIn} 0.3s forwards ease-out;
    flex-direction: column;
    position: fixed;
    background: rgb(243, 237, 239);
    justify-content: center;
    width: 60%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
