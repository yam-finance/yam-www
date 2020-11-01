import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import { useWallet } from 'use-wallet'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useFarming from 'hooks/useFarming'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'

const Farm: React.FC = () => {
  const { status } = useWallet()
  const {
    isRedeeming,
    onRedeem,
  } = useFarming()

  const RedeemButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          text="Claim &amp; Unstake"
          variant="secondary"
        />
      )
    }
    if (!isRedeeming) {
      return (
        <Button
          onClick={onRedeem}
          text="Claim &amp; Unstake"
          variant="secondary"
        />
      )
    }
    return (
      <Button
        disabled
        text="Redeeming..."
        variant="secondary"
      />
    )
  }, [
    isRedeeming,
    onRedeem,
  ])

  return (
    <Page>
      <PageHeader
        imgSrc=""
        subtitle="Stake STRN/ETH LP tokens and earn STRN"
        title="Stake"
      />
      <Container>
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {RedeemButton}
        </Box>
        <Spacer size="lg" />
        <Separator />
      </Container>
    </Page>
  )
}

export default Farm
