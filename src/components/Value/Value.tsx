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
  decimals?: number;
  prefix?: string;
  suffix?: string;
 
}

const getFormat = (decimals: number) => {
  switch (decimals) {
    case 2:
      return "0.00a";
    case 3:
      return "0.000a";
    case 4:
      return "0.0000a";
    case 5:
      return "0.00000a";
    case 6:
      return "0.000000a";
    case 7:
      return "0.0000000a";
    case 8:
      return "0.00000000a";
    default:
      return "0.00a";
  }
}

const Value: React.FC<ValueProps> = ({ value, valueSize, valueColor, valuePosition, valueBold, decimals=2, prefix="", suffix="" }) => {
  const valueCountUp= useCountUp({
    start: 0,
    end: numeral(value).value() ? numeral(value).value(): 0,
    formattingFn: (val) => val ? `${suffix} ${numeral(val).format(getFormat(decimals))} ${prefix}` : "--",
    decimals: decimals,
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
