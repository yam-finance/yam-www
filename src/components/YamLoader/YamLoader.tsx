import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "react-neu";

interface LoaderOptions {
  space?: number;
}

const YamLoader: React.FC<LoaderOptions> = ({ space }) => {
  const { darkMode } = useTheme();
  return (
    <>
      <StyledLoader darkMode={darkMode} spaceMode={space}></StyledLoader>
    </>
  );
};

interface StyledBarProps {
  darkMode?: boolean;
  spaceMode?: number;
}

const StyledLoader = styled.div<StyledBarProps>`
  width: 32px;
  height: 32px;
  clear: both;
  margin: ${(props) => (props.spaceMode ? props.spaceMode / 2 : 10)}px auto;
  border: 4px ${(props) => (props.darkMode ? props.theme.colors.grey[900] : props.theme.colors.grey[400])} solid;
  border-top: 4px ${(props) => props.theme.colors.primary.main} solid;
  border-radius: 50%;
  animation: ${() => Spin} 0.4s infinite linear;
`;

const Spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
`;

export default YamLoader;
