import React, { useContext } from "react";
import styled from "styled-components";
import { useTheme } from "react-neu";

interface BarProgressProps {
  value?: number;
  invert?: boolean;
  type?: "buffer" | "normal";
}

const Bar: React.FC<BarProgressProps> = ({ value, invert, type }) => {
  if (invert) {
    value = 100 - (value || 0);
  }
  const { darkMode } = useTheme();

  return (
    <>
      <StyledBar className="progressbar" darkMode={darkMode}>
        <StyledBarInner className={`${type === "buffer" ? "buffer" : ""}`} style={{ width: `${value}%` }} />
        <StyledBarProgressText darkMode={darkMode}>{value}%</StyledBarProgressText>
      </StyledBar>
    </>
  );
};

interface StyledBarProps {
  darkMode?: boolean;
}

interface StyledBarProgressTextProps {
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

const StyledBarProgressText = styled.div<StyledBarProgressTextProps>`
  cursor: default;
  position: relative;
  top: 0px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 46px;
  color: white;
  z-index: 90;
  opacity: 0.95;
`;

export default Bar;
