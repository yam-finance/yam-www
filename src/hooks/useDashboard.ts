import useTreasury from "hooks/useTreasury";
import useYam from "hooks/useYam";
import { useWallet } from "use-wallet";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "react-neu";

import { SeriesInterface, TimeSeries } from "types/Charts";

import {
  getYam,
} from "yam-sdk/utils";
import numeral from "numeral";

const useDahsboard = () => {
  const yam = useYam();
  const { status } = useWallet();
  const { darkMode } = useTheme();
  const { treasuryValue } = useTreasury();
  const [assetsData, setAssetsData] = useState<Object[]>();
  const [assetsColors, setAssetsColors] = useState<any>();
  const [yamObject, setYamObject] = useState<any>();

  const fetchReserves = useCallback(async (from) => {
    if (!yam) {
      return;
    }

    const yamValues = await getYam();

    // const assetsHistory = await getAssetsHistory();
    // const currentBlock = (await getCurrentBlock(yam)).number;

    // const wethValues = await getValue("weth");
    // const dpiValues = await getValue("defipulse-index");
    // const umaValues = await getValue("uma");
    // const yusdValues = await getValue("yvault-lp-ycurve");
    // const sushiValues = await getValue("sushi");
    // const indexCoopValues = await getValue("index-cooperative");

    // const wethPrice = wethValues.market_data.current_price.usd;
    // const yusdPrice = yusdValues.market_data.current_price.usd;
    // const dpiPrice = dpiValues.market_data.current_price.usd;
    // const indexPrice = indexCoopValues.market_data.current_price.usd;
    // const sushiPrice = sushiValues.market_data.current_price.usd;
    // const umaPrice = umaValues.market_data.current_price.usd;
    // const yamHousePrice = await getYamHousePrice() || 0;

    // const DPIBalance = totalDPIValue;
    // // const indexCoopLP = await getIndexCoopLP(yam);
    // const indexCoopLPRewards = (await getIndexCoopLPRewards(yam)) || 0;
    // const SushiRewards = (await getSushiRewards(yam)) || 0;

    // const change24WETH = wethValues?.market_data.price_change_percentage_24h_in_currency.usd;
    // const change24DPI = dpiValues?.market_data.price_change_percentage_24h_in_currency.usd;
    // const change24UMA = umaValues?.market_data.price_change_percentage_24h_in_currency.usd;
    // const change24YUSD = yusdValues?.market_data.price_change_percentage_24h_in_currency.usd;
    // const change24IndexCoop = indexCoopValues?.market_data.price_change_percentage_24h_in_currency.usd;
    // const change24Sushi = sushiValues?.market_data.price_change_percentage_24h_in_currency.usd;
    // const cahnge24YAMHOUSE = 0;

    // const reservesHistory = [];
    // const assetsColors = [];

    // for (let blockNumber in assetsHistory.WETH) {
    //   if (blockNumber === 'color') {
    //     for (let assetKey in assetsHistory) {
    //       if (hasKey(assetsHistory, assetKey)) {
    //         assetsColors.push(assetsHistory[assetKey]['color']);
    //       }
    //     }
    //   } else {
    //     const historyObject: {[K: string]: any} = {
    //       info: blockNumber !== 'latest' ? ("Block " + blockNumber) : "present",
    //       block: blockNumber !== 'latest' ? blockNumber : currentBlock + 5000,
    //     };
    //     for (let assetKey in assetsHistory) {
    //       if (hasKey(assetsHistory, assetKey)) {
    //         if (hasKey(assetsHistory[assetKey], blockNumber)) {
    //           const value:any = assetsHistory[assetKey][blockNumber];
    //           historyObject[assetKey] = blockNumber !== 'latest' ? value.value : value;
    //         } else {
    //           historyObject[assetKey] = 0;
    //         }
    //       }
    //     }
    //     reservesHistory.push(historyObject);
    //   }
    // }


    // let now = Math.floor(Date.now() / 1000);
    // let reserves: TimeSeries[] = [];
    // let reservesDPI: TimeSeries[] = [];
    // let reservesETH: TimeSeries[] = [];
    // let reservesINDEXLP: TimeSeries[] = [];
    // let reservesINDEX: TimeSeries[] = [];
    // let reservesUMA: TimeSeries[] = [];
    // let reservesYAMHOUSE: TimeSeries[] = [];
    // let reservesSushi: TimeSeries[] = [];
    // let running = 0;
    // for (let i = 0; i < treasuryValues.reservesAdded.length; i++) {
    //   running += treasuryValues.reservesAdded[i];
    //   // if (treasuryValues.blockNumbers[i] > 10946646) { // live remove (only for reserves)
    //   //   const tmp: TimeSeries = {
    //   //     // x: treasuryValues.blockNumbers[i],
    //   //     x: treasuryValues.blockTimes[i],
    //   //     y: totalYUsdValue * yUSDRate, // get pastEvents on blocknumber 11133885 (1603739830) for yUSD in reserve
    //   //   };
    //   //   reserves.push(tmp);
    //   // } else {
    //   // }
    //   if (
    //     treasuryValues.blockNumbers[i] <= 11133885
    //     // && treasuryValues.blockNumbers[i] >= currentBlock
    //   ) {
    //     const tmp: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: running * yusdPrice,
    //     };
    //     reserves.push(tmp);

    //     const tmpDPI: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesDPI.push(tmpDPI);

    //     const tmpETH: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesETH.push(tmpETH);

    //     const tmpINDEXLP: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesINDEXLP.push(tmpINDEXLP);

    //     const tmpINDEX: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesINDEX.push(tmpINDEX);

    //     const tmpXSushi: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesSushi.push(tmpXSushi);

    //     const tmpUMA: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesUMA.push(tmpUMA);

    //     const tmpYAMHOUSE: TimeSeries = {
    //       x: treasuryValues.blockNumbers[i],
    //       y: 0,
    //     };
    //     reservesYAMHOUSE.push(tmpYAMHOUSE);
    //   }
    // }

    // for (let i = 0; i < reservesHistory.length; i++) {
    //   reserves.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].yUSD,
    //   });
    //   reservesDPI.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].DPI,
    //   });
    //   reservesETH.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].WETH,
    //   });
    //   reservesINDEXLP.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].INDEXLP,
    //   });
    //   reservesINDEX.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].INDEX,
    //   });
    //   reservesSushi.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].Sushi,
    //   });
    //   reservesUMA.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].UMA,
    //   });
    //   reservesYAMHOUSE.push({
    //     x: reservesHistory[i].block,
    //     y: reservesHistory[i].YamHouse,
    //   });
    // }

    // const series: SeriesInterface[] = [
    //   {
    //     name: "yUSD Reserves",
    //     data: reserves ? reserves.slice(reserves.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "DPI Reserves",
    //     data: reservesDPI ? reservesDPI.slice(reservesDPI.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "ETH Reserves",
    //     data: reservesETH ? reservesETH.slice(reservesETH.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "Sushi Gains",
    //     data: reservesSushi ? reservesSushi.slice(reservesSushi.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "INDEX Coop LP",
    //     data: reservesINDEXLP ? reservesINDEXLP.slice(reservesINDEXLP.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "INDEX Coop Gains",
    //     data: reservesINDEX ? reservesINDEX.slice(reservesINDEX.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "UMA Voting Token",
    //     data: reservesUMA ? reservesUMA.slice(reservesUMA.length - (defaultRange + 6)) : [],
    //   },
    //   {
    //     name: "Yam DAO House",
    //     data: reservesYAMHOUSE ? reservesYAMHOUSE.slice(reservesYAMHOUSE.length - (defaultRange + 6)) : [],
    //   },
    // ];

    // "dpi": "", : {change: '11.47917', name: 'DefiPulse Index', price: 92.42, quantity: 3259.97, symbol: 'DPI', …}
    // "ethdpi": "", : {change: '0', name: 'ETH/DPI Liquidity', price: 795.97, quantity: 326.52, symbol: 'ETHDPILP', …}
    // "gtc": "", : {change: '8.92984', name: 'Gitcoin', price: 2.34, quantity: 5817, symbol: 'GTC', …}
    // "index": "", : {change: '1.51998', name: 'Index', price: 3.15, quantity: 17183.28, symbol: 'INDEX', …}
    // "steth": "", : {change: '12.45403', name: 'Staked ETH', price: 1178.16, quantity: 123.78, symbol: 'stETH', …}
    // "sushi": "", : {change: '14.24116', name: 'Sushi', price: 1.41, quantity: 5182.04, symbol: 'SUSHI', …}
    // "uma": "", : {change: '2.95196', name: 'UMA Voting Token V1', price: 2.61, quantity: 41091.58, symbol: 'UMA', …}
    // "usdc": "", : {change: '-0.09751', name: 'USD Coin', price: 1, quantity: 69862.51, symbol: 'USDC', …}
    // "wbtc": "", : {change: '11.97473', name: 'Wrapped Bitcoin', price: 20848, quantity: 2.06, symbol: 'WBTC', …}
    // "weth": "", : {change: '11.97473', name: 'Wrapped Ether', price: 1217.07, quantity: 559.74, symbol: 'WETH', …}
    // "xsushi": "", : {change: '15.35026', name: 'X Sushi', price: 1.86, quantity: 34032.69, symbol: 'XSUSHI', …}
    // "yam": "", : {change: '10.27196', name: 'Yam', price: 0.11, quantity: 240537.29, symbol: 'YAM', …}
    // "yvusdc": "", : {change: '0', name: 'USDC yVault', price: 1, quantity: 1570602.75, symbol: 'yvUSDC', …}

    const assetsIcons:any = {
      "dpi": "https://assets.coingecko.com/coins/images/12465/small/defi_pulse_index_set.png",
      "ethdpilp": "https://assets.coingecko.com/coins/images/12729/small/index.png",
      "gtc": "https://assets.coingecko.com/coins/images/15810/small/gitcoin.png",
      "index": "https://assets.coingecko.com/coins/images/12729/small/index.png",
      "steth": "https://assets.coingecko.com/coins/images/13442/small/steth_logo.png",
      "sushi": "https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png",
      "uma": "https://assets.coingecko.com/coins/images/10951/small/UMA.png",
      "usdc": "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      "wbtc": "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
      "weth": "https://assets.coingecko.com/coins/images/2518/small/weth.png",
      "xsushi": "https://assets.coingecko.com/coins/images/13725/small/xsushi.png",
      "yam": "https://assets.coingecko.com/coins/images/12530/small/YAM-icon.png",
      "yvusdc": "https://assets.coingecko.com/coins/images/12210/small/yUSD.png",
    }

    const treasuryAssets:any = treasuryValue.assets || {};
    const assets: Object[] = [];

    for (const [key, value] of Object.entries(treasuryAssets)) {
      let updatedAsset:any = value;
      updatedAsset.icon = assetsIcons[key];
      assets.push(updatedAsset);
    }

    setAssetsData(assets);
    setAssetsColors(assetsColors);
    setYamObject({
      currentPrice: numeral(yamValues?.market_data.current_price.usd).format("0.00a"),
      maxSupply: numeral(yamValues?.market_data.max_supply).format("0.00a"),
      marketCap: numeral(yamValues?.market_data.market_cap.usd).format("0.00a"),
      treasuryValue: numeral(treasuryValue.total).format("0.00a"),
      change24: numeral(yamValues?.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%"
    });
  }, [darkMode, status, yam, treasuryValue]);

  useEffect(() => {
    fetchReserves(2);
    let refreshInterval = setInterval(() => {
      fetchReserves(3);
    }, 60000);
    return () => clearInterval(refreshInterval);
  }, [treasuryValue]);

  return {
    assetsData,
    yamObject,
    assetsColors
  };

};

export default useDahsboard;
