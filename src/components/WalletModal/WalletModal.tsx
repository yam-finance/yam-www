import React, { useCallback, useMemo } from 'react'

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import numeral from 'numeral'
import {
  Box,
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'
import useFarming from 'hooks/useFarming'
import { bnToDec } from 'utils'

const WalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { reset } = useWallet()
  const {
    strnEthLpBalance,
    strnTokenBalance,
    strnIncBalance
  } = useBalances()

  const {
    earnedBalance
  } = useFarming()

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const formattedEarnedBalance = useMemo(() => {
    if (earnedBalance) {
      return numeral(bnToDec(earnedBalance)).format('0.00a')
    } else {
      return '--'
    }
  }, [earnedBalance])

  const handleSignOut = useCallback(() => {
    reset()
  }, [reset])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="My Wallet" />
      <ModalContent>
        <Split>
          <Box row>
            <FancyValue
              icon="🧬"
              label="STRN balance"
              value={getDisplayBalance(strnTokenBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="UNI-V2 balance"
              value={getDisplayBalance(strnEthLpBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon="🧬"
              label="Claimable STRN"
              value={formattedEarnedBalance}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="Staked LP Tokens"
              value={getDisplayBalance(strnIncBalance)}
            />
          </Box>
        </Split>
        <Spacer />
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          onClick={handleSignOut}
          text="SignOut"
        />
      </ModalActions>
    </Modal>
  )
}

export default WalletModal