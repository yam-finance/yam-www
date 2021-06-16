import React from "react";

import styled from "styled-components";
import  { useCountUp } from 'react-countup';
import numeral from "numeral";
import { useEffect } from "react";
interface ValueProps {
  value: string;
  valueSize?: string;
  valueColor?: string;
  valuePosition?: string;
  valueBold?: string;
  prefix?: string;
  suffix?: string;
 
}

const Value: React.FC<ValueProps> = ({ value, valueSize, valueColor, valuePosition, valueBold, prefix="", suffix="" }) => {
  const valueCountUp= useCountUp({
    start: 0,
    end: numeral(value).value() ? numeral(value).value(): 0,
    formattingFn: (val) => val ? `${suffix} ${numeral(val).format("0.00a")} ${prefix}` : "--",
    decimals: 2,
    duration: 1.75
  });
  useEffect(() => {
    valueCountUp.update(numeral(value).value());
   },[value] );
  return (
    <StyledValue valueSize={valueSize} valueColor={valueColor} valuePosition={valuePosition} valueBold={valueBold}>
      {valueCountUp.countUp}
    </StyledValue>
  );
};

interface StyledValueProps {
  valueSize?: string;
  valueColor?: string;
  valuePosition?: string;
  valueBold?: string;
}

const StyledValue = styled.div<StyledValueProps>`
  color: ${(props) => (props.valueColor ? props.valueColor : props.theme.textColor)};
  font-size: ${(props) => (props.valueSize ? props.valueSize : "24px")};
  font-weight: ${(props) => (props.valueBold ? props.valueBold : "700")};
  text-align: ${(props) => (props.valuePosition ? props.valuePosition : "left")};
  line-height: ${(props) => (props.valueSize ? props.valueSize : "normal")};
`;

export default Value;
