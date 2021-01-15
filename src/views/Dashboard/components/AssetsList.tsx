import React, { useCallback, useEffect, useState } from "react";

import numeral from "numeral";
import { Box, Card, CardContent, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";
import YamTable from "components/YamTable";
import useYam from "hooks/useYam";
import { bnToDec } from "utils";

import {
  getCurrentPrice,
  getDPIPrice,
  getYam,
  getWETH,
  getDPI,
  getUMA,
  getINDEXCOOP,
  getYUSD,
  getWETHPrice,
  getYUSDPrice,
  getYamPrice,
  getUMAPrice,
  getINDEXCOOPPrice,
  getIndexCoopLP,
} from "yam-sdk/utils";
import Split from "components/Split";
import useTreasury from "hooks/useTreasury";
import { useWallet } from "use-wallet";

const AssetsList: React.FC = () => {
  const yam = useYam();
  const { totalYUsdValue, totalDPIValue, totalWETHValue, totalIndexLPValue, totalIndexCoop, totalSushi, totalUMAValue, totalBalanceIndexCoop } = useTreasury();
  const [currentPrice, setCurrentPrice] = useState<string>();
  const [scalingFactor, setScalingFactor] = useState<string>();
  const [maxSupply, setMaxSupply] = useState<string>();
  const [marketCap, setMarketCap] = useState<string>();
  const [yusdPrice, setYUSDPrice] = useState<number>();
  const [dpiPrice, setDPIPrice] = useState<number>();
  const [wethPrice, setWETHPrice] = useState<number>();
  const [umaPrice, setUMAPrice] = useState<number>();
  const [indexCoopPrice, setIndexCoopPrice] = useState<number>();
  const [change24, setChange24] = useState<string>();
  const [change24WETH, setChange24WETH] = useState<string>();
  const [change24DPI, setChange24DPI] = useState<string>();
  const [change24UMA, setChange24UMA] = useState<string>();
  const [change24YUSD, setChange24YUSD] = useState<string>();
  const [change24IndexCoop, setChange24IndexCoop] = useState<string>();
  const { status } = useWallet();

  const fetchOnce = useCallback(async () => {
    const yamValues = await getYam();
    const wethValues = await getWETH();
    const dpiValues = await getDPI();
    const umaValues = await getUMA();
    const yusdValues = await getYUSD();
    const indexCoopValues = await getINDEXCOOP();

    const yusdPrice = await getYUSDPrice();
    const dpiPrice = await getDPIPrice();
    const wethPrice = await getWETHPrice();
    const umaPrice = await getUMAPrice();
    const indexCoopPrice = await getINDEXCOOPPrice();
    setMaxSupply(numeral(yamValues.market_data.max_supply).format("0.00a"));
    setMarketCap(numeral(yamValues.market_data.market_cap.usd).format("0.00a"));
    setChange24(numeral(yamValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
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
  }, [setMaxSupply, setMarketCap, setYUSDPrice, setDPIPrice, setChange24]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [status]);

  const fetchStats = useCallback(async () => {
    if (status === "connected") {
      if (!yam) return;
      // const price = await getCurrentPrice(yam);
      // setCurrentPrice(numeral(bnToDec(price)).format("0.00a"));
      const price = await getYamPrice();
      setCurrentPrice(numeral(price).format("0.00a"));
    }
  }, [yam, setCurrentPrice, setScalingFactor]);

  useEffect(() => {
    fetchStats();
    let refreshInterval = setInterval(fetchStats, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchStats, yam]);

  const assetYUSD = (totalYUsdValue || 0) * (yusdPrice || 0);
  const assetDPI = (totalDPIValue || 0) * (dpiPrice || 0);
  const assetWETH = (totalWETHValue || 0) * (wethPrice || 0);
  const assetUMA = (totalUMAValue || 0) * (umaPrice || 0);
  const assetIndex = totalIndexCoop ? totalIndexCoop : 0;
  const assetIndexLP = totalIndexLPValue ? totalIndexLPValue : 0;
  const assetIndexBalance = (totalBalanceIndexCoop || 0) * (indexCoopPrice || 0);
  const treasuryAssets = assetYUSD + assetDPI + assetWETH + assetIndexLP + assetIndex + totalSushi + assetUMA;
  const treasuryValue = typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0 ? "~$" + numeral(treasuryAssets).format("0.00a") : "--";

  const columns = [
    {
      id: 'token_name',
      title: 'Token Name'
    },
    {
      id: 'symbol',
      title: 'Symbol'
    },
    {
      id: 'quantity',
      title: 'Quantity'
    },
    {
      id: 'token_price',
      title: 'Token Price($)'
    },
    {
      id: 'change',
      title: 'Change (24h)'
    },
    {
      id: 'value_in_usd',
      title: 'Value in USD($)'
    }
  ];

  const rows = [
    {
      id: 1,
      cells: [
        {
          id: 'token_name',
          value: 'DefiPulse Index',
          classes: '',
          icon: ''
        },
        {
          id: 'symbol',
          value: 'DPI',
          classes: 'font-bold',
          icon: ''
        },
        {
          id: 'quantity',
          value: numeral(totalDPIValue).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'token_price',
          value: '$' + numeral(dpiPrice).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'change',
          value: change24DPI,
          classes: '',
          icon: ''
        },
        {
          id: 'value_in_usd',
          value: '$' + numeral(assetDPI).format("0,0.00"),
          classes: '',
          icon: ''
        }
      ]
    },
    {
      id: 2,
      cells: [
        {
          id: 'token_name',
          value: 'Index',
          classes: '',
          icon: ''
        },
        {
          id: 'symbol',
          value: 'INDEX',
          classes: 'font-bold',
          icon: ''
        },
        {
          id: 'quantity',
          value: numeral(totalBalanceIndexCoop).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'token_price',
          value: '$' + numeral(indexCoopPrice).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'change',
          value: change24IndexCoop,
          classes: '',
          icon: ''
        },
        {
          id: 'value_in_usd',
          value: '$' + numeral(assetIndexBalance).format("0,0.00"),
          classes: '',
          icon: ''
        }
      ]
    },
    {
      id: 3,
      cells: [
        {
          id: 'token_name',
          value: 'UMA Voting Token',
          classes: '',
          icon: ''
        },
        {
          id: 'symbol',
          value: 'UMA',
          classes: 'font-bold',
          icon: ''
        },
        {
          id: 'quantity',
          value: numeral(totalUMAValue).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'token_price',
          value: '$' + numeral(umaPrice).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'change',
          value: change24UMA,
          classes: '',
          icon: ''
        },
        {
          id: 'value_in_usd',
          value: '$' + numeral(assetUMA).format("0,0.00"),
          classes: '',
          icon: ''
        }
      ]
    },
    {
      id: 4,
      cells: [
        {
          id: 'token_name',
          value: 'Wrapped Ether',
          classes: '',
          icon: ''
        },
        {
          id: 'symbol',
          value: 'WETH',
          classes: 'font-bold',
          icon: ''
        },
        {
          id: 'quantity',
          value: numeral(totalWETHValue).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'token_price',
          value: '$' + numeral(wethPrice).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'change',
          value: change24WETH,
          classes: '',
          icon: ''
        },
        {
          id: 'value_in_usd',
          value: '$' + numeral(assetWETH).format("0,0.00"),
          classes: '',
          icon: ''
        }
      ]
    },
    {
      id: 5,
      cells: [
        {
          id: 'token_name',
          value: 'yearn Curve',
          classes: '',
          icon: ''
        },
        {
          id: 'symbol',
          value: 'yyDAI+',
          classes: 'font-bold',
          icon: ''
        },
        {
          id: 'quantity',
          value: numeral(totalYUsdValue).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'token_price',
          value: '$' + numeral(yusdPrice).format("0,0.000000"),
          classes: '',
          icon: ''
        },
        {
          id: 'change',
          value: change24YUSD,
          classes: '',
          icon: ''
        },
        {
          id: 'value_in_usd',
          value: '$' + numeral(assetYUSD).format("0,0.00"),
          classes: '',
          icon: ''
        }
      ]
    },
  ];

  return (
    <YamTable columns={columns} rows={rows} />
  );
};

export default AssetsList;
