import React, { useContext, useMemo } from "react";
import styled, { ThemeContext } from "styled-components";

export interface BoxProps {
  alignItems?: "baseline" | "center" | "flex-end" | "flex-start";
  children?: React.ReactNode;
  column?: boolean;
  flex?: number | string;
  height?: number | string;
  justifyContent?: "center" | "flex-end" | "flex-start" | "space-around" | "space-between";
  margin?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginVertical?: number;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number;
  minWidth?: number;
  overflow?: string;
  padding?: number;
  paddingBottom?: number;
  paddingHorizontal?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingVertical?: number;
  position?: "relative" | "absolute";
  reverse?: boolean;
  row?: boolean;
  width?: number | string;
  display?: string;
}

const Box: React.FC<BoxProps> = ({
  children,
  column,
  height,
  margin = 0,
  marginBottom = 0,
  marginHorizontal = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginVertical = 0,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  overflow,
  padding = 0,
  paddingBottom = 0,
  paddingHorizontal = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  paddingVertical = 0,
  position,
  reverse,
  row,
  width,
  display,
  ...props
}) => {
  const { spacing } = useContext(ThemeContext);

  if (!display) {
    if (row || column) {
      display = "flex";
    } else {
      display = "block";
    }
  }

  const flexDirection = useMemo(() => {
    if (row && reverse) {
      return "row-reverse";
    }
    if (column && reverse) {
      return "column-reverse";
    } else if (column) {
      return "column";
    }
    return undefined;
  }, [column]);

  const boxHeight = useMemo(() => {
    if (height) {
      return typeof height === "string" ? height : height + "px";
    }
    return undefined;
  }, [height]);

  const boxWidth = useMemo(() => {
    if (width) {
      return typeof width === "string" ? width : width + "px";
    }
    return undefined;
  }, [width]);

  const maxBoxHeight = useMemo(() => {
    if (maxHeight) {
      return typeof maxHeight === "string" ? maxHeight : maxHeight + "px";
    }
    return undefined;
  }, [maxHeight]);

  const maxBoxWidth = useMemo(() => {
    if (maxWidth) {
      return typeof maxWidth === "string" ? maxWidth : maxWidth + "px";
    }
    return undefined;
  }, [maxWidth]);

  return (
    <StyledBox
      {...props}
      display={display}
      flexDirection={flexDirection}
      height={boxHeight}
      margin={spacing[margin || 0]}
      marginBottom={spacing[marginBottom || marginVertical || 0]}
      marginLeft={spacing[marginLeft || marginHorizontal || 0]}
      marginRight={spacing[marginRight || marginHorizontal || 0]}
      marginTop={spacing[marginTop || marginVertical || 0]}
      maxHeight={maxBoxHeight}
      maxWidth={maxBoxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
      overflow={overflow}
      padding={spacing[padding || 0]}
      paddingBottom={spacing[paddingBottom || paddingVertical || 0]}
      paddingLeft={spacing[paddingLeft || paddingHorizontal || 0]}
      paddingRight={spacing[paddingRight || paddingHorizontal || 0]}
      paddingTop={spacing[paddingTop || paddingVertical || 0]}
      position={position}
      width={boxWidth}
    >
      {children}
    </StyledBox>
  );
};

interface StyledBoxProps extends BoxProps {
  display: string;
  flexDirection?: string;
}

const StyledBox = styled.div<StyledBoxProps>`
  align-items: ${(props) => props.alignItems};
  display: ${(props) => props.display};
  flex: ${(props) => props.flex};
  flex-direction: ${(props) => props.flexDirection};
  height: ${(props) => props.height};
  justify-content: ${(props) => props.justifyContent};
  margin: ${(props) => (props.margin ? props.margin + "px" : undefined)};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom + "px" : undefined)};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft + "px" : undefined)};
  margin-right: ${(props) => (props.marginRight ? props.marginRight + "px" : undefined)};
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "px" : undefined)};
  max-height: ${(props) => props.maxHeight};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => (props.minHeight ? props.minHeight + "px" : undefined)};
  min-width: ${(props) => (props.minWidth ? props.minWidth + "px" : undefined)};
  overflow: ${(props) => props.overflow};
  padding: ${(props) => (props.padding ? props.padding + "px" : undefined)};
  padding-bottom: ${(props) => (props.paddingBottom ? props.paddingBottom + "px" : undefined)};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft + "px" : undefined)};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight + "px" : undefined)};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop + "px" : undefined)};
  position: ${(props) => props.position};
  width: ${(props) => props.width};
`;

export default Box;
