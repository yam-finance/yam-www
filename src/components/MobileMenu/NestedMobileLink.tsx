import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

interface NestedMobileLinkProps {
  children?: React.ReactNode;
  label?: string;
}

const NestedMobileLink: React.FC<NestedMobileLinkProps> = ({children, label}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
    <StyledLabel onClick={() => setIsShow(!isShow)}>
      { label }
    </StyledLabel>
    {
      isShow === true && <StyledNestedMenu>
        {children}
      </StyledNestedMenu>
    }
    </>
  )
}

const StyledNestedMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
`;

const StyledLabel = styled.label`
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[3]}px ${(props) => props.theme.spacing[4]}px;
  text-align: right;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

export default NestedMobileLink;