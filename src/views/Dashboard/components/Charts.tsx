import React, { useCallback, useEffect, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'

import numeral from 'numeral'
import Chart from "react-apexcharts";
import { useWallet } from 'use-wallet'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Container,
  Spacer,
  useTheme
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useYam from 'hooks/useYam'
import {
  treasuryEvents,
  scalingFactors
} from 'yam-sdk/utils'
import UnlockWalletModal from 'components/UnlockWalletModal'

export interface ChartOptions {
  type: string,
  height: number
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
  hover: HoverOptions
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
  const yam = useYam()
  const { darkMode, colors } = useTheme()
  const [series, setSeries] = useState<SeriesInterface[]>()
  const [opts, setOpts] = useState<OptionInterface[]>()
  const [scalingSeries, setScalingSeries] = useState<SeriesInterface[]>()
  const [scalingOpts, setScalingOpts] = useState<OptionInterface>()
  const { status } = useWallet()
  const daysRange = 14;

  const fetchReserves = useCallback(async () => {
    if (!yam) {
      return
    }
    const {reservesAdded, yamsSold, yamsFromReserves, yamsToReserves, blockNumbers} = await treasuryEvents(yam);
    let reserves: TimeSeries[] = [];
    let running = 0;
    for (let i = 0; i < reservesAdded.length; i++) {
      running += reservesAdded[i];
      const tmp: TimeSeries = {
        x: blockNumbers[i],
        y: running
      };
      reserves.push(tmp);
    }

    let sales: number[] = [];
    for (let i = 0; i < yamsSold.length; i++) {
      sales.push(yamsSold[i]);
    }

    let mints: number[] = [];
    for (let i = 0; i < yamsSold.length; i++) {
      mints.push(yamsSold[i] - yamsFromReserves[i] + yamsToReserves[i]);
    }

    const asSeries: SeriesInterface[] = [{
        name: 'yUSD Reserves',
        data: reserves.slice(reserves.length - daysRange)
    }, {
        name: 'Yams Sold',
        data: sales.slice(sales.length - daysRange)
    }, {
        name: 'Yam Minted',
        data: mints.slice(mints.length - daysRange)
    }];

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
    let reservesOpts: OptionInterface = {
        chart: {
          type: 'line',
          height: 350
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
          title: {
            text:"yUSD In Reserves",
            style: {
              color: labelColor
            }
          },
          labels: {
            style: {
              colors: labelColor
            },
            formatter: (value: any) => { return numeral(value).format('0.00a')}
          },
          axisBorder: {
            show: false
          },
        },
        grid: {
          borderColor: borderColor,
          padding: {
            right: 5
          }
        },
        theme: {
          mode: theme
        },
        tooltip: {
          theme: theme
        }
      };

    let soldOpts: OptionInterface = JSON.parse(JSON.stringify(reservesOpts));
    if (soldOpts && soldOpts.chart && soldOpts.xaxis && soldOpts.yaxis && soldOpts.yaxis.title && soldOpts.yaxis.labels) {
      soldOpts.yaxis.title.text = "YAMs Sold";
      soldOpts.yaxis.title.style = {color: labelColor}
      soldOpts.chart.type = "bar";
      soldOpts.xaxis.categories = blockNumbers;
      soldOpts.yaxis.labels.formatter = (value: any) => { return numeral(value).format('0.00a')}
    }

    let mintedOpts: OptionInterface = JSON.parse(JSON.stringify(reservesOpts));
    if (mintedOpts && mintedOpts.chart && mintedOpts.xaxis && mintedOpts.yaxis && mintedOpts.yaxis.title && mintedOpts.yaxis.labels ) {
      mintedOpts.yaxis.title.text = "YAMs Minted";
      mintedOpts.yaxis.title.style = {color: labelColor}
      mintedOpts.chart.type = "bar";
      mintedOpts.xaxis.categories = blockNumbers;
      mintedOpts.yaxis.labels.formatter = (value: any) => { return numeral(value).format('0.00a')}
    }

    reservesOpts.stroke = { curve: 'stepline'}

    if (reservesOpts.xaxis) {
      reservesOpts.xaxis.type = 'numeric';
    }
    setSeries(asSeries);
    setOpts([reservesOpts, soldOpts, mintedOpts]);
  }, [
    setSeries,
    setOpts,
    darkMode,
    status,
    yam
  ])

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
    const asSeries: SeriesInterface[] = [{
        name: 'Scaling Factor',
        data: data.slice(factors.length - daysRange)
    }];
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
          curve: 'stepline',
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
                  height={350}
                />
              </CardContent>
            </Card>
            <Card>
              <CardTitle text="💰 Reserves History" />
              <Spacer size="sm" />
              <CardContent>
                <Split>
                  <Chart options={opts ? opts[0] : {}} series={series ? [series[0]] : []} type="line" height={350} />
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
                  <Chart options={opts ? opts[1] : {}} series={series ? [series[1]] : []} type="bar" height={200} />
                </Split>
              </CardContent>
            </Card>
            <Card>
              <CardTitle text="⬆️ Yams Minted Per Rebase" />
              <Spacer size="sm" />
              <CardContent>
                <Split>
                  <Chart options={opts ? opts[2] : {}} series={series ? [series[2]] : []} type="bar" height={200} />
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
