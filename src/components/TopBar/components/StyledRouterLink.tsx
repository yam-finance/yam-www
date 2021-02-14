import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface StyleRouterLinkProps {
  target?: string;
  label?: string;
  style?: any;
  onDismiss?: () => void;
  children?: React.ReactNode;
  mobileMenu?: boolean;
}

const StyleRouterLink: React.FC<StyleRouterLinkProps> = ({target, label, style, onDismiss, children, mobileMenu}) => {
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
        <StyledLink exact activeClassName="active" style={style} to={target || ''}>{label}</StyledLink>
        {
          isShow === true && <StyledNestedMenu>
            {children}
          </StyledNestedMenu>
        }
      </div>
    )
  } else {
    return (
      <StyledLink exact activeClassName="active" to={target || ''} style={style} onClick={onDismiss}>{label}</StyledLink>
    ) 
  }
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

export default StyleRouterLink;