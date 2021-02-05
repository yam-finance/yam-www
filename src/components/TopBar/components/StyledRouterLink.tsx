import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface StyleRouterLinkProps {
  target?: string;
  label?: string;
  style?: any;
}

const StyleRouterLink: React.FC<StyleRouterLinkProps> = ({target, label, style}) => {
  return (
    <StyledLink exact activeClassName="active" to={target || ''} style={style}>{label}</StyledLink>
  )
}

const StyledLink = styled(NavLink)`
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

export default StyleRouterLink;