import React, { useEffect, useState } from 'react'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'

import Page from 'components/Page'
import HomePageHeader from 'components/HomePageHeader'
import HowItWorks from 'components/HowItWorks';

//import useBalances from 'hooks/useBalances'
import useVesting from 'hooks/useVesting'
import twoStrains from '../../assets/two-strains.png'
import plant from '../../assets/eth-flower.png'
import { getDaysRemaining, getHoursMinusDaysRemaining, getMinutesMinusHoursRemaining, getSecondsMinusMinutesRemaining, useTimer } from 'hooks/useTimer';
import styled from 'styled-components';

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { vestedBalance } = useVesting()

  const [timeRemaining, setTimeRemaining] = useState<string | undefined>(undefined)
  const endTime = 1608163117
  const currentTime = useTimer()

  useEffect(() => {
    if (endTime && currentTime) {
      const daysRemaining = getDaysRemaining(endTime, currentTime);
      const hoursRemaining = getHoursMinusDaysRemaining(
        endTime,
        currentTime
      );
      const minutesRemaining = getMinutesMinusHoursRemaining(
        endTime,
        currentTime
      );
      const secondsRemaining = getSecondsMinusMinutesRemaining(
        endTime,
        currentTime
      );
      setTimeRemaining(`${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`)
    } else {
      setTimeRemaining(undefined)
    }
  }, [currentTime])

  return (
    <Page>
      <HomePageHeader 
        imgSrc={twoStrains}
        subtitle="Upgrade and breed yield generating NFTs"
        title="Fun, DeFi-staked NFT Collectibles"
        imgSrc2={plant}
      />
      <StyledTime>{timeRemaining}</StyledTime>
      <StyledAnnon>
      Please note; the Strain NFT team are preparing to launch the Apothecary and all new contracts to main net. You have [time] to unstake your LP tokens from /pools, otherwise funds will be lost forever! Help to share the message, and get ready 🚀

      </StyledAnnon>
      <HowItWorks></HowItWorks>
    </Page>
  )
}

const StyledAnnon = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #8D87FB;
  margin: 5rem;
  width: 50%;

  @media (max-width: 768px) {
    font-size: 1rem;
    width: 90%
  }

`
const StyledTime = styled.div`
  font-size: 5rem;
  font-weight: 500;
  color: #00AC69;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`

export default Home
