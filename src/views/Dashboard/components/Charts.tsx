import React, { useCallback, useEffect, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'

import numeral from 'numeral'
import Chart from "react-apexcharts";
import ChartPagination from "components/ChartPagination";
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

import Split from 'components/Split'

import useYam from 'hooks/useYam'
import {
  scalingFactors,
  yamSold,
  yamMinted,
  reservesHistory
} from 'yam-sdk/utils'

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
  const [scalingTotalPages, setScalingTotalPages] = useState<number>(1);
  const [scalingCurrentPage, setScalingCurrentPage] = useState<number>(0);
  const [scalingPagingDisabled, setScalingPagingDisabled] = useState<boolean>(false);
  const [yamSoldTotalPages, setYamSoldTotalPages] = useState<number>(1);
  const [yamSoldCurrentPage, setYamSoldCurrentPage] = useState<number>(0);
  const [yamSoldOpts, setYamSoldOpts] = useState<OptionInterface>()
  const [yamSeries, setYamSeries] = useState<SeriesInterface[]>()
  const [yamSoldPagingDisabled, setYamSoldPagingDisabled] = useState<boolean>(false);
  const [yamMintedTotalPages, setYamMintedTotalPages] = useState<number>(1);
  const [yamMintedCurrentPage, setYamMintedCurrentPage] = useState<number>(0);
  const [yamMintedOpts, setYamMintedOpts] = useState<OptionInterface>()
  const [yamMintedSeries, setYamMintedSeries] = useState<SeriesInterface[]>()
  const [yamMintedPagingDisabled, setYamMintedPagingDisabled] = useState<boolean>(false);
  const [reservesTotalPages, setReservesTotalPages] = useState<number>(1);
  const [reservesCurrentPage, setReservesCurrentPage] = useState<number>(0);
  const [reservesOpts, setReservesOpts] = useState<OptionInterface>()
  const [reservesSeries, setReservesSeries] = useState<SeriesInterface[]>()
  const [reservesPagingDisabled, setReservesPagingDisabled] = useState<boolean>(false);
  const { status } = useWallet()

    const fetchYamMinted = useCallback( async()=> {

        const {yamMint, timestamps,currentPage,totalPages} =  await yamMinted(yamMintedCurrentPage);
        if(!yamMintedCurrentPage)
            setYamMintedCurrentPage(currentPage);

        let mints: TimeSeries[] = [];
        for (let i = 0; i < yamMint.length; i++) {
            const tmp: TimeSeries = {
                x: timestamps[i],
                y: yamMint[i]
            };
            mints.push(tmp);
        }

        const series: SeriesInterface[] = [{
            name: 'Yams Minted',
            data: mints
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

        let yamOpts: OptionInterface = {
            chart: {
                type: 'bar',
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
                    formatter: (value: any) => {
                        if(typeof value !== 'undefined')
                        {
                            let d = new Date(value*1000);
                            return ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) +
                                "/" + (d.getFullYear().toString().substr(-2));
                        }

                        return value;
                    }
                },
                axisBorder: {
                    show: false
                },
                title: {
                    text: "",
                    style: {
                        color: labelColor
                    }
                },
                type:'datetime'
            },
            yaxis: {
                title: {
                    text:"YAMs Minted",
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

        setYamMintedSeries(series);
        setYamMintedOpts(yamOpts);
        setYamMintedTotalPages(totalPages);
        setYamMintedPagingDisabled(false);

    },[
        setYamMintedSeries,
        setYamMintedOpts,
        setYamMintedTotalPages,
        setYamMintedCurrentPage,
        setYamMintedPagingDisabled,
        yamMintedCurrentPage,
        darkMode

    ])

    const fetchReserves = useCallback( async()=> {

        const {reserves, timestamps,currentPage,totalPages} =  await reservesHistory(reservesCurrentPage);
        if(!reservesCurrentPage)
            setReservesCurrentPage(currentPage);

        let data: TimeSeries[] = [];
        for (let i = 0; i < reserves.length; i++) {
            const tmp: TimeSeries = {
                x: timestamps[i],
                y: reserves[i]
            };
            data.push(tmp);
        }

        const asSeries: SeriesInterface[] = [{
            name: 'yUSD Reserves',
            data: data
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
            stroke: {
                curve: 'smooth',
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
                    formatter: (value: any) => {
                        if(typeof value !== 'undefined')
                        {
                            let d = new Date(value*1000);
                            return ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) +
                                "/" + (d.getFullYear().toString().substr(-2));
                        }

                        return value;
                    }
                },
                axisBorder: {
                    show: false
                },
                title: {
                    text: "",
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

        setReservesSeries(asSeries);
        setReservesOpts(reservesOpts);
        setReservesTotalPages(totalPages);
        setReservesPagingDisabled(false);

    },[
        setReservesSeries,
        setReservesOpts,
        setReservesTotalPages,
        setReservesCurrentPage,
        setReservesPagingDisabled,
        reservesCurrentPage,
        darkMode

    ])

    const fetchYamSold = useCallback( async()=> {

        const {yamSolds, timestamps,currentPage,totalPages} =  await yamSold(yamSoldCurrentPage);
        if(!yamSoldCurrentPage)
            setYamSoldCurrentPage(currentPage);

        let sales: TimeSeries[] = [];
        for (let i = 0; i < yamSolds.length; i++) {

            const tmp: TimeSeries = {
                x: timestamps[i],
                y: yamSolds[i]
            };
            sales.push(tmp);
        }

        const series: SeriesInterface[] = [{
            name: 'Yams Sold',
            data: sales
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

        let yamOpts: OptionInterface = {
            chart: {
                type: 'bar',
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
                    formatter: (value: any) => {
                        if(typeof value !== 'undefined')
                        {
                            let d = new Date(value*1000);
                            return ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) +
                                "/" + (d.getFullYear().toString().substr(-2));
                        }

                        return value;
                    }
                },
                axisBorder: {
                    show: false
                },
                title: {
                    text: "",
                    style: {
                        color: labelColor
                    }
                },
                type:'datetime'
            },
            yaxis: {
                title: {
                    text:"YAMs Sold",
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

        setYamSeries(series);
        setYamSoldOpts(yamOpts);
        setYamSoldTotalPages(totalPages);
        setYamSoldPagingDisabled(false);

    },[
    setYamSeries,
    setYamSoldOpts,
    setYamSoldTotalPages,
    setYamSoldCurrentPage,
    setYamSoldPagingDisabled,
    yamSoldCurrentPage,
    darkMode

    ])

    const fetchScalingFactors = useCallback(async () => {

    const {factors, timestamps,currentPage,totalPages} = await scalingFactors(scalingCurrentPage);
    if(!scalingCurrentPage)
        setScalingCurrentPage(currentPage);
    let data: TimeSeries[] = [];
    for (let i = 0; i < factors.length; i++) {
      const tmp: TimeSeries = {
        x: timestamps[i],
        y: factors[i]
      };
      data.push(tmp);
    }

    const asSeries: SeriesInterface[] = [{
        name: 'Scaling Factor',
        data: data
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
          curve: 'smooth',
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
          type: 'datetime',
          labels: {
            style: {
              colors: labelColor
            },
              formatter: (value: any) => {
                  if(typeof value !== 'undefined')
                  {
                      let d = new Date(value*1000);
                      return ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) +
                          "/" + (d.getFullYear().toString().substr(-2));
                  }

                  return value;
              }
          },
          axisBorder: {
            show: false
          },
          title: {
            text: "",
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
              text:"Scaling Factor",
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
    setScalingTotalPages(totalPages);
    setScalingPagingDisabled(false);

  }, [
    setScalingSeries,
    setScalingOpts,
    setScalingTotalPages,
    setScalingCurrentPage,
    setScalingPagingDisabled,
    scalingCurrentPage,
    darkMode,
  ])

    useEffect(() => {
        fetchScalingFactors()
        let refreshInterval = setInterval(()=> fetchScalingFactors, 100000)
        return () => clearInterval(refreshInterval)
    }, [fetchScalingFactors])

    useEffect(() => {
        fetchReserves()
        let refreshInterval = setInterval(() => fetchReserves(), 100000)
        return () => clearInterval(refreshInterval)
    }, [fetchReserves])

    useEffect(() => {
        fetchYamMinted()
        let refreshInterval = setInterval(() => fetchYamMinted(), 100000)
        return () => clearInterval(refreshInterval)
    }, [fetchYamMinted])

    useEffect(() => {
        fetchYamSold()
        let refreshInterval = setInterval(() => fetchYamSold(), 100000)
        return () => clearInterval(refreshInterval)
    }, [fetchYamSold])

    const handleReservesChange = async(event:any,page:any) => {

        if(reservesCurrentPage!=page)
        {
            setReservesPagingDisabled(true);
            setReservesCurrentPage(page);
        }
    }

    const handleYamSoldChange = async(event:any,page:any) => {

        if(yamSoldCurrentPage!=page)
        {
            setYamSoldPagingDisabled(true);
            setYamSoldCurrentPage(page);
        }
    }

    const handleScaleChange = async(event:any,page:any) => {
        if(scalingCurrentPage!=page)
        {
            setScalingPagingDisabled(true);
            setScalingCurrentPage(page);
        }
    }

    const handleYamMintedChange = async(event:any,page:any) => {
        if(scalingCurrentPage!=page)
        {
            setYamMintedPagingDisabled(true);
            setYamMintedCurrentPage(page);
        }
    }


    const DisplayCharts = useMemo(() => {
      return (
        <>
          <Split>
            <Card>
              <CardTitle text="🚀 Scaling Factor History" />
              <Spacer size="sm" />
              <CardContent>
                  <ChartPagination disabled={scalingPagingDisabled} count={scalingTotalPages} curPage={scalingCurrentPage} callback={handleScaleChange}  />
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
                  <ChartPagination disabled={reservesPagingDisabled} count={reservesTotalPages} curPage={reservesCurrentPage} callback={handleReservesChange}  />
                  <Split>
                    <Chart options={reservesOpts ? reservesOpts : {}} series={reservesSeries ? [reservesSeries[0]] : []} type="line" height={350} />
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
                  <ChartPagination disabled={yamSoldPagingDisabled} count={yamSoldTotalPages} curPage={yamSoldCurrentPage} callback={handleYamSoldChange}  />
                  <Split>
                    <Chart options={yamSoldOpts ? yamSoldOpts : {}} series={yamSeries ? [yamSeries[0]] : []} type="bar" height={200} />
                </Split>
              </CardContent>
            </Card>
            <Card>
              <CardTitle text="⬆️ Yams Minted Per Rebase" />
              <Spacer size="sm" />
              <CardContent>
                  <ChartPagination disabled={yamMintedPagingDisabled} count={yamMintedTotalPages} curPage={yamMintedCurrentPage} callback={handleYamMintedChange}  />
                  <Split>
                    <Chart options={yamMintedOpts ? yamMintedOpts : {}} series={yamMintedSeries ? [yamMintedSeries[0]] : []} type="bar" height={200} />
                </Split>
              </CardContent>
            </Card>
          </Split>
        </>
      );


  }, [
    darkMode,
    status,
    scalingSeries,
    scalingOpts,
    scalingTotalPages,
    scalingCurrentPage,
    scalingPagingDisabled,
    series,
    opts,
    yamSeries,
    yamSoldOpts,
    yamSoldTotalPages,
    yamSoldCurrentPage,
    yamSoldPagingDisabled,
    yamMintedSeries,
    yamMintedOpts,
    yamMintedTotalPages,
    yamMintedCurrentPage,
    yamMintedPagingDisabled,
    reservesSeries,
    reservesOpts,
    reservesTotalPages,
    reservesCurrentPage,
    reservesPagingDisabled,
    ]);


  return (
    <>
        {DisplayCharts}
    </>
  );
}

export default Charts
