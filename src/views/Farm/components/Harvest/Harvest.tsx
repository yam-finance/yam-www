import React, { useCallback, useEffect, useMemo, useState } from "react";

import numeral from "numeral";
import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";
import { useWallet } from "use-wallet";

import Label from "components/Label";
import Value from "components/Value";

import useFarming from "hooks/useFarming";

import { bnToDec } from "utils";

const Harvest: React.FC = () => {
  const [earnedBalance, setEarnedBalance] = useState<number>(0);
  const { status } = useWallet();
  const { earnedBalanceYAMETH, isHarvesting, isRedeeming, onHarvestYAMETH } = useFarming();

  const formattedEarnedBalance = useCallback(async () => {
    if (earnedBalanceYAMETH && bnToDec(earnedBalanceYAMETH) > 0) {
      setEarnedBalance(bnToDec(earnedBalanceYAMETH));
    } else {
      setEarnedBalance(0);
    }
  }, [earnedBalanceYAMETH]);

  useEffect(() => {
    formattedEarnedBalance();
    let refreshInterval = setInterval(formattedEarnedBalance, 10000);
    return () => clearInterval(refreshInterval);
  }, [formattedEarnedBalance]);

  const HarvestAction = useMemo(() => {
    if (status !== "connected") {
      return <Button disabled full text="Harvest" variant="secondary" />;
    }
    if (!isHarvesting) {
      return <Button disabled={earnedBalance <= 0} full onClick={onHarvestYAMETH} text="Harvest" variant="secondary" />;
    }
    if (isHarvesting) {
      return <Button disabled full text="Harvesting..." variant="secondary" />;
    }
  }, [isHarvesting, isRedeeming, earnedBalance, onHarvestYAMETH]);

  return (
    <>
      <Card>
        <Spacer size="md" />
        <CardIcon>🍠</CardIcon>
        <CardContent>
          <Box alignItems="center" column>
            <Value value={earnedBalance > 0 ? earnedBalance.toString() : "--"} />
            <Label text="Unharvested YAMs" />
          </Box>
        </CardContent>
        <CardActions>{HarvestAction}</CardActions>
      </Card>
    </>
  );
};

export default Harvest;
