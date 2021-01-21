import React from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import DarkModeSwitch from "../DarkModeSwitch";

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledFooterInner>
      <Nav />
    </StyledFooterInner>
    <StyledFooterDarkModeSwitch>
      <br />
      <DarkModeSwitch />
      <br />
    </StyledFooterDarkModeSwitch>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 72px;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  @media (max-width: 980px) {
    display: -webkit-box;
    overflow-x: scroll;
  }
`;

const StyledFooterDarkModeSwitch = styled.div`
  display: none;
  @media (max-width: 1130px) {
    display: block;
  }
`;

export default Footer;
