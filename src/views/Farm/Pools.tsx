import React, { useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'
import RedeemButton from './components/Stake/Redeem'
import { PoolIds } from 'constants/poolValues'

const Pools: React.FC = () => {
  const [showDefaultXiotri, setShowDefaultXiotri] = useState(true)

  useEffect(() => {
    let imagePicker = setInterval(() => setShowDefaultXiotri(!showDefaultXiotri), 20 * 1000)
    return () => clearInterval(imagePicker)
  },[showDefaultXiotri])

  return (
    <Page>
      <Container>
        <PageHeader
          imgSrc=""
          subtitle="STRN/ETH LP pool to earn STRN"
          title=""
        />
        <Split>
          <StakeCard poolId={PoolIds.STRN_ETH} lpEmoji={'🔒'} lpLabel={'STRN/ETH'} />
          <HarvestCard poolId={PoolIds.STRN_ETH} />
        </Split>
        <Spacer size="lg" />
        <RedeemButton poolId={PoolIds.STRN_ETH} />
        <Spacer />
        <Spacer size="lg" />

      </Container>
      <Container>
        <Spacer size="lg" />
        <PageHeader
          imgSrc=""
          subtitle="STRN/XIOT LP pool to earn STRN"
          title=""
        />
        <Split>
          <StakeCard poolId={PoolIds.STRN_XIOT} lpImage={showDefaultXiotri ? 'strain-xiotri-sm.png' : 'strain-xiotri-sm-2.png'} lpLabel={'STRN/XIOT'} />
          <HarvestCard poolId={PoolIds.STRN_XIOT} />
        </Split>
        <Spacer size="lg" />
        <RedeemButton poolId={PoolIds.STRN_XIOT} />
        <Spacer size="lg" />
        <Separator />
      </Container>
    </Page>
  )
}

export default Pools
