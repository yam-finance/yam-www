import React from "react";
import styled, { keyframes } from "styled-components";
import StyledRouterLink from "./StyledRouterLink";
import StyledLink from "./StyledLink";

interface NavProps {
  onDismiss: () => void;
  mobileMenu?: boolean;
}

const Nav: React.FC<NavProps> = ({ onDismiss, mobileMenu }) => {
  return (
    <>
      {mobileMenu && <StyledBackdrop onClick={onDismiss} />}
      <StyledNav>
        <StyledRouterLink
          target="dashboard"
          label="Dashboard"
          mobileMenu={mobileMenu}
          onDismiss={onDismiss}
        />
        <StyledRouterLink
          target="projects"
          label="Projects"
          mobileMenu={mobileMenu}
          onDismiss={onDismiss}
        />
        <StyledRouterLink
          target="governance"
          label="Govern"
          mobileMenu={mobileMenu}
          onDismiss={onDismiss}
        />
        <StyledRouterLink
          target="farm"
          label="Farm"
          mobileMenu={mobileMenu}
          onDismiss={onDismiss}
        />
        <StyledRouterLink
          label="More"
          mobileMenu={mobileMenu}
          onDismiss={onDismiss}
        >
          <StyledRouterLink
            target="Addresses"
            label="Contract Addresses"
            mobileMenu={mobileMenu}
            onDismiss={onDismiss}
          />
          <StyledRouterLink
            target="Migrate"
            label="Migrate to V3"
            mobileMenu={mobileMenu}
            onDismiss={onDismiss}
          />
          <StyledLink
            href="https://docs.yam.finance/"
            label="Docs"
            mobileMenu={mobileMenu}
            onDismiss={onDismiss}
          />
        </StyledRouterLink>
        {/*
      // Old Link Structure 
        <StyledRouterLink target="projects" label="Projects" mobileMenu={mobileMenu} onDismiss={onDismiss}>
          <StyledLink href="http://synths.yam.finance" label="Yam Synths" mobileMenu={mobileMenu} onDismiss={onDismiss} />
          <StyledRouterLink target="umbrella" label="Yam Protection" mobileMenu={mobileMenu} onDismiss={onDismiss} />
          <StyledRouterLink target="daohouse" label="Yam Treasuries" mobileMenu={mobileMenu} onDismiss={onDismiss} />
          <StyledLink href="https://cryptovoxels.com/play?coords=S@678W,600S" label="MOFY" mobileMenu={mobileMenu} onDismiss={onDismiss} />
        </StyledRouterLink>
        <StyledLink href="http://synths.yam.finance" label="Synths" mobileMenu={mobileMenu} onDismiss={onDismiss} />
        <StyledRouterLink target="governance" label="Govern" mobileMenu={mobileMenu} onDismiss={onDismiss} >
          <StyledRouterLink target="register" label="Register" mobileMenu={mobileMenu} onDismiss={onDismiss} />
          <StyledRouterLink target="delegate" label="Delegate" mobileMenu={mobileMenu} onDismiss={onDismiss} />
        </StyledRouterLink>
        <StyledRouterLink target="farm" label="Farm" mobileMenu={mobileMenu} onDismiss={onDismiss} >
          <StyledRouterLink target="claim" label="Claim" mobileMenu={mobileMenu} onDismiss={onDismiss} />
        </StyledRouterLink>
        <StyledRouterLink target="/tvl" label="TVL" mobileMenu={mobileMenu} onDismiss={onDismiss} />
        <StyledLink href="https://docs.yam.finance/" label="FAQ" mobileMenu={mobileMenu} onDismiss={onDismiss} />
      */}
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
    justify-content: flex-start;
    padding-top: 50px;
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
