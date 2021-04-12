import React from "react";
import styled from "styled-components";
import { useTheme } from "react-neu";
import numeral from "numeral";
import { useCountUp } from 'react-countup';
import { useEffect, useState } from "react";
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
  const valueCountUp= useCountUp({
    start: 0,
    end: value ? value: 0,
    formattingFn: (val) => val ? ` ${numeral(val).format("0")}` : "Loading ...",
    decimals: 0,
    duration: 1.3
  });
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
   valueCountUp.update(value);
   setProgressValue(value? value: 0);
  },[value] );

  return (
    <>
      <StyledBar className="progressbar" darkMode={darkMode}>
        <StyledBarInner className={`${type === "buffer" ? "buffer" : ""}`} style={{ width: `${progressValue}%` }} />
        <StyledBarProgressText darkMode={darkMode}>{valueCountUp.countUp}%</StyledBarProgressText>
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
 
  transition: 1s ease;
  transition-delay: 0.3s;
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
