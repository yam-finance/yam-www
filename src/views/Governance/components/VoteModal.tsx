import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import TokenInput from 'components/TokenInput'
import useBalances from 'hooks/useBalances'
import { getFullDisplayBalance } from 'utils'
import { Proposal } from "../../../contexts/Governance/types"

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

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Vote" />
      <ModalContent>
        {prop.description}
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="tertiary"
        />
        <Button
          disabled={false}
          onClick={handleVoteClickTrue}
          text="For"
        />
        <Button
          disabled={false}
          onClick={handleVoteClickFalse}
          text="Against"
        />
      </ModalActions>
    </Modal>
  )
}

export default VoteModal
