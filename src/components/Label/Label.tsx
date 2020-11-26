import React from "react";
import styled from "styled-components";

interface LabelProps {
  text?: string;
  labelPosition?: string;
}

const Label: React.FC<LabelProps> = ({ text, labelPosition }) => <StyledLabel labelPosition={labelPosition}>{text}</StyledLabel>;

interface LabelProps {
  labelPosition?: string;
}

const StyledLabel = styled.div<LabelProps>`
  color: ${(props) => props.theme.colors.grey[500]};
  text-align: ${(props) => (props.labelPosition ? props.labelPosition : "left")};
`;

export default Label;
