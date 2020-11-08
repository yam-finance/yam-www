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
    strnXiotLpBalance,
    strnEthLpPoolBalance,
    strnXiotLpPoolBalance
  } = useBalances()

  const {
    getEarnedBalances
  } = useFarming()

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const formattedStrnLPBalance = useMemo(() => {
    if (strnEthLpBalance) {
      return numeral(strnEthLpBalance).format('0.00a')
    } else {
      return '--'
    }
  }, [strnXiotLpBalance])

  const formattedStrnEthPoolBalance = useMemo(() => {
    if (strnEthLpPoolBalance) {
      return numeral(strnEthLpPoolBalance).format('0.00a')
    } else {
      return '--'
    }
  }, [strnEthLpPoolBalance])

  const formattedStrnXiotLPBalance = useMemo(() => {
    if (strnXiotLpBalance) {
      return strnXiotLpBalance.toFixed(8)
    } else {
      return '--'
    }
  }, [strnXiotLpBalance])

  const formattedStrnXiotPoolBalance = useMemo(() => {
    if (strnXiotLpPoolBalance) {
      return strnXiotLpPoolBalance.toFixed(8)
    } else {
      return '--'
    }
  }, [strnXiotLpPoolBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (getEarnedBalances) {
      const strnPoolBalance = getEarnedBalances("0")
      const xiotPoolBalance = getEarnedBalances("1")
      const total = strnPoolBalance.plus(xiotPoolBalance)
      return numeral(bnToDec(total)).format('0.00a')
    } else {
      return '--'
    }
  }, [getEarnedBalances])

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
          <Box column>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="STRN/ETH balance"
              value={formattedStrnLPBalance}
            />
            <Spacer />
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="STRN/XIOT balance"
              value={formattedStrnXiotLPBalance}
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
          <Box column>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="Staked STRN/ETH Tokens"
              value={formattedStrnEthPoolBalance}
            />
            <Spacer />
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
              label="Staked STRN/XIOT Tokens"
              value={formattedStrnXiotPoolBalance}
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