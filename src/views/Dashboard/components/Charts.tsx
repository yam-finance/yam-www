import React, { useState, useCallback, useMemo } from "react";
import { Box, Button, Card, CardContent, CardTitle, Spacer} from "react-neu";
import { useWallet } from "use-wallet";
import YamLoader from "components/YamLoader";
import Chart from "react-apexcharts";
import Split from "components/Split";
import UnlockWalletModal from "components/UnlockWalletModal";

interface ChartsProps {
  seriesReserves: any,
  optsReserves: any
}

const Charts: React.FC<ChartsProps> = ({ seriesReserves, optsReserves }) => {
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);

  const { status } = useWallet();

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
