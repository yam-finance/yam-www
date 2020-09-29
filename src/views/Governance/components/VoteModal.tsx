import React, { useCallback, useMemo, useState } from 'react'

import { Line } from 'rc-progress';
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
  Card,
  CardContent
} from 'react-neu'

import styled from 'styled-components'

import useYam from 'hooks/useYam'
import { Proposal } from "../../../contexts/Governance/types"
import Split from 'components/Split'

interface VoteModalProps extends ModalProps {
  prop: Proposal,
  onVote: (proposal: number, side: boolean) => void,
}

const VoteModal: React.FC<VoteModalProps> = ({
  prop,
  isOpen,
  onDismiss,
  onVote,
}) => {

  const handleVoteClickTrue = useCallback(() => {
    onVote(prop.id, true)
  }, [onVote])

  const handleVoteClickFalse = useCallback(() => {
    onVote(prop.id, false)
  }, [onVote])

  let percFor = prop.forVotes / (prop.forVotes + prop.againstVotes) * 100;
  let percAgainst = prop.againstVotes / (prop.forVotes + prop.againstVotes) * 100;

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Proposal Overview" />
      <ModalContent>
        <Spacer size="sm"/>
        <Split>
          <CardContent>
            <Button
              size="sm"
              href={"https://etherscan.io/tx/" + prop.hash}
              text="View On Etherscan"
              variant="tertiary"
             />
            { (prop.more) && (<Spacer size="sm" />) }
            { (prop.more) && (
              <Button
               size="sm"
               href={prop.more}
               text="Read More & See Off-Chain Vote"
               variant="tertiary"
              />
            )}
          </CardContent>
          <Card>
            <CardContent>
              Votes
              <Separator />
              <Spacer size="sm" />
              <StyledLineHolder>
                For: {numeral(prop.forVotes).format('0.a')}
                <Line percent={percFor} strokeWidth={1} strokeColor="#ec0e5c" />
              </StyledLineHolder>
              <Spacer size="sm" />
              <StyledLineHolder>
                Against: {numeral(prop.againstVotes).format('0.a')}
                <Line percent={percAgainst} strokeWidth={1} strokeColor="#ec0e5c" />
              </StyledLineHolder>
            </CardContent>
          </Card>
        </Split>
        <Spacer size="md"/>
        <Card>
          <CardContent>
            <StyledDescription>
              <span>Description:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
              <span>  {prop.description}</span>
            </StyledInfo>
            <Spacer size="sm"/>
            <Separator />
            <Spacer size="sm"/>
            <StyledDescription>
              <span>Affecting:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
              <span>  {prop.targets}</span>
            </StyledInfo>
            <Spacer size="sm"/>
            <Separator />
            <Spacer size="sm"/>
            <StyledDescription>
              <span>Function Calls:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
            {prop.signatures.map(sig => <code>{sig}</code>)}
            </StyledInfo>
            <Spacer size="sm"/>
            <Separator />
            <Spacer size="sm"/>
            <StyledDescription>
              <span>Inputs:</span>
            </StyledDescription>
            <Spacer size="sm"/>
            <StyledInfo>
              {
                prop.inputs.map((input, i) => {
                  return (<code>{JSON.stringify(input)}</code>)
                })
              }
            </StyledInfo>
          </CardContent>
        </Card>
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="tertiary"
        />
        { (prop.state == "Active") && (
          <>
            <Button
              disabled={false}
              onClick={handleVoteClickTrue}
              text="For"
            />
            <Spacer size="md"/>
            <Button
              disabled={false}
              onClick={handleVoteClickFalse}
              text="Against"
            />
          </>)
        }
      </ModalActions>
    </Modal>
  )
}

const StyledLineHolder = styled.div`
  width: 80%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`

const StyledDescription = styled.div`
  font-weight: 600;
  font-size: 20px;
`

const StyledInfo = styled.div`
  font-size: 14px;
`
export default VoteModal
