import React, { useCallback, useEffect, useState } from "react";

import numeral from "numeral";
import { Card, CardContent, Spacer, CardTitle, Surface, Separator } from "react-neu";

import { AssetEntry, StyledAssetContentInner } from "./Asset";

import SeparatorGrid from "./SeparatorWithCSS";
import Box from "./BoxWithDisplay";
import styled from "styled-components";

import {
  getDPIPrice,
  getWETHPrice,
  getYUSDPrice,
  getUMAPrice,
  getINDEXCOOPPrice,
  getValue
} from "yam-sdk/utils";
import useTreasury from "hooks/useTreasury";
import { useWallet } from "use-wallet";

const AssetsList: React.FC = () => {
  const { totalYUsdValue, totalDPIValue, totalWETHValue, totalUMAValue, totalBalanceIndexCoop } = useTreasury();
  const [yusdPrice, setYUSDPrice] = useState<number>();
  const [dpiPrice, setDPIPrice] = useState<number>();
  const [wethPrice, setWETHPrice] = useState<number>();
  const [umaPrice, setUMAPrice] = useState<number>();
  const [indexCoopPrice, setIndexCoopPrice] = useState<number>();
  const [change24WETH, setChange24WETH] = useState<string>();
  const [change24DPI, setChange24DPI] = useState<string>();
  const [change24UMA, setChange24UMA] = useState<string>();
  const [change24YUSD, setChange24YUSD] = useState<string>();
  const [change24IndexCoop, setChange24IndexCoop] = useState<string>();
  const { status } = useWallet();

  const fetchOnce = useCallback(async () => {
    const wethValues = await getValue('weth');
    const dpiValues = await getValue('defipulse-index');
    const umaValues = await getValue('uma');
    const yusdValues = await getValue('yvault-lp-ycurve');
    const indexCoopValues = await getValue('index-cooperative');

    const yusdPrice = await getYUSDPrice();
    const dpiPrice = await getDPIPrice();
    const wethPrice = await getWETHPrice();
    const umaPrice = await getUMAPrice();
    const indexCoopPrice = await getINDEXCOOPPrice();
    setChange24WETH(numeral(wethValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24DPI(numeral(dpiValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24UMA(numeral(umaValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24YUSD(numeral(yusdValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setChange24IndexCoop(numeral(indexCoopValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setYUSDPrice(yusdPrice);
    setDPIPrice(dpiPrice);
    setWETHPrice(wethPrice);
    setUMAPrice(umaPrice);
    setIndexCoopPrice(indexCoopPrice);
  }, [setYUSDPrice, setDPIPrice, setWETHPrice, setIndexCoopPrice, setUMAPrice]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [fetchOnce, status]);

  const assetYUSD = (totalYUsdValue || 0) * (yusdPrice || 0);
  const assetDPI = (totalDPIValue || 0) * (dpiPrice || 0);
  const assetWETH = (totalWETHValue || 0) * (wethPrice || 0);
  const assetUMA = (totalUMAValue || 0) * (umaPrice || 0);
  const assetIndexBalance = (totalBalanceIndexCoop || 0) * (indexCoopPrice || 0);

  const assets = [
    {
      name: "DefiPulse Index",
      index: "DPI",
      quantity: numeral(totalDPIValue).format("0,0.00"),
      price: "$" + numeral(dpiPrice).format("0,0.00"),
      change: change24DPI,
      value: "$" + numeral(assetDPI).format("0,0.00"),
    },
    {
      name: "Index",
      index: "INDEX",
      quantity: numeral(totalBalanceIndexCoop).format("0,0.00"),
      price: "$" + numeral(indexCoopPrice).format("0,0.00"),
      change: change24IndexCoop,
      value: "$" + numeral(assetIndexBalance).format("0,0.00"),
    },
    {
      name: "UMA Voting Token",
      index: "UMA",
      quantity: numeral(totalUMAValue).format("0,0.00"),
      price: "$" + numeral(umaPrice).format("0,0.00"),
      change: change24UMA,
      value: "$" + numeral(assetUMA).format("0,0.00"),
    },
    {
      name: "Wrapped Ether",
      index: "WETH",
      quantity: numeral(totalWETHValue).format("0,0.00"),
      price: "$" + numeral(wethPrice).format("0,0.00"),
      change: change24WETH,
      value: "$" + numeral(assetWETH).format("0,0.00"),
    },
    {
      name: "yearn Curve",
      index: "yyDAI+",
      quantity: numeral(totalYUsdValue).format("0,0.00"),
      price: "$" + numeral(yusdPrice).format("0,0.00"),
      change: change24YUSD,
      value: "$" + numeral(assetYUSD).format("0,0.00"),
    },
  ];

  return (
    <>
      <Spacer size="lg" />
      <Card>
        <CardTitle text="💰 Treasury Assets" />
        <Spacer size="sm" />
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
          {assets && (
            <Surface>
              {assets.map((asset, i) => {
                if (i === 0) {
                  return <AssetEntry key={"asset" + i} prop={asset} />;
                } else {
                  return [<Separator key={"seperator" + i} />, <AssetEntry key={"asset" + i} prop={asset} />];
                }
              })}
            </Surface>
          )}
        </CardContent>
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
