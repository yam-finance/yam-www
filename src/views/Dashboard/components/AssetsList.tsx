import React, { useState, useEffect, useMemo } from "react";
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

const useSortableData = (items:any, config = null) => {
  const [sortConfig, setSortConfig] = useState<any>(config);
  
  const sortedItems = useMemo(() => {
    let sortableItems = items;
    if (sortConfig !== null) {
      sortableItems.sort((a:any, b:any) => {
        if (a[sortConfig?.key] < b[sortConfig?.key]) {
          return sortConfig?.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig?.key] > b[sortConfig?.key]) {
          return sortConfig?.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: any) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort, sortConfig };
}

const AssetsList: React.FC<AssetsListProps> = ({assetsData}) => {

  const [csvData, setCSVData] = useState<any>([]);
  const [treasuryAssets, setTreasuryAssets] = useState<any>(0);
  const assets = assetsData?.sort((a:any,b:any):number => {
    if (a.value > b.value) return -1;
    if (a.value < b.value) return 1;
    return 0;
  });
  const { items, requestSort, sortConfig } = useSortableData(assets);

  useEffect(() => {
    const csvData = [];
    csvData.push([moment().format("dddd , Do MMMM YYYY")]);
    csvData.push(["Token Name", "Symbol", "Quantity", "Token Price($)", "Change(24h)","Value in USD($)"]);
    let treasuryAssets = 0;
    if (assets) {
      assets.forEach((asset:any) => {
        csvData.push([
          asset.name, 
          asset.index, 
          numeral(asset.quantity).format("0,0.00"),
          "$" + numeral(asset.price).format("0,0.00"),
          numeral(asset.change).format("0.00a") + "%",
          "$" + numeral(asset.value).format("0,0.00")
        ]);
        treasuryAssets += asset.value;
      });
    }
    csvData.push(["Total Assets", "$" + numeral(treasuryAssets).format("0,0.00")]);
    setTreasuryAssets(treasuryAssets);
    setCSVData(csvData);
  }, [assets]);

  return (
    <>
      <Spacer size="md" />
      <Card>
        <StyledBox row alignItems="center" justifyContent="space-between" marginLeft={5} marginRight={5}>
          <StyledTotalLabel>
            {"Total: $" + numeral(treasuryAssets).format("0,0.00")}
          </StyledTotalLabel>
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
                <StyledTokenNameMain onClick={() => requestSort('name')}>Token Name</StyledTokenNameMain>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
                <StyledField gridArea={"symbol"} onClick={() => requestSort('index')}>Symbol</StyledField>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
                <StyledField gridArea={"quantity"} onClick={() => requestSort('quantity')}>Quantity</StyledField>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
                <StyledField gridArea={"price"} onClick={() => requestSort('price')}>Token Price($)</StyledField>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer4"} />
                <StyledField gridArea={"change"} onClick={() => requestSort('change')}>Change(24h)</StyledField>
                <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer5"} />
                <StyledField gridArea={"value"} onClick={() => requestSort('value')}>Value in USD($)</StyledField>
              </StyledAssetContentInner>
            </Box>
            <Spacer size="sm" />
            {items ? (
              <>
                {items.map((asset:any, i:any) => {
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

interface StyledFieldProps {
  gridArea?: string;
}

const StyledTokenNameMain = styled.span`
  font-weight: 600;
  display: grid;
  cursor: pointer;
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
  cursor: pointer;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

const StyledButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  @media (max-width: 768px) {
    right: 0;
  }
`;

const StyledTotalLabel = styled.div`
  position: absolute;
  left: 20px;
  top: 30px;
  @media (max-width: 768px) {
    left: 0;
    top: 47px;
  }
`;

const StyledBox = styled(Box)`
  position: relative;
`;

export default AssetsList;
