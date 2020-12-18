import React, { useEffect, useMemo, useState } from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import SingleHarvestCard from './SingleHarvest'
import SingleStakeCard from './SingleStake'
import useStaking from 'hooks/useStaking'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'


const StyledNotice = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 100%
  color: ${props => props.theme.colors.primary.main};
`

const Stake: React.FC = () => {
  const {
    userStakes,
  } = useStaking()

  const [showContactMessage, setShowContactMessage] = useState<boolean>(false)
  const [showHasUnstaked, setShowHasUnstaked] = useState<boolean>(false)

  useEffect(() => {
    if (userStakes) {
      // see 1 and 2 in SingleStake.tsx
      // 1. if any stake with amount == 0 and lockDate > 0 disable stake button
      // 2. if any stake lockDate > currentTime disable unstake button. 

      // 3. if there is stake with amount ==0 followed by any stake with amount > 0 then have them contact us for help
      const hasUnstaked = userStakes.filter(s => new BigNumber(s.amount).eq(0))
      setShowHasUnstaked(hasUnstaked.length > 0)
      if (hasUnstaked.length > 0) {
        const contactMessage = userStakes.filter(s => new BigNumber(s.amount).gt(0))
        setShowContactMessage(contactMessage.length > 0)
      }
    }
  }, [userStakes])

  return (
    <Page>
      <Container>
        <PageHeader
          imgSrc=""
          subtitle="One stake per account"
          title="Stake STRN, earn STXP"
        />
        <Split>
          <SingleStakeCard />
          <SingleHarvestCard />
        </Split>
        <Spacer size="lg" />
        <PageHeader
          imgSrc=""
          subtitle="Unstaking automatically claims STXP"
          title=""
        />
        <Spacer />
        <Spacer size="md" />
        {showContactMessage && <StyledNotice>
          <span>There might be an issue with your STRN stake.</span>
          <span>Please contact us in discord, see link below.</span>
        </StyledNotice>}
        <Spacer size="md" />
        {showHasUnstaked && <StyledNotice>
          <span>This account has already staked and unstaked.</span>
          <span>Staking is been disabled. You can use a different account.</span>
          </StyledNotice>}
      </Container>
    </Page>
  )
}

export default Stake
