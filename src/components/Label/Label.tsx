import React from "react";
import styled from "styled-components";

interface LabelProps {
  text?: string;
  bold?: boolean;
  labelPosition?: string;
}

const Label: React.FC<LabelProps> = ({ text, bold, labelPosition }) => <StyledLabel labelPosition={labelPosition}>{text}</StyledLabel>;

const StyledLabel = styled.div<LabelProps>`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  text-align: ${(props) => (props.labelPosition ? props.labelPosition : "left")};
`;

export default Label;
