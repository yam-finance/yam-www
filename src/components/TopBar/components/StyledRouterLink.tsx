import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface StyleRouterLinkProps {
  target?: string;
  label?: string;
  style?: any;
  onDismiss?: () => void;
}

const StyleRouterLink: React.FC<StyleRouterLinkProps> = ({target, label, style, onDismiss}) => {
  return (
    <StyledLink exact activeClassName="active" to={target || ''} style={style} onClick={onDismiss}>{label}</StyledLink>
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
  @media (max-width: 770px) {
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.grey[500]};
    font-size: 24px;
    font-weight: 700;
    padding: ${(props) => props.theme.spacing[3]}px ${(props) => props.theme.spacing[4]}px;
    text-align: left;
    text-decoration: none;
    width: 100%;
    &:hover {
      color: ${(props) => props.theme.colors.grey[600]};
    }
    &.active {
      color: ${(props) => props.theme.colors.primary.main};
    }
  }
`;

export default StyleRouterLink;