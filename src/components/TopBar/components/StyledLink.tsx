import React from "react";
import styled from "styled-components";

interface StyledLinkProps {
  href?: string;
  label?: string;
  style?: any;
  onDismiss?: () => void;
}

const StyledLink: React.FC<StyledLinkProps> = ({href, label, style, onDismiss}) => {
  return (
    <StyledHyper href={href} target="_blank" style={style} onClick={onDismiss}>{label}</StyledHyper>
  )
}

const StyledHyper = styled.a`
  color: ${(props) => props.theme.colors.grey[500]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
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

export default StyledLink;