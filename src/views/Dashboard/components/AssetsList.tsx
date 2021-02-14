import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import numeral from "numeral";

import { Card, CardContent, Spacer, CardTitle, Separator, Button } from "react-neu";

import { AssetEntry, StyledAssetContentInner } from "./Asset";

import SeparatorGrid from "components/SeparatorWithCSS";
import Box from "components/BoxWithDisplay";
import styled from "styled-components";
import YamLoader from "components/YamLoader";

interface AssetsListProps {
  assetsData: any
}

const AssetsList: React.FC<AssetsListProps> = ({assetsData}) => {

  const [csvData, setCSVData] = useState<any>([]);
  const assets = assetsData?.sort((a:any,b:any):number => {
    if (a.number > b.number) return -1;
    if (a.number < b.number) return 1;
    return 0;
  });

  useEffect(() => {
    const csvData = [];
    csvData.push([moment().format("dddd , Do MMMM YYYY")]);
    csvData.push(["Token Name", "Symbol", "Quantity", "Token Price($)", "Change(24h)","Value in USD($)"]);
    let treasuryAssets = 0;
    if (assets) {
      assets.forEach((asset:any) => {
        csvData.push([asset.name, asset.index, asset.quantity, asset.price, asset.change, asset.value]);
        treasuryAssets += asset.number;
      });
    }
    csvData.push(["Total Assets", "$" + numeral(treasuryAssets).format("0,0.00")]);
    setCSVData(csvData);
  }, [assets]);

  return (
    <>
      <Spacer size="md" />
      <Card>
        <StyledBox row alignItems="center" justifyContent="space-between" marginLeft={5} marginRight={5}>
          <Box justifyContent="center" width="100%">
            <CardTitle text="💰 Treasury Assets" />
          </Box>
          <CSVLink data={csvData} filename={"Assets" + moment().format("DD-MM-YYYY") +".csv"} onClick={() => {
            if (!assets) {
              return false;
            }
          }}>
            <StyledButton>
              <Button disabled={!assets} size="sm" text="💾" variant="tertiary" />
            </StyledButton>
          </CSVLink>
        </StyledBox>
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
                {assets.map((asset:any, i:any) => {
                  if (i === 0) {
                    return <AssetEntry key={"asset" + i} prop={asset} />;
                  } else {
                    return [<Separator key={"seperator" + i} />, <AssetEntry key={"asset" + i} prop={asset} />];
                  }
                })}
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

export const StyledButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  @media (max-width: 768px) {
    right: 0;
  }
`;

export const StyledBox = styled(Box)`
  position: relative;
`;

export default AssetsList;
