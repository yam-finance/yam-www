import React from 'react'

import styled from 'styled-components'

interface ValueProps {
  value: string,
  valueSize?: string,
  valueColor?: string,
  valuePosition?: string,
  valueBold?: string,
}

const ValueText: React.FC<ValueProps> = ({ value, valueSize, valueColor, valuePosition, valueBold }) => {
  return (
    <StyledValue valueSize={valueSize} valueColor={valueColor} valuePosition={valuePosition} valueBold={valueBold}>{value}</StyledValue>
  )
}

interface StyledValueProps {
  valueSize?: string,
  valueColor?: string,
  valuePosition?: string;
  valueBold?: string;
}

const StyledValue = styled.div<StyledValueProps>`
  color: ${props => (props.valueColor ? props.valueColor : props.theme.textColor)};
  font-size: ${props => (props.valueSize ? props.valueSize : "24px")};
  font-weight: ${props => (props.valueBold ? props.valueBold : "700")};
  text-align: ${props => (props.valuePosition ? props.valuePosition : "left")};
  line-height: ${props => (props.valueSize ? props.valueSize : "normal")};
`

export default ValueText