import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import copy from "assets/copy.svg";
import confirm from "assets/copy_confirm.svg";
import { Box, Container, Spacer, useTheme } from "react-neu";

interface AddressButtonProps {
  name?: string;
  address?: string;
  uniswap?: boolean;
  unitext?: string;
  unilink?: string;
  to?: string;
}

const AddressButton: React.FC<AddressButtonProps> = ({ name, address, to, uniswap, unitext, unilink }) => {
  const { darkMode } = useTheme();

  const DisplayUniswap = useMemo(() => {
    if (uniswap) {
      return (
        <>
          <Spacer />
          <StyledLink
            darkMode={darkMode}
            href={unilink ? unilink + address : "https://uniswap.exchange/swap?inputCurrency=" + address}
            target="_blank"
            color="white"
            overflow="true"
          >
            <StyledUniswapButton darkMode={darkMode}>
              <StyledSpan>
                <span>{unitext ? unitext : "Buy at Uniswap"}</span>
              </StyledSpan>
            </StyledUniswapButton>
          </StyledLink>
        </>
      );
    }
  }, [darkMode, uniswap]);

  const DisplayAddress = useMemo(() => {
    if (uniswap) {
      return (
        <>
          <span className="address combine">
            <AddressStart>{address}</AddressStart>
            <AddressEnd>{address}</AddressEnd>
          </span>
        </>
      );
    } else {
      return (
        <>
          <span className="address">{address}</span>
        </>
      );
    }
  }, [darkMode, uniswap]);

  return (
    <>
      <Box row>
        <StyledButton darkMode={darkMode} uniswap={uniswap}>
          <StyledSpan>
            <StyledName darkMode={darkMode} uniswap={uniswap}>
              {name ? name + " " : ""}
            </StyledName>
            <StyledLink darkMode={darkMode} color="hsl(339deg 89% 49% / 100%)" href={"https://etherscan.io/address/" + address} target="_blank">
              {DisplayAddress}
            </StyledLink>
            <StyledCopy
              darkMode={darkMode}
              uniswap={uniswap}
              onClick={() => {
                navigator.clipboard.writeText(address ? address : "");
              }}
            ></StyledCopy>
          </StyledSpan>
        </StyledButton>
        {DisplayUniswap}
      </Box>
      <Spacer />
    </>
  );
};

interface StyledButtonProps {
  to?: string;
  darkMode?: boolean;
  uniswap?: boolean;
}

interface StyledSpanProps {
  darkMode?: boolean;
  uniswap?: boolean;
}

interface StyledLinkProps {
  darkMode?: boolean;
  color?: string;
  overflow?: string;
}

interface StyledCopyProps {
  darkMode?: boolean;
  uniswap?: boolean;
}

const StyledButton = styled.div<StyledButtonProps>`
  background: ${(props) =>
    props.darkMode
      ? "radial-gradient(circle at top,hsl(339deg 17% 15% / 100%),hsl(339deg 20% 10% / 100%))"
      : "radial-gradient(circle at top,hsl(338deg 20% 96% / 100%),hsl(338deg 20% 94% / 100%))"};
  box-shadow: ${(props) =>
    props.darkMode
      ? "-8px 8px 16px 0 hsl(339deg 20% 5% / 100%), 8px -8px 16px 0px hsl(339deg 100% 100% / 7.5%)"
      : "-8px 8px 16px 0 hsl(338deg 95% 4% / 15%), 8px -8px 16px 0px hsl(338deg 100% 100% / 100%);"};
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 0;
  border-radius: 28px;
  box-sizing: border-box;
  color: hsl(339deg 89% 49% / 100%);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0;
  outline: none;
  padding-left: 24px;
  padding-right: 24px;
  white-space: nowrap;
  line-height: 50px;
  min-width: 48px;
  width: ${(props) => (!props.uniswap ? "-webkit-fill-available" : null)};
`;

const StyledUniswapButton = styled(StyledButton)`
  border-radius: 9px;
  color: #ffffff;
  background: radial-gradient(174.47% 188.91% at 1.84% 10%, rgb(255, 0, 122) 0%, rgb(6 44 97) 80%), rgb(237, 238, 242);
  min-width: 152px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledName = styled.span<StyledSpanProps>`
  color: ${(props) => (props.darkMode ? props.theme.colors.grey[100] : props.theme.colors.grey[400])};
  margin: 0px 5px 0px 0px;
  min-width: ${(props) => (!props.uniswap ? "85" : "45")}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledLink = styled.a<StyledLinkProps>`
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : "white")};
  overflow: ${(props) => (props.overflow === "true" ? "initial" : "hidden")};
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 5px;
  &:hover {
    color: ${(props) => (!props.darkMode ? (props.color ? props.theme.colors.grey[400] : "white") : "white")};
  }
`;

const StyledSpan = styled.span`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledCopy = styled.span<StyledCopyProps>`
  cursor: pointer;
  mask-image: url(${copy});
  -webkit-mask-image: url(${copy});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 12px;
  background-color: ${(props) => (props.darkMode ? props.theme.colors.primary.main : props.theme.colors.grey[500])};
  width: ${(props) => (!props.uniswap ? "32" : "50")}px;
  margin: 20px 0px 16px 5px;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    -webkit-mask-image: url(${confirm});
    mask-image: url(${confirm});
    opacity: 1;
  }
`;

const AddressStart = styled.span`
  display: inline-block;
  width: calc(50% + 22px);
  text-overflow: ellipsis;
`;

const AddressEnd = styled.span`
  display: inline-flex;
  width: calc(50% - 28px);
  justify-content: flex-end;
`;

export default AddressButton;
