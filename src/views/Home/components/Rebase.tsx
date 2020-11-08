import React, { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardIcon,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import Dial from 'components/Dial'
import Label from 'components/Label'

import useYam from 'hooks/useYam'

import { getNextRebaseTimestamp } from 'yam-sdk/utils'

const Rebase: React.FC = () => {
  const yam = useYam()

  const [nextRebase, setNextRebase] = useState(0)
  const [rebaseWarningModal, setRebaseWarningModal] = useState(false)
  
  const { account } = useWallet()
  const fetchNextRebase = useCallback( async() => {
    if (!yam) return
    const nextRebaseTimestamp = await getNextRebaseTimestamp(yam)
    if (nextRebaseTimestamp) {
      setNextRebase(Date.now() + nextRebaseTimestamp * 1000)
    } else {
      setNextRebase(0)
    }
  }, [
    setNextRebase,
    yam
  ])

  useEffect(() => {
    if (yam) {
      fetchNextRebase()
    }
  }, [fetchNextRebase, yam])

  const handleRebaseClick = useCallback(async () => {
    if (!yam) return
    await yam.contracts.rebaser.methods.rebase().send({ from: account, gas: 500000 })
  }, [account, yam])

  return (
    <>
      <Card>
        <CardContent>
          <Box
            alignItems="center"
            justifyContent="center"
            row
          >
          </Box>
          <Spacer />
          <Button
            disabled={!account}
            onClick={() => setRebaseWarningModal(true)}
            text="Rebase"
            variant="secondary"
          />
        </CardContent>
      </Card>
      <Modal isOpen={rebaseWarningModal}>
        <CardIcon>⚠️</CardIcon>
        <ModalContent>
          WARNING: Only 1 rebase transaction succeeds every 12 hours. This transaction will likely fail.
        </ModalContent>
        <ModalActions>
          <Button
            onClick={() => setRebaseWarningModal(false)}
            text="Cancel"
            variant="secondary"
          />
          <Button
            onClick={handleRebaseClick}
            text="Confirm rebase"
          />
        </ModalActions>
      </Modal>
    </>
  )
}

const StyledCountdown = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCountdownText = styled.span`
  color: ${props => props.theme.colors.primary.main};
  font-size: 36px;
  font-weight: 700;
`

export default Rebase