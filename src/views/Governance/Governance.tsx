import React, { useEffect, useCallback, useMemo, useState }  from 'react'
import {
  Container,
  Spacer,
  Card,
  CardTitle,
  CardContent,
  Separator,
  Surface,
  Button
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'


import SeparatorGrid from "./components/SeparatorWithCSS"
import Box from "./components/BoxWithDisplay"

import useGovernance from 'hooks/useGovernance'

import { ProposalEntry, StyledDescription, StyledState, StyledButton, StyledProposalContentInner}  from './components/Proposal'


const ASTRONAUTS = [
  '👨‍🚀',
  '👨🏻‍🚀',
  '👨🏼‍🚀',
  '👨🏽‍🚀',
  '👨🏾‍🚀',
  '👩‍🚀',
  '👩🏻‍🚀',
  '👩🏼‍🚀',
  '👩🏽‍🚀',
  '👩🏾‍🚀‍',
  '👩🏿‍🚀'
]

const Governance: React.FC = () => {
  const { proposals, onVote } = useGovernance();

  const [astronaut, setAstronaut] = useState('👨‍🚀')

  const updateAstronaut = useCallback(() => {
    const newAstro = ASTRONAUTS[Math.floor(Math.random()*ASTRONAUTS.length)]
    setAstronaut(newAstro)
  }, [setAstronaut])

  useEffect(() => {
    const refresh = setInterval(updateAstronaut, 1000)
    return () => clearInterval(refresh)
  }, [updateAstronaut])

  return (
    <Page>
      <PageHeader
        icon={`${astronaut}`}
        subtitle="View and vote on proposals below!"
        title="Govern"
      />

      <Container>
        <Split>
          <Spacer />
          <Button
            full
            text="Forum"
            href="https://forum.yam.finance"
            variant="tertiary"
          />
          <Spacer />
          <Button
            full
            text="Off-chain Voting"
            href="https://snapshot.page/#/yam"
            variant="tertiary"
          />
          <Spacer />
        </Split>
        <Spacer size="lg"/>
        <Card>
          <CardTitle text="Proposals" />
          <Spacer size="sm" />
          <CardContent>
            <Box
              display="grid"
              alignItems="center"
              paddingLeft={4}
              paddingRight={4}
              paddingBottom={1}
              row
            >
             <StyledProposalContentInner>
               <StyledDescription>Description</StyledDescription>
               <SeparatorGrid orientation={'vertical'} stretch={true} gridArea={'spacer1'}/>
               <StyledState>State</StyledState>
               <SeparatorGrid orientation={'vertical'} stretch={true} gridArea={'spacer2'}/>
               <StyledButton>Action</StyledButton>
             </StyledProposalContentInner>
            </Box>
            <Spacer size="sm"/>
            { (proposals) &&
              (<Surface>
                {
                  proposals.map((prop, i) => {
                    if (i == 0) {
                      return <ProposalEntry key={prop.hash} prop={prop} onVote={onVote}/>
                    } else {
                      return [<Separator />, <ProposalEntry key={prop.hash} prop={prop} onVote={onVote}/>]
                    }
                  })
                }
              </Surface>)
            }
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

export default Governance
