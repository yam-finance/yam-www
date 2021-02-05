import React from "react";
import styled from "styled-components";

interface StyledLinkProps {
  href?: string;
  label?: string;
  style?: any;
}

const StyledLink: React.FC<StyledLinkProps> = ({href, label, style}) => {
  return (
    <StyledHyper href={href} target="_blank" style={style}>{label}</StyledHyper>
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
`;

export default StyledLink;