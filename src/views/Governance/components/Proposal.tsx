import React, { useCallback, useMemo, useState, Fragment } from 'react'

import BigNumber from 'bignumber.js'
import {
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
  Spacer,
  Surface
} from 'react-neu'

import SeparatorGrid from "./SeparatorWithCSS"
import Box from "./BoxWithDisplay"

import TokenInput from 'components/TokenInput'
import useBalances from 'hooks/useBalances'
import { getFullDisplayBalance } from 'utils'

import styled from 'styled-components'
import { Proposal } from "../../../contexts/Governance/types"
import VoteModal from './VoteModal'

interface ProposalProps {
  key: string,
  prop: Proposal,
  onVote: (proposal: number, side: boolean) => void,
}

export const ProposalEntry: React.FC<ProposalProps> = ({
  prop,
  onVote
}) => {
  console.log(prop.state)

  const [voteModalIsOpen, setVoteModalIsOpen] = useState(false)

  const handleDismissVoteModal = useCallback(() => {
    setVoteModalIsOpen(false)
  }, [setVoteModalIsOpen])

  const handleOnVote = useCallback((proposal: number, side: boolean) => {
    onVote(proposal, side)
  }, [onVote])

  const handleVoteClick = useCallback(() => {
    setVoteModalIsOpen(true)
  }, [setVoteModalIsOpen])

  return (
    <Fragment>
         <Box
           display="grid"
           alignItems="center"
           padding={4}
           row
         >
          <StyledProposalContentInner>
            <StyledDescription>{prop.description}</StyledDescription>
            <SeparatorGrid orientation={'vertical'} stretch={true} gridArea={'spacer1'}/>
            <StyledState>{prop.state}</StyledState>
            <SeparatorGrid orientation={'vertical'} stretch={true} gridArea={'spacer2'}/>
            <StyledButton>
              { (  prop.state != "Active" ) && (<Button
                size="sm"
                href={"https://etherscan.io/tx/" + prop.hash}
                text="View"
                variant="tertiary"
               />)
               || (prop.state == "Active") && (
                   <Button
                   size="sm"
                   text="Vote"
                   onClick={handleVoteClick}
                  />
                )
              }
            </StyledButton>
          </StyledProposalContentInner>
         </Box>
         <VoteModal
           prop={prop}
           isOpen={voteModalIsOpen}
           onDismiss={handleDismissVoteModal}
           onVote={handleOnVote}
         />
   </Fragment>
  )
}


export const StyledButton = styled.div`
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export const StyledDescription = styled.span`
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export const StyledState = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: state;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export const StyledProposalContentInner = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 70fr 5px 12fr 5px 18fr;
  grid-template-areas: "desc spacer1 state spacer2 vote";
  grid-template-rows: 100fr;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`
