import React, { useContext } from "react";
import styled from "styled-components";
import { useTheme } from "react-neu";

interface BarProgress {
  value?: number;
  invert?: boolean;
}

const Bar: React.FC<BarProgress> = ({ value, invert }) => {
  if (invert) {
    value = 100 - (value || 0);
  }
  const { darkMode } = useTheme();

  return (
    <>
      <StyledBar darkMode={darkMode}>
        <StyledBarInner style={{ width: `${value}%` }} />
      </StyledBar>
    </>
  );
};

interface StyledBarProps {
  darkMode?: boolean;
}

const StyledBar = styled.div<StyledBarProps>`
  background: ${(props) => (props.darkMode ? props.theme.colors.grey[900] : props.theme.colors.grey[400])};
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  height: 2.8rem;
  width: 100%;
`;

const StyledBarInner = styled.div`
  background: ${(props) => props.theme.colors.primary.main};
  border-radius: 15px;
  height: 100%;
  transition: width 0.8s ease-in;
`;

export default Bar;
