import React from 'react'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

//import useBalances from 'hooks/useBalances'
import useVesting from 'hooks/useVesting'

import Rebase from './components/Rebase'
import RegisterVoteNotice from './components/RegisterVoteNotice'
import Stats from './components/Stats'
import Treasury from './components/Treasury'
import VestingNotice from './components/VestingNotice'
import twoStrains from '../../assets/two-strains.png'

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  //const { strnEthLpBalance } = useBalances()
  const { vestedBalance } = useVesting()
  return (
    <Page>
      <PageHeader
        imgSrc={twoStrains}
        subtitle={darkMode ? "🤫 shhh... the YAMs are sleeping." : "It's a great day to farm YAMs!"}
        title="Welcome to Strain."
      />
      <Container>
        <RegisterVoteNotice />
        <Spacer />
        {(vestedBalance && vestedBalance.toNumber() > 0) && (
          <>
            <VestingNotice />
            <Spacer />
          </>
        )}
        <Treasury />
        <Spacer />
        <Split>
          <Rebase />
          <Stats />
        </Split>
      </Container>
    </Page>
  )
}

export default Home
