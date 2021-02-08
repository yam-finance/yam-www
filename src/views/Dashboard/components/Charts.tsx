import React, { useState, useCallback, useMemo } from "react";
import { Box, Button, Card, CardContent, CardTitle, Spacer, useTheme} from "react-neu";
import { useWallet } from "use-wallet";
import YamLoader from "components/YamLoader";
import Chart from "react-apexcharts";
import Split from "components/Split";
import UnlockWalletModal from "components/UnlockWalletModal";
import { OptionInterface } from "types/Charts";
import numeral from "numeral";

interface ChartsProps {
  seriesReserves: any;
  assetsColors: any;
}

const Charts: React.FC<ChartsProps> = ({ seriesReserves, assetsColors }) => {
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const { darkMode, colors } = useTheme();

  const { status } = useWallet();

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

  let optsReserves: OptionInterface = {
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
      colors: assetsColors,
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
    colors: assetsColors,
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

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);

  const DisplayChartReserves = useMemo(() => {
    if (seriesReserves) {
      return (
        <>
          <CardContent>
            <Split>
              <Chart options={optsReserves ? optsReserves : {}} series={seriesReserves ? seriesReserves : []} type="area" height={300} />
            </Split>
          </CardContent>
        </>
      );
    } else {
      return (
        <>
          <YamLoader space={320}></YamLoader>
        </>
      );
    }
  }, [optsReserves, seriesReserves]);

  const DisplayCharts = useMemo(() => {
    if (status === "connected") {
      return (
        <>
          <Card>
            <CardTitle text="💰 Treasury History ($)" />
            <Spacer size="sm" />
            {DisplayChartReserves}
          </Card>
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
  }, [status, handleUnlockWalletClick, unlockModalIsOpen, handleDismissUnlockModal, DisplayChartReserves]);

  return <>{DisplayCharts}</>;
};

export default Charts;
