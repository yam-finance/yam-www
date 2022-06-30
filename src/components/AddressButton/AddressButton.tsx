import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import copy from "assets/copy.svg";
import confirm from "assets/copy_confirm.svg";
import { Box, Container, Spacer, useTheme } from "react-neu";
import ReactTooltip from "react-tooltip";

interface AddressButtonProps {
  name?: string;
  address?: string;
  uniswap?: boolean;
  unitext?: string;
  unilink?: string;
  to?: string;
}

const AddressButton: React.FC<AddressButtonProps> = ({
  name,
  address,
  to,
  uniswap,
  unitext,
  unilink,
}) => {
  const { darkMode } = useTheme();

  const DisplayUniswap = useMemo(() => {
    if (uniswap) {
      return (
        <>
          <StyledLink
            darkMode={darkMode}
            href={
              unilink
                ? unilink + address
                : "https://uniswap.exchange/swap?inputCurrency=" + address
            }
            target="_blank"
            color="white"
            overflow="true"
          >
            <StyledUniswapButton
              darkMode={darkMode}
              href={
                unilink
                  ? unilink + address
                  : "https://uniswap.exchange/swap?inputCurrency=" + address
              }
            >
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
    return (
      <>
        <span className="address">{address}</span>
      </>
    );
  }, [darkMode, uniswap]);

  return (
    <>
      <Box row>
        <StyledButton
          darkMode={darkMode}
          uniswap={uniswap}
          href={"https://etherscan.io/address/" + address}
          target="_blank"
        >
          <StyledName darkMode={darkMode} uniswap={uniswap}>
            {name ? name + " " : ""}
          </StyledName>
          <StyledAddress darkMode={darkMode} color="hsl(339deg 89% 49% / 100%)">
            {DisplayAddress}
          </StyledAddress>
        </StyledButton>
        <StyledCopy
          darkMode={darkMode}
          uniswap={uniswap}
          data-tip
          data-for="copyTip"
          onClick={() => {
            navigator.clipboard.writeText(address ? address : "");
          }}
        ></StyledCopy>
        <ReactTooltip
          id="copyTip"
          type="dark"
          className="tooltip"
          textColor={darkMode ? "#d1004d" : "#d1004d"}
          backgroundColor={darkMode ? "##403232" : "#f3edef"}
          arrowColor="transparent"
          place="top"
          effect="solid"
        >
          Copy Address
        </ReactTooltip>
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
  align?: string;
}

interface StyledLinkProps {
  darkMode?: boolean;
  color?: string;
  overflow?: string;
}

interface StyledAddressProps {
  darkMode?: boolean;
  color?: string;
  overflow?: string;
}

interface StyledCopyProps {
  darkMode?: boolean;
  uniswap?: boolean;
}

const StyledButton = styled.a<StyledButtonProps>`
  background: ${(props) =>
    props.darkMode
      ? "radial-gradient(circle at top,hsl(339deg 17% 15% / 20%),hsl(339deg 20% 10% / 20%))"
      : "radial-gradient(circle at top,hsl(360deg 0% 100% / 100%),hsl(360deg 0% 95% / 100%))"};
  box-shadow: ${(props) =>
    props.darkMode
      ? "-1px 1px 1px 1px hsl(339deg 20% 5% / 100%), 1px -1px 1px 1px hsl(339deg 20% 5% / 7.5%)"
      : "-1px 1px 1px 1px hsl(339deg 20% 5% / 25%), 1px -1px 1px 1px hsl(339deg 20% 5% / 7.5%);"};
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
  -webkit-justify-content: left;
  -ms-flex-pack: left;
  justify-content: space-between;
  margin: 0;
  outline: none;
  padding-left: 0px;
  padding-right: 24px;
  white-space: nowrap;
  line-height: 50px;
  min-width: 48px;
width: ${(props) => (!props.uniswap ? "fill-available" : null)};
`;

const StyledUniswapButton = styled(StyledButton)`
  color: #ffffff;
  background: radial-gradient(
      174.47% 188.91% at 1.84% 10%,
      rgb(255, 0, 122) 0%,
      rgb(6 44 97) 80%
    ),
    rgb(237, 238, 242);
  min-width: 152px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  &:hover {
    color: #ffffff;
`;

const StyledName = styled.span<StyledSpanProps>`
  text-align: left;
  color: ${(props) =>
    props.darkMode
      ? props.theme.colors.grey[100]
      : props.theme.colors.grey[700]};
  margin: 0px 5px 0px 30px;
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
    color: ${(props) =>
      !props.darkMode
        ? props.color
          ? props.theme.colors.grey[400]
          : "white"
        : "white"};
  }
`;

const StyledAddress = styled.div<StyledAddressProps>`
  cursor: pointer;
  font-weight: 700;
  color: ${(props) => (props.color ? props.color : "white")};
  overflow: ${(props) => (props.overflow === "true" ? "initial" : "hidden")};
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 5px;
`;

const StyledSpan = styled.span`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: right;
`;

const StyledCopy = styled.span<StyledCopyProps>`
  cursor: pointer;
  mask-image: url(${copy});
  -webkit-mask-image: url(${copy});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 12px;
  background-color: ${(props) =>
    props.darkMode
      ? props.theme.colors.primary.main
      : props.theme.colors.grey[500]};
  width: ${(props) => (!props.uniswap ? "32" : "50")}px;
  margin: 20px 0px 16px 20px;
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
