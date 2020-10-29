import useTreasury from "hooks/useTreasury";
import useYam from "hooks/useYam";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Box, Button, Card, CardActions, CardContent, CardTitle, Container, Spacer, useTheme } from "react-neu";
import { useWallet } from "use-wallet";
import { getNearestBlock } from "utils";
import { treasuryEvents, getDPIPrices, scalingFactors } from "yam-sdk/utils";
import Chart from "react-apexcharts";
import Split from "components/Split";
import UnlockWalletModal from "components/UnlockWalletModal";
import numeral from "numeral";

export interface ChartOptions {
  type: string;
  height: number;
  stacked?: boolean;
}

export interface StrokeOptions {
  curve: string
}

export interface LabelsOptions {
  enabled: boolean
}

export interface TitleOptions {
  text?: string,
  align?: string
}

export interface HoverOptions {
  sizeOffset: number
}

export interface MarkerOptions {
  hover: HoverOptions;
}

export interface ChartLegend {
  position?: string;
  horizontalAlign?: string;
}

export interface ChartFill {
  colors?: Array<any>;
  hover?: HoverOptions;
  type?: string;
  gradient?: {
    shade?: string;
    opacityFrom?: number;
    opacityTo?: number;
    shadeIntensity?: number;
    stops?: Array<any>;
  };
}

export interface OptionInterface {
  chart?: ChartOptions,
  stroke?: StrokeOptions,
  dataLabels?: LabelsOptions,
  title?: TitleOptions,
  markers?: MarkerOptions,
  colors?: string[],
  xaxis?: axisInterface,
  yaxis?: axisInterface,
  legend?: ChartLegend,
  fill?: ChartFill,
  grid?: GridInterface,
  tooltip?: tooltipInterface,
  theme?: themeInterface
}

export interface themeInterface {
  mode?: string
}

export interface SeriesInterface {
    name?: string,
    data?: number[] | TimeSeries[]
}

export interface GridInterface {
    show?: boolean,
    borderColor?: string,
    strokeDashArray?: number,
    position?: string,
    padding?: {
      top?: number,
      right?: number,
      bottom?: number,
      left?: number
    },
    xaxis?: {
        lines?: {
            show?: boolean
        }
    },
    yaxis?: {
        lines?: {
            show?: boolean
        }
    },
    row?: {
        colors?: string[],
        opacity?: number
    },
    column?: {
        colors?: string[],
        opacity?: number
    }
}

export interface tooltipInterface {
      enabled?: boolean,
      enabledOnSeries?: boolean,
      shared?: boolean,
      followCursor?: boolean,
      intersect?: boolean,
      inverseOrder?: boolean,
      fillSeriesColor?: boolean,
      theme?: string,
      style?: {
        fontSize?: string,
        fontFamily?: string
      },
      onDatasetHover?: {
          highlightDataSeries?: boolean,
      },
      x?: {
          show?: boolean,
          format?: string
      },
      y?: {
          title?: string,
      },
      z?: {
          formatter?: undefined,
          title?: string
      },
      marker?: {
          show?: boolean,
      },
      items?: {
         display?: any,
      },
      fixed?: {
          enabled?: boolean,
          position?: string,
          offsetX?: number,
          offsetY?: number,
      },
}

export interface axisInterface {
    type?: string,
    categories?: any[],
    logarithmic?: boolean,
    min?: number,
    max?: number,
    labels?: {
        show?: boolean,
        rotate?: number,
        rotateAlways?: boolean,
        style?: {
            colors?: string[] | string,
            fontSize?: string,
            fontFamily?: string,
            fontWeight?: number,
            cssClass?: string
        },
        offsetX?: number,
        offsetY?: number,
        formatter?: any
    },
    axisBorder?: {
        show?: boolean,
        color?: string,
        height?: number,
        width?: string
    },
    axisTicks?: {
        show?: boolean,
        borderType?: string,
        color?: string,
        height?: number
    },
    title?: {
        text?: string,
        style?: {
            color?: string,
            fontSize?: string,
            fontFamily?: string,
            fontWeight?: number
        },
    },
    crosshairs?: {
        show?: boolean,
        width?: number,
        position?: string,
        opacity?: number,
        stroke?: {
            color?: string,
            width?: number,
            dashArray?: number
        },
        dropShadow?: {
            enabled?: boolean,
            top?: number,
            left?: number,
            blur?: number,
            opacity?: number,
        },
    },
    tooltip?: {
        enabled?: boolean,
        theme?: string,
        style?: {
          fontSize?: number,
          fontFamily?: number,
        },
    },
}

export interface TimeSeries {
  x: number,
  y: number
}

const Charts: React.FC = () => {
  const yam = useYam();
  const [series, setSeries] = useState<SeriesInterface[]>();
  const [opts, setOpts] = useState<OptionInterface[]>();
  const [scalingSeries, setScalingSeries] = useState<SeriesInterface[]>();
  const [scalingOpts, setScalingOpts] = useState<OptionInterface>();
  const { darkMode, colors } = useTheme();
  const { totalDPIValue } = useTreasury();
  const { status } = useWallet();
  const daysRange = 28;
  const yUSDValue = 1.15;

  const fetchReserves = useCallback(async () => {
    if (!yam || !totalDPIValue) {
      return;
    }
    const {
      reservesAdded,
      yamsSold,
      yamsFromReserves,
      yamsToReserves,
      blockNumbers,
      blockTimes,
    } = await treasuryEvents(yam);

    let reserves: TimeSeries[] = [];
    let running = 0;
    for (let i = 0; i < reservesAdded.length; i++) {
      running += reservesAdded[i];
      if (blockNumbers[i] > 10946646) { // live remove
        const tmp: TimeSeries = {
          x: blockNumbers[i],
          y: 2297013 * yUSDValue, // get pastEvents on blocknumber 11133885 (1603739830) for yUSD in reserve
        };
        reserves.push(tmp);
      } else {
        const tmp: TimeSeries = {
          x: blockNumbers[i],
          y: running * yUSDValue,
        };
        reserves.push(tmp);
      }
    }

    let now = Math.floor(Date.now() / 1000);
    let DPIBalance = totalDPIValue;
    let reservesDPI: TimeSeries[] = [];
    let prices: any = await getDPIPrices("1603739830", now.toString());
    let pricesArray = [];
    for (var prop in prices) {
      pricesArray.push(prop);
    }
    for (let i = 0; i < reservesAdded.length; i++) {
      if (DPIBalance && blockNumbers[i] > 10946646) { // 11133885 live set
        let blockTime: number = blockTimes[i].timestamp;
        let blockCurr: any = getNearestBlock(pricesArray, blockTime);
        const tmp: TimeSeries = {
          x: blockNumbers[i],
          y: DPIBalance * prices[blockCurr],
        };
        reservesDPI.push(tmp);
      } else {
        const tmp: TimeSeries = {
          x: blockNumbers[i],
          y: 0,
        };
        reservesDPI.push(tmp);
      }
    }

    let sales: number[] = [];
    for (let i = 0; i < yamsSold.length; i++) {
      sales.push(yamsSold[i]);
    }

    let mints: number[] = [];
    for (let i = 0; i < yamsSold.length; i++) {
      mints.push(yamsSold[i] - yamsFromReserves[i] + yamsToReserves[i]);
    }

    const asSeries: SeriesInterface[] = [
      {
        name: "yUSD Reserves",
        data: reserves.slice(reserves.length - daysRange),
      },
      {
        name: "DPI Reserves",
        data: reservesDPI.slice(reservesDPI.length - daysRange),
      },
      {
        name: "Yams Sold",
        data: sales.slice(sales.length - daysRange),
      },
      {
        name: "Yam Minted",
        data: mints.slice(mints.length - daysRange),
      },
    ];

    let theme;
    let labelColor;
    let borderColor;
    let shadeColor;
    if (darkMode) {
      theme = "dark";
      labelColor = colors.grey[600];
      borderColor = colors.grey[900];
      shadeColor = "dark";
    } else {
      theme = "light";
      labelColor = colors.grey[600];
      borderColor = colors.grey[600];
      shadeColor = "light";
    }

    let reservesOpts: OptionInterface = {
      chart: {
        type: "area",
        height: 350,
        stacked: true,
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ["#C60C4D", "#8150E6"],
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
      colors: ["#C60C4D", "#8150E6"],
      xaxis: {
        labels: {
          style: {
            colors: labelColor,
          },
        },
        axisBorder: {
          show: false,
        },
        title: {
          text: "Block Number",
          style: {
            color: labelColor,
          },
        },
      },
      yaxis: {
        title: {
          text: "yUSD In Reserves",
          style: {
            color: labelColor,
          },
        },
        labels: {
          style: {
            colors: labelColor,
          },
          formatter: (value: any) => {
            return numeral(value).format("0.00a");
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

    let soldOpts: OptionInterface = JSON.parse(JSON.stringify(reservesOpts));
    if (
      soldOpts &&
      soldOpts.chart &&
      soldOpts.xaxis &&
      soldOpts.yaxis &&
      soldOpts.yaxis.title &&
      soldOpts.yaxis.labels
    ) {
      soldOpts.yaxis.title.text = "YAMs Sold";
      soldOpts.yaxis.title.style = { color: labelColor };
      soldOpts.chart.type = "bar";
      soldOpts.xaxis.categories = blockNumbers;
      delete soldOpts.fill;
      soldOpts.yaxis.labels.formatter = (value: any) => {
        return numeral(value).format("0.00a");
      };
    }

    let mintedOpts: OptionInterface = JSON.parse(JSON.stringify(reservesOpts));
    if (
      mintedOpts &&
      mintedOpts.chart &&
      mintedOpts.xaxis &&
      mintedOpts.yaxis &&
      mintedOpts.yaxis.title &&
      mintedOpts.yaxis.labels
    ) {
      mintedOpts.yaxis.title.text = "YAMs Minted";
      mintedOpts.yaxis.title.style = { color: labelColor };
      mintedOpts.chart.type = "bar";
      mintedOpts.xaxis.categories = blockNumbers;
      delete mintedOpts.fill;
      mintedOpts.yaxis.labels.formatter = (value: any) => {
        return numeral(value).format("0.00a");
      };
    }

    reservesOpts.stroke = { curve: "stepline" };
    // reservesOpts.stroke = { curve: "smooth" };

    if (reservesOpts.xaxis) {
      reservesOpts.xaxis.type = 'numeric';
    }
    setSeries(asSeries);
    setOpts([reservesOpts, soldOpts, mintedOpts]);
  }, [setSeries, setOpts, darkMode, status, yam, totalDPIValue]);

  const fetchScalingFactors = useCallback(async () => {
    if (!yam) {
      return
    }
    const {factors, blockNumbers} = await scalingFactors(yam);
    let data: TimeSeries[] = [];
    for (let i = 0; i < factors.length; i++) {
      const tmp: TimeSeries = {
        x: blockNumbers[i],
        y: factors[i]
      };
      data.push(tmp);
    }
    const asSeries: SeriesInterface[] = [
      {
        name: "Scaling Factor",
        data: data.slice(factors.length - daysRange / 2),
      },
    ];
    let theme;
    let labelColor;
    let borderColor;
    if (darkMode) {
      theme = 'dark'
      labelColor = colors.grey[600]
      borderColor = colors.grey[900]
    } else {
      theme = 'light'
      labelColor = colors.grey[600]
      borderColor = colors.grey[600]
    }

    const options: OptionInterface = {
        chart: {
          type: 'line',
          height: 350
        },
        stroke: {
          curve: "stepline",
          // curve: "smooth",
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          hover: {
            sizeOffset: 4
          }
        },
        colors: ['#c60c4d'],
        xaxis: {
          type: 'numeric',
          labels: {
            style: {
              colors: labelColor
            },
          },
          axisBorder: {
            show: false
          },
          title: {
            text: "Block Number",
            style: {
              color: labelColor
            }
          }
        },
        yaxis: {
          min: 0,
          labels: {
            style: {
              colors: labelColor
            }
          },
          axisBorder: {
            show: false
          },
          title: {
            style: {
              color: labelColor
            }
          }
        },
        grid: {
          borderColor: borderColor,
          padding: {
            right: 5,
            left: 5
          }
        },
        theme: {
          mode: theme
        }
      };
    setScalingSeries(asSeries);
    setScalingOpts(options);
  }, [
    setScalingSeries,
    setScalingOpts,
    darkMode,
    status,
    yam
  ])

  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false)

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false)
  }, [setUnlockModalIsOpen])

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true)
  }, [setUnlockModalIsOpen])

  useEffect(() => {
    fetchScalingFactors()
    let refreshInterval = setInterval(() => fetchScalingFactors(), 100000)
    return () => clearInterval(refreshInterval)
  }, [fetchScalingFactors])

  useEffect(() => {
    fetchReserves()
    let refreshInterval = setInterval(() => fetchReserves(), 100000)
    return () => clearInterval(refreshInterval)
  }, [fetchReserves])

  const DisplayCharts = useMemo(() => {
    if (status === "connected") {
      return (
        <>
          <Split>
            <Card>
              <CardTitle text="🚀 Scaling Factor History" />
              <Spacer size="sm" />
              <CardContent>
                <Chart
                  options={scalingOpts ? scalingOpts : {}}
                  series={scalingSeries ? scalingSeries : []}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardTitle text="💰 Reserves History ($)" />
              <Spacer size="sm" />
              <CardContent>
                <Split>
                  <Chart
                    options={opts ? opts[0] : {}}
                    series={series ? [series[0], series[1]] : []}
                    type="area"
                    height={300}
                  />
                </Split>
              </CardContent>
            </Card>
          </Split>
          <Spacer />
          <Split>
            <Card>
              <CardTitle text="⬇️ Yams Sold Per Rebase" />
              <Spacer size="sm" />
              <CardContent>
                <Split>
                  <Chart options={opts ? opts[1] : {}} series={series ? [series[2]] : []} type="bar" height={200} />
                </Split>
              </CardContent>
            </Card>
            <Card>
              <CardTitle text="⬆️ Yams Minted Per Rebase" />
              <Spacer size="sm" />
              <CardContent>
                <Split>
                  <Chart options={opts ? opts[2] : {}} series={series ? [series[3]] : []} type="bar" height={200} />
                </Split>
              </CardContent>
            </Card>
          </Split>
        </>
      );
    }
    return (
      <>
        <Box row justifyContent="center">
          <Button onClick={handleUnlockWalletClick} text="Unlock wallet to display charts" variant="secondary" />
        </Box>
        <UnlockWalletModal isOpen={unlockModalIsOpen} onDismiss={handleDismissUnlockModal} />
      </>
    );
  }, [
    darkMode,
    status,
    handleDismissUnlockModal,
    handleUnlockWalletClick,
    unlockModalIsOpen,
    scalingSeries,
    scalingOpts,
    series,
    opts,
  ]);


  return (
    <>
        {DisplayCharts}
    </>
  );
}

export default Charts
