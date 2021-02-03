import useTreasury from "hooks/useTreasury";
import useYam from "hooks/useYam";

import React, { useState, useCallback, useEffect } from "react";
import { Container, useTheme } from "react-neu";

import { OptionInterface, SeriesInterface, TimeSeries } from "types/Charts";
import { useWallet } from "use-wallet";
import {
  treasuryEvents,
  getDPIPrice,
  getCurrentBlock,
  getWETHPrice,
  getYUSDPrice,
  getINDEXCOOPPrice,
  getIndexCoopLPRewards,
  getSushiRewards,
  getSUSHIPrice,
  getUMAPrice,
  getValue
} from "yam-sdk/utils";
import numeral from "numeral";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import styled from "styled-components";
import Charts from "./components/Charts";
import TopCards from "./components/TopCards";
import AssetsList from "./components/AssetsList";

const Dashboard: React.FC = () => {
  const yam = useYam();
  const [optsReserves, setOptsReserves] = useState<OptionInterface>();
  const [seriesReserves, setSeriesReserves] = useState<SeriesInterface[]>();
  const [treasuryValues, setTreasuryValues] = useState<any>();
  const [assetsData, setAssetsData] = useState<Object[]>();
  const { darkMode, colors } = useTheme();
  const { totalYUsdValue, totalWETHValue, totalDPIValue, totalUMAValue, totalBalanceIndexCoop, getAssetsHistory } = useTreasury();
  
  const { status } = useWallet();
  const defaultRange = 14;

  const fetchTreasury = useCallback(async () => {
    if (!yam) {
      return;
    }
    const { reservesAdded, yamsSold, yamsFromReserves, yamsToReserves, blockNumbers, blockTimes } = await treasuryEvents(yam);
    setTreasuryValues({
      reservesAdded,
      yamsSold,
      yamsFromReserves,
      yamsToReserves,
      blockNumbers,
      blockTimes,
    });
  }, [yam, setTreasuryValues]);

  useEffect(() => {
    if (status !== "connected" || !yam || !treasuryValues) {
      return;
    }
    fetchReserves();
  }, [darkMode, status, yam, treasuryValues]);

  function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
  }
  const fetchReserves = useCallback(async () => {
    if (!yam || !totalDPIValue || !treasuryValues) {
      return;
    }
    if (!totalYUsdValue || !totalWETHValue || !totalDPIValue) {
      return;
    }

    const assetsHistory = await getAssetsHistory();
    console.log("dashboard", assetsHistory);

    const currentBlock = (await getCurrentBlock(yam)).number;

    const wethPrice = await getWETHPrice();
    const yusdPrice = await getYUSDPrice();
    const dpiPrice = await getDPIPrice();
    const indexPrice = await getINDEXCOOPPrice();
    const sushiPrice = await getSUSHIPrice();
    const umaPrice = await getUMAPrice();

    const DPIBalance = totalDPIValue;
    // const indexCoopLP = await getIndexCoopLP(yam);
    const indexCoopLPRewards = (await getIndexCoopLPRewards(yam)) || 0;
    const SushiRewards = (await getSushiRewards(yam)) || 0;

    const wethValues = await getValue("weth");
    const dpiValues = await getValue("defipulse-index");
    const umaValues = await getValue("uma");
    const yusdValues = await getValue("yvault-lp-ycurve");
    const sushiValues = await getValue("sushi");
    const indexCoopValues = await getValue("index-cooperative");

    const change24WETH = numeral(wethValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%";
    const change24DPI = numeral(dpiValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%";
    const change24UMA = numeral(umaValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%";
    const change24YUSD = numeral(yusdValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%";
    const change24IndexCoop = numeral(indexCoopValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%";
    const change24Sushi = numeral(sushiValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%";

    const reservesHistory = [];

    for (let key in assetsHistory.WETH) {
      const historyObject = {
        info: "",
        block: 0,
        yUSD: 0,
        DPI: 0,
        WETH: 0,
        INDEXLP: 0,
        INDEX: 0,
        Sushi: 0,
        UMA: 0
      };
      if (hasKey(assetsHistory.WETH, key)) {
        const wethValue:any = assetsHistory.WETH[key];
        if (key !== 'latest') {
          historyObject.info = "Block " + key;
          historyObject.block = key;
          historyObject.WETH = wethValue.value;
          if (hasKey(assetsHistory.yUSD, key)) {
            const yUSDValue:any = assetsHistory.yUSD[key];
            historyObject.yUSD = yUSDValue.value;
          }
          if (hasKey(assetsHistory.DPI, key)) {
            const dpiValue:any = assetsHistory.DPI[key];
            historyObject.DPI = dpiValue.value;
          }
          if (hasKey(assetsHistory.INDEX, key)) {
            const indexValue:any = assetsHistory.INDEX[key];
            historyObject.INDEX = indexValue.value;
          }
          if (hasKey(assetsHistory.INDEXLP, key)) {
            const indexLPValue:any = assetsHistory.INDEXLP[key];
            historyObject.INDEXLP = indexLPValue.value;
          }
          if (hasKey(assetsHistory.Sushi, key)) {
            const sushiValue:any = assetsHistory.Sushi[key];
            historyObject.Sushi = sushiValue.value;
          }
          if (hasKey(assetsHistory.UMA, key)) {
            const umaValue:any = assetsHistory.UMA[key];
            historyObject.UMA = umaValue.value;
          }
        } else {
          historyObject.info = "present";
          historyObject.block = currentBlock + 5000;
          historyObject.WETH = wethValue;
          if (hasKey(assetsHistory.yUSD, key)) {
            const yUSDValue:any = assetsHistory.yUSD[key];
            historyObject.yUSD = yUSDValue;
          }
          if (hasKey(assetsHistory.DPI, key)) {
            const dpiValue:any = assetsHistory.DPI[key];
            historyObject.DPI = dpiValue;
          }
          if (hasKey(assetsHistory.INDEX, key)) {
            const indexValue:any = assetsHistory.INDEX[key];
            historyObject.INDEX = indexValue;
          }
          if (hasKey(assetsHistory.INDEXLP, key)) {
            const indexLPValue:any = assetsHistory.INDEXLP[key];
            historyObject.INDEXLP = indexLPValue;
          }
          if (hasKey(assetsHistory.Sushi, key)) {
            const sushiValue:any = assetsHistory.Sushi[key];
            historyObject.Sushi = sushiValue;
          }
          if (hasKey(assetsHistory.UMA, key)) {
            const umaValue:any = assetsHistory.UMA[key];
            historyObject.UMA = umaValue;
          }
        }
      }
      reservesHistory.push(historyObject);
    }

    console.log(reservesHistory);

    let now = Math.floor(Date.now() / 1000);
    let reserves: TimeSeries[] = [];
    let reservesDPI: TimeSeries[] = [];
    let reservesETH: TimeSeries[] = [];
    let reservesINDEXLP: TimeSeries[] = [];
    let reservesINDEX: TimeSeries[] = [];
    let reservesUMA: TimeSeries[] = [];
    let reservesSushi: TimeSeries[] = [];
    let running = 0;
    for (let i = 0; i < treasuryValues.reservesAdded.length; i++) {
      running += treasuryValues.reservesAdded[i];
      // if (treasuryValues.blockNumbers[i] > 10946646) { // live remove (only for reserves)
      //   const tmp: TimeSeries = {
      //     // x: treasuryValues.blockNumbers[i],
      //     x: treasuryValues.blockTimes[i],
      //     y: totalYUsdValue * yUSDRate, // get pastEvents on blocknumber 11133885 (1603739830) for yUSD in reserve
      //   };
      //   reserves.push(tmp);
      // } else {
      // }
      if (
        treasuryValues.blockNumbers[i] <= 11133885
        // && treasuryValues.blockNumbers[i] >= currentBlock
      ) {
        const tmp: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: running * yusdPrice,
        };
        reserves.push(tmp);

        const tmpDPI: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: 0,
        };
        reservesDPI.push(tmpDPI);

        const tmpETH: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: 0,
        };
        reservesETH.push(tmpETH);

        const tmpINDEXLP: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: 0,
        };
        reservesINDEXLP.push(tmpINDEXLP);

        const tmpINDEX: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: 0,
        };
        reservesINDEX.push(tmpINDEX);

        const tmpXSushi: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: 0,
        };
        reservesSushi.push(tmpXSushi);

        const tmpUMA: TimeSeries = {
          x: treasuryValues.blockNumbers[i],
          y: 0,
        };
        reservesUMA.push(tmpUMA);
      }
    }

    for (let i = 0; i < reservesHistory.length; i++) {
      reserves.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].yUSD,
      });
      reservesDPI.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].DPI,
      });
      reservesETH.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].WETH,
      });
      reservesINDEXLP.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].INDEXLP,
      });
      reservesINDEX.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].INDEX,
      });
      reservesSushi.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].Sushi,
      });
      reservesUMA.push({
        x: reservesHistory[i].block,
        y: reservesHistory[i].UMA,
      });
    }

    const series: SeriesInterface[] = [
      {
        name: "yUSD Reserves",
        data: reserves ? reserves.slice(reserves.length - (defaultRange + 6)) : [],
      },
      {
        name: "DPI Reserves",
        data: reservesDPI ? reservesDPI.slice(reservesDPI.length - (defaultRange + 6)) : [],
      },
      {
        name: "ETH Reserves",
        data: reservesETH ? reservesETH.slice(reservesETH.length - (defaultRange + 6)) : [],
      },
      {
        name: "Sushi Gains",
        data: reservesSushi ? reservesSushi.slice(reservesSushi.length - (defaultRange + 6)) : [],
      },
      {
        name: "INDEX Coop LP",
        data: reservesINDEXLP ? reservesINDEXLP.slice(reservesINDEXLP.length - (defaultRange + 6)) : [],
      },
      {
        name: "INDEX Coop Gains",
        data: reservesINDEX ? reservesINDEX.slice(reservesINDEX.length - (defaultRange + 6)) : [],
      },
      {
        name: "UMA Voting Token",
        data: reservesUMA ? reservesUMA.slice(reservesUMA.length - (defaultRange + 6)) : [],
      },
    ];

    let theme;
    let labelColor;
    let borderColor;
    if (darkMode) {
      theme = "dark";
      labelColor = colors.grey[600];
      borderColor = colors.grey[900];
    } else {
      theme = "light";
      labelColor = colors.grey[600];
      borderColor = colors.grey[600];
    }

    let options: OptionInterface = {
      chart: {
        background: "#ffffff00",
        type: "area",
        height: 350,
        stacked: true,
      },
      stroke: {
        curve: "stepline",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ["#C60C4D", "#8150E6", "#4777e0", "#D16C00", "#838bfc", "#FFB900", "#2a9d8f"],
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        labels: {
          colors: [labelColor],
        },
      },
      markers: {
        hover: {
          sizeOffset: 5,
        },
      },
      colors: ["#C60C4D", "#8150E6", "#4777e0", "#D16C00", "#838bfc", "#FFB900", "#2a9d8f"],
      xaxis: {
        // type: "datetime",
        labels: {
          style: {
            colors: labelColor,
          },
          // formatter: (value: any) => {
          //   return getTimestampDate({ ts: value });
          // },
        },
        axisBorder: {
          show: false,
        },
        title: {
          // text: "Block Number",
          style: {
            color: labelColor,
          },
        },
      },
      yaxis: {
        title: {
          // text: "yUSD In Reserves",
          style: {
            color: labelColor,
          },
        },
        labels: {
          style: {
            colors: labelColor,
          },
          formatter: (value: any) => {
            return "~$" + numeral(value).format("0.00a");
          },
        },
        axisBorder: {
          show: false,
        },
      },
      grid: {
        borderColor: borderColor,
        padding: {
          right: 5,
        },
      },
      theme: {
        mode: theme,
      },
      tooltip: {
        theme: theme,
      },
    };

    const assets: Object[] = [
      {
        icon: wethValues.image.large,
        name: "Wrapped Ether",
        index: "WETH",
        quantity: numeral(totalWETHValue).format("0,0.00"),
        price: "$" + numeral(wethPrice).format("0,0.00"),
        change: change24WETH ? change24WETH : "0.00%",
        value: "$" + numeral(assetsHistory.WETH.latest).format("0,0.00"),
      },
      {
        icon: sushiValues.image.large,
        name: "Sush Gains",
        index: "SUSHI",
        quantity: numeral(SushiRewards).format("0,0.00"),
        price: "$" + numeral(sushiPrice).format("0,0.00"),
        change: change24Sushi ? change24Sushi : "0.00%",
        value: "$" + numeral(assetsHistory.Sushi.latest).format("0,0.00"),
      },
      {
        icon: yusdValues.image.large,
        name: "yearn Curve",
        index: "yyDAI+",
        quantity: numeral(totalYUsdValue).format("0,0.00"),
        price: "$" + numeral(yusdPrice).format("0,0.00"),
        change: change24YUSD ? change24YUSD : "0.00%",
        value: "$" + numeral(assetsHistory.yUSD.latest).format("0,0.00"),
      },
      {
        icon: dpiValues.image.large,
        name: "DefiPulse Index",
        index: "DPI",
        quantity: numeral(DPIBalance).format("0,0.00"),
        price: "$" + numeral(dpiPrice).format("0,0.00"),
        change: change24DPI ? change24DPI : "0.00%",
        value: "$" + numeral(assetsHistory.DPI.latest).format("0,0.00"),
      },
      {
        icon: indexCoopValues.image.large,
        name: "Index Coop Gains",
        index: "INDEX",
        quantity: numeral(totalBalanceIndexCoop).format("0,0.00"),
        price: "$" + numeral(indexPrice).format("0,0.00"),
        change: change24IndexCoop ? change24IndexCoop : "0.00%",
        value: "$" + numeral(assetsHistory.INDEX.latest).format("0,0.00"),
      },
      {
        icon: indexCoopValues.image.large,
        name: "Index Coop LP",
        index: "INDEXLP",
        quantity: numeral(indexCoopLPRewards).format("0,0.00"),
        price: "$" + numeral(indexPrice).format("0,0.00"),
        change: change24IndexCoop ? change24IndexCoop : "0.00%",
        value: "$" + numeral(assetsHistory.INDEXLP.latest).format("0,0.00"),
      },
      {
        icon: umaValues.image.large,
        name: "UMA Voting Token",
        index: "UMA",
        quantity: numeral(totalUMAValue).format("0,0.00"),
        price: "$" + numeral(umaPrice).format("0,0.00"),
        change: change24UMA ? change24UMA : "0.00%",
        value: "$" + numeral(assetsHistory.UMA.latest).format("0,0.00"),
      },
    ];

    console.log("assets", assets);

    setOptsReserves(options);
    setSeriesReserves(series);
    setAssetsData(assets);
  }, [setOptsReserves, setSeriesReserves, darkMode, status, yam, totalDPIValue, treasuryValues]);

  useEffect(() => {
    fetchTreasury();
    let refreshInterval = setInterval(() => fetchTreasury(), 30000);
    // console.log("treasuryValues", treasuryValues);
    return () => clearInterval(refreshInterval);
  }, [fetchTreasury]);

  return (
    <Page>
      <PageHeader icon="📊" subtitle="Overview of the YAM ecosystem" title="YAM Dashboard" />
      <Container size="lg">
        <TopCards />
        <Charts seriesReserves={seriesReserves} optsReserves={optsReserves}/>
        <AssetsList assets={assetsData}/>
      </Container>
    </Page>
  );
};

const StyledCharts = styled.div`
  padding: 0px;
`;

export default Dashboard;
