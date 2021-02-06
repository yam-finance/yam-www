import React, { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

import { Card, CardContent, Spacer, CardTitle, Surface, Separator, Button } from "react-neu";

import { AssetEntry, StyledAssetContentInner } from "./Asset";

import SeparatorGrid from "components/SeparatorWithCSS";
import Box from "components/BoxWithDisplay";
import styled from "styled-components";
import YamLoader from "components/YamLoader";

interface AssetsListProps {
  assets: any
}

const AssetsList: React.FC<AssetsListProps> = ({assets}) => {

  const [csvData, setCSVData] = useState<any>([]);

  useEffect(() => {
    const csvData = [];
    csvData.push(["Token Name", "Symbol", "Quantity", "Token Price($)", "Change(24h)","Value in USD($)"]);
    if (assets) {
      assets.forEach((asset:any) => {
        csvData.push([asset.name, asset.index, asset.quantity, asset.price, asset.change, asset.value]);
      });
    }
    setCSVData(csvData);
  }, [assets]);

  return (
    <>
      <Spacer size="md" />
      <Card>
        <Box row alignItems="center" justifyContent="space-between" marginLeft={5} marginRight={5}>
          <Box justifyContent="center" width="100%">
            <CardTitle text="💰 Treasury Assets" />
          </Box>
          <CSVLink data={csvData} filename={"Assets.csv"} onClick={() => {
            if (!assets) {
              return false;
            }
          }}>
            <Button disabled={!assets} size="sm" text="Download" variant="tertiary" />
          </CSVLink>
        </Box>
        <Spacer size="sm" />
        <div style={{overflow: "auto"}}>
          <CardContent>
            <Box display="grid" alignItems="center" paddingLeft={4} paddingRight={4} paddingBottom={1} row>
              <StyledAssetContentInner>
                <StyledTokenNameMain>Token Name</StyledTokenNameMain>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
                <StyledSymbolMain>Symbol</StyledSymbolMain>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
                <StyledQuantityMain>Quantity</StyledQuantityMain>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
                <StyledPriceMain>Token Price($)</StyledPriceMain>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer4"} />
                <StyledChangeMain>Change(24h)</StyledChangeMain>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer5"} />
                <StyledValueMain>Value in USD($)</StyledValueMain>
              </StyledAssetContentInner>
            </Box>
            <Spacer size="sm" />
            {assets ? (
              <>
                {/* <Surface> */}
                <>
                  {assets.map((asset:any, i:any) => {
                    if (i === 0) {
                      return <AssetEntry key={"asset" + i} prop={asset} />;
                    } else {
                      return [<Separator key={"seperator" + i} />, <AssetEntry key={"asset" + i} prop={asset} />];
                    }
                  })}
                </>
                {/* </Surface> */}
              </>
            ): (
              <>
                <YamLoader space={320}></YamLoader>
              </>
            )}
          </CardContent>
        </div>
      </Card>
    </>
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

export default AssetsList;
