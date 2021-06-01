import React, { useMemo } from "react";
import { Box, Spacer, useTheme } from "react-neu";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

import Label from "components/Label";
import Value from "components/Value";

interface FancyValueProps {
  icon?: React.ReactNode;
  label?: string;
  value: string;
  valueSize?: string;
  valueColor?: string;
  valueBold?: string;
  wrap?: boolean;
  hint?: string;
  tooltip?: string;
  isNum?: boolean;
  prefix?: string;
  suffix?: string;
}

const FancyValue: React.FC<FancyValueProps> = ({ icon, label, value, valueSize, valueColor, valueBold, wrap, hint, tooltip, isNum, prefix="", suffix="" }) => {
  const { darkMode, colors } = useTheme();
  let labelColor: string;
  let borderColor: string;
  let backgroundColor: string;
  if (darkMode) {
    labelColor = colors.primary.main;
    borderColor = colors.primary.main;
    backgroundColor = colors.grey[800];
  } else {
    labelColor = colors.grey[600];
    borderColor = colors.grey[600];
    backgroundColor = colors.grey[400];
  }

  const DisplayHint = useMemo(() => {
    if (hint) {
      return (
        <>
          <ValueHint data-tip={tooltip} darkMode={darkMode} hint={hint} isNumber={isNum}>
            <div>{hint}</div>
          </ValueHint>
          <ReactTooltip
            place="top"
            type="light"
            effect="solid"
            className="tooltip"
            textColor={isNum ? (hint?.substr(0, 1) == "-" ? "red" : "green") : labelColor}
            borderColor={isNum ? (hint?.substr(0, 1) == "-" ? "red" : "green") : borderColor}
            backgroundColor={isNum ? (hint?.substr(0, 1) == "-" ? "#ff00003b" : "#0080003b") : backgroundColor}
            border={true}
          />
        </>
      );
    }
  }, [hint, darkMode]);

  const FancyLabelDisplay = useMemo(() => {
    if (wrap) {
      return (
        <>
          {DisplayHint}
          <LabelWrapDisplay>
            <Label text={label} labelPosition={!icon ? "center" : "left"} />
          </LabelWrapDisplay>
        </>
      );
    } else {
      return (
        <>
          {DisplayHint}
          <Label text={label} labelPosition={!icon ? "center" : "left"} />
        </>
      );
    }
  }, [darkMode, icon, label, value, hint]);

  const IconDisplay = useMemo(() => {
    if (icon) {
      return (
        <>
          <Box row justifyContent="center" minWidth={48}>
            <StyledIcon>{icon}</StyledIcon>
          </Box>
          <Spacer size="sm" />
        </>
      );
    }
  }, [icon]);

  return (
    <>
      <DisplayFancyValue>
        <Box alignItems="center" row>
          {IconDisplay}
          <Box flex={1}>
            
            <Value value={value} valuePosition={!icon ? "center" : "left"} valueSize={valueSize} valueColor={valueColor} valueBold={valueBold} prefix={prefix} suffix={suffix}  />
            {FancyLabelDisplay}
          </Box>
        </Box>
      </DisplayFancyValue>
    </>
  );
};

interface ValueHintProps {
  darkMode?: boolean;
  hint?: string;
  isNumber?: boolean;
}

const DisplayFancyValue = styled.div`
  position: relative;
`;

const StyledIcon = styled.span.attrs({ role: "img" })`
  font-size: 32px;
`;

const LabelWrapDisplay = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const ValueHint = styled.span<ValueHintProps>`
  cursor: default;
  display: block;
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${(props) => (props.isNumber ? (props.hint?.substr(0, 1) == "-" ? "#ff00003b" : "#0080003b") : "#ae0e463b")};
  color: ${(props) => (props.isNumber ? (props.hint?.substr(0, 1) == "-" ? "red" : "green") : props.theme.colors.primary.main)};
  line-height: 16px;
  font-weight: bold;
  font-size: 12px;
  border: 2px solid ${(props) => (props.isNumber ? (props.hint?.substr(0, 1) == "-" ? "red" : "green") : props.theme.colors.primary.main)};
  border-radius: 100px;
  padding: 0px 5px 1px 5px;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    z-index: 10;
  }
`;

export default FancyValue;
