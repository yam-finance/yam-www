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
}

const StyledNestedLink: React.FC<StyledNestedLinkProps> = ({children, href, target, label, type}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)} style={{cursor: "pointer"}}>
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
`;

export default StyledNestedLink;