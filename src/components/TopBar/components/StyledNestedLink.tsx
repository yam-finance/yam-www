import React, { useState } from "react";
import styled from "styled-components";
import StyledRouterLink from "./StyledRouterLink";
import StyledLink from "./StyledLink";

interface StyledNestedLinkProps {
  children?: React.ReactNode;
  href?: string;
  target?: string;
  label?: string;
  type?: string;
  mobileMenu?: boolean;
}

const StyledNestedLink: React.FC<StyledNestedLinkProps> = ({children, href, target, label, type, mobileMenu}) => {
  const [isShow, setIsShow] = useState(false);
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
      style={{cursor: "pointer", width: "100%", textAlign: "right"}}
    >
      { type === "router" ? (
          <StyledRouterLink target={target} label={label} /> 
        ) : (
          <StyledLink href={href} label={label} />
        )
      }
      {
        isShow === true && <StyledNestedMenu>
          {children}
        </StyledNestedMenu>
      }
    </div>
  )
}

const StyledNestedMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (max-width: 770px) {
    position: relative;
    background-color: #ddd;
  }
`;

export default StyledNestedLink;