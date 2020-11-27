import React from 'react'
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


const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { vestedBalance } = useVesting()
  return (
    <Page>
      <HomePageHeader
        imgSrc={twoStrains}
        subtitle="Upgrade and breed yield generating NFTs"
        title="Fun, DeFi-staked NFT Collectibles"
        imgSrc2={strain}
      />
    </Page>
  )
}


export default Home
