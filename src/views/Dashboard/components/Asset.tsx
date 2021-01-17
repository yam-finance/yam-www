import React, { useCallback, useMemo, useState, Fragment } from "react";

import SeparatorGrid from "./SeparatorWithCSS";
import Box from "./BoxWithDisplay";

import styled from "styled-components";

interface ProposalProps {
  prop: any;
}

export const AssetEntry: React.FC<ProposalProps> = ({ prop }) => {
  return (
    <Fragment>
      <Box display="grid" alignItems="center" padding={4} row>
        <StyledAssetContentInner>
          <StyledTokenNameMain>{prop.name}</StyledTokenNameMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
          <StyledSymbolMain>{prop.index}</StyledSymbolMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
          <StyledQuantityMain>{prop.quantity}</StyledQuantityMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
          <StyledPriceMain>{prop.price}</StyledPriceMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer4"} />
          <StyledChangeMain>{prop.change}</StyledChangeMain>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer5"} />
          <StyledValueMain>{prop.value}</StyledValueMain>
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
  grid-template-columns: 20fr 5px 10fr 5px 20fr 5px 20fr 5px 12fr 5px 18fr;
  grid-template-areas: "name spacer1 symbol spacer2 quantity spacer3 price spacer4 change spacer5 value";
  grid-template-rows: 100fr;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;
