import React, { useCallback, useMemo, useState, Fragment } from "react";

import SeparatorGrid from "components/SeparatorWithCSS";
import Box from "components/BoxWithDisplay";

import styled from "styled-components";
import numeral from "numeral";

interface ProposalProps {
  prop: any;
}

export const AssetEntry: React.FC<ProposalProps> = ({ prop }) => {
  return (
    <Fragment>
      <Box display="grid" alignItems="center" padding={4} row>
        <StyledAssetContentInner>
          <StyledTokenNameMain>
            <Box alignItems="center" row>
              <img alt="token-icon" src={prop.icon} style={{ height: 24, marginRight: 10 }}></img>
              {prop.name}
            </Box>
          </StyledTokenNameMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
          <StyledSymbolMain>{prop.index}</StyledSymbolMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
          <StyledQuantityMain>{numeral(prop.quantity).format("0,0.00")}</StyledQuantityMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
          <StyledPriceMain>{"$" + numeral(prop.price).format("0,0.00")}</StyledPriceMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer4"} />
          <StyledChangeMain>{numeral(prop.change).format("0.00a") + "%"}</StyledChangeMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer5"} />
          <StyledValueMain>{"$" + numeral(prop.value).format("0,0.00")}</StyledValueMain>
        </StyledAssetContentInner>
      </Box>
    </Fragment>
  );
};

export const StyledTokenNameMain = styled.span`
  font-weight: 600;
  display: grid;
  grid-area: name;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledSymbolMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: symbol;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledQuantityMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: quantity;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledPriceMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: price;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledChangeMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: change;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledValueMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: value;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledAssetContentInner = styled.div`
  align-items: center;
  display: grid;
  min-width: 768px;
  grid-template-columns: 20fr 5px 10fr 5px 20fr 5px 20fr 5px 12fr 5px 18fr;
  grid-template-areas: "name spacer1 symbol spacer2 quantity spacer3 price spacer4 change spacer5 value";
  grid-template-rows: 100fr;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;
