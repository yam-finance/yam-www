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

import strain from '../../assets/randomStrainNFT.png'
import twoStrainsNew from '../../assets/two-strains-new.png'
import { getDaysRemaining, getHoursMinusDaysRemaining, getMinutesMinusHoursRemaining, getSecondsMinusMinutesRemaining, useTimer } from 'hooks/useTimer';
import styled from 'styled-components';

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { vestedBalance } = useVesting()

  const [timeRemaining, setTimeRemaining] = useState<string | undefined>(undefined)
  const endTime = 1608163117
  const currentTime = useTimer()
  const showTimer = false
 

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
        subtitle="DeFi Staked NFT Ecosystem"
        title="Fun, DeFi-staked NFT Collectibles"
        imgSrc2={strain}
      />
      {showTimer && <StyledTime>{timeRemaining}</StyledTime>}
    </Page>
  )
}


const StyledTime = styled.div`
  font-size: 5rem;
  font-weight: 500;
  color: #00AC69;

  @media (max-width: 768px) {
    font-size: 4rem;
  }

`

export default Home
