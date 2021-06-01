import React, { Fragment } from "react";

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
          <StyledField gridArea={"symbol"}>{prop.index}</StyledField>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
          <StyledField gridArea={"quantity"}>{numeral(prop.quantity).format("0,0.00")}</StyledField>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
          <StyledField gridArea={"price"}>{"$" + numeral(prop.price).format("0,0.00")}</StyledField>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer4"} />
          <StyledField gridArea={"change"}>{numeral(prop.change).format("0.00a") + "%"}</StyledField>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer5"} />
          <StyledField gridArea={"value"}>{"$" + numeral(prop.value).format("0,0.00")}</StyledField>
        </StyledAssetContentInner>
      </Box>
    </Fragment>
  );
};

interface StyledFieldProps {
  gridArea?: string;
}

export const StyledTokenNameMain = styled.span`
  font-weight: 600;
  display: grid;
  grid-area: name;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

const StyledField = styled.span<StyledFieldProps>`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: ${(props) => props.gridArea};
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
