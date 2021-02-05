import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <StyledNav>
      <StyledRouterLink exact activeClassName="active" to="/dashboard">
        Dashboard
      </StyledRouterLink>
      <div onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>
        <StyledLink>Projects</StyledLink>
        {
          isShow === true && <StyledDiv>
            <StyledRouterLink exact activeClassName="active" to="/umbrella" style={{ height: 26, display: "flex", alignItems: "center" }}>
              Umbrella
            </StyledRouterLink>
            <StyledLink href="https://degenerative.finance/" target="_blank" style={{ height: 26, display: "flex", alignItems: "center" }}>
              Degenerative
            </StyledLink>
          </StyledDiv>
        }
      </div>
      <StyledRouterLink exact activeClassName="active" to="/governance">
        Govern
      </StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/farm">
        Farm
      </StyledRouterLink>
      <StyledRouterLink exact activeClassName="active" to="/migrate">
        Migrate
      </StyledRouterLink>
      <StyledLink href="https://docs.yam.finance/" target="_blank">
        FAQ
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

const StyledDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
`;

export default Nav;
