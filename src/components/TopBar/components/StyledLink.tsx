import React, { useState } from "react";
import styled from "styled-components";

interface StyledLinkProps {
  href?: string;
  label?: string;
  style?: any;
  onDismiss?: () => void;
  children?: React.ReactNode;
  mobileMenu?: boolean;
}

const StyledLink: React.FC<StyledLinkProps> = ({href, label, style, onDismiss, children, mobileMenu}) => {
  const [isShow, setIsShow] = useState(false);
  if (children) {
    return (
      <div 
        onMouseEnter={() => { 
          if (!mobileMenu) {
            setIsShow(true)
          }
        }} 
        onMouseLeave={() => { 
          if (!mobileMenu) {
            setIsShow(false)
          }
        }}
        onClick={() => { 
          if (mobileMenu) {
            setIsShow(!isShow)
          }
        }}
        style={mobileMenu ? {cursor: "pointer", width: "100%", textAlign: "left", display: "flex", flexDirection: "column"}
                          : {cursor: "pointer", width: "100%", textAlign: "left"}}
      >
        <StyledHyper href={href} target="_blank">{label}</StyledHyper>
        {
          isShow === true && <StyledNestedMenu>
            {children}
          </StyledNestedMenu>
        }
      </div>
    )
  } else {
    return (
      <StyledHyper href={href} target="_blank" style={style} onClick={onDismiss}>{label}</StyledHyper>
    )
  }
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

const StyledNestedMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (max-width: 770px) {
    position: relative;
    background-color: rgba(194 , 163, 174, 0.33);
    padding-left: 30px;
  }
`;

export default StyledLink;