import React, { useMemo, useState } from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'

import { bnToDec } from 'utils'

const Harvest: React.FC = () => {
  const [earnedBalanceValue, setEarnedBalanceValue] = useState<number>(0);
  const { status } = useWallet();
  const { earnedBalanceYAMETH, isHarvesting, isRedeeming, onHarvestYAMETH } = useFarming();


  const formattedEarnedBalance = useMemo(() => {
    if (earnedBalanceYAMETH) {
      setEarnedBalanceValue(bnToDec(earnedBalanceYAMETH))
      return numeral(bnToDec(earnedBalanceYAMETH)).format('0.00a')
    } else {
      return '--'
    }
  }, [earnedBalanceYAMETH])
  

  const HarvestAction = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Harvest"
          variant="secondary"
        />
      )
    }
    if (!isHarvesting) {
      return (
        <Button
          disabled={earnedBalanceValue <= 0}
          full
          onClick={onHarvestYAMETH}
          text="Harvest"
          variant="secondary"
        />
      )
    }
    if (isHarvesting) {
      return (
        <Button
          disabled
          full
          text="Harvesting..."
          variant="secondary"
        />
      )
    }
  }, [
    isHarvesting,
    isRedeeming,
    earnedBalanceValue,
    onHarvestYAMETH,
  ])

  return (
    <>
      <Card>
        <CardIcon>🍠</CardIcon>
        <CardContent>
          <Box alignItems="center" column>
            <Value value={formattedEarnedBalance} />
            <Label text="Unharvested YAMs" />
          </Box>
        </CardContent>
        <CardActions>
          {HarvestAction}
        </CardActions>
      </Card>
    </>
  );
}

export default Harvest