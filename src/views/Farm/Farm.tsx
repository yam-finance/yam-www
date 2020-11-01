import React, { useMemo } from 'react'

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

const Farm: React.FC = () => {
  return (
    <Page>
      <Container>
        <PageHeader
          imgSrc=""
          subtitle="Stake LP tokens to earn STRN"
          title=""
        />
        <Split>
          <StakeCard poolId={"0"} lpEmoji={'🔒'} lpLabel={'STRN/ETH'} />
          <StakeCard poolId={"1"} lpImage={'strain-xiotri-sm.png'} lpLabel={'STRN/XIOT'} />
        </Split>
        <Spacer />
        <Split>
          <RedeemButton poolId={"0"} />
          <RedeemButton poolId={"1"} />
        </Split>
        <Spacer size="lg" />
        <Separator />
      </Container>
      <Container>
        <Spacer size="lg" />
        <PageHeader
          imgSrc=""
          subtitle="Total earned STRN"
          title=""
        />
        <Split>
          <HarvestCard poolId={"1"} />
        </Split>
        <Spacer size="lg" />
        <Separator />
      </Container>
    </Page>
  )
}

export default Farm
