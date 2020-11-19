import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Container,
  Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'
import numeral from 'numeral'
import DurationStakeModal from 'views/Modals/DurationStakeModal'
import UnstakeModal from 'views/Modals/UnstakeModal'
import styled from 'styled-components'
import useApproval from 'hooks/useApproval'
import useBalances from 'hooks/useBalances'
import SplitRow from 'components/SplitRow'
import { StyledSubtitle } from 'components/PageHeader/PageHeader'
import useStaking from 'hooks/useStaking'
import BigNumber from 'bignumber.js'
import { bnToDec } from 'utils'
import { getDaysRemaining, getHoursMinusDaysRemaining, getMinutesMinusHoursRemaining, getSecondsMinusMinutesRemaining, useTimer } from 'hooks/useTimer'

const SingleStake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)
  const [unlockTimer, setUnlockTimer] = useState<string>()

  const { status } = useWallet()
  const {
    strnTokenAddress,
    setConfirmTxModalIsOpen,
    isStaking,
    isUnstaking,
    onStake,
    onUnstake,
    getIncentivizerAddress,
    totalStaked,
    endTime,
    withdrawStakeAmount,
    nextExpiringStake
  } = useStaking()

  const {
    strnTokenBalance,
  } = useBalances()

  const currentTime = useTimer()

  const { isApproved, isApproving, onApprove } = useApproval(
    strnTokenAddress,
    getIncentivizerAddress(),
    () => setConfirmTxModalIsOpen(false)
  )

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])

  useEffect(() => {
    if (nextExpiringStake && nextExpiringStake.lockDate && currentTime) {
      const daysRemaining = getDaysRemaining(nextExpiringStake.lockDate, currentTime);
      const hoursRemaining = getHoursMinusDaysRemaining(
        nextExpiringStake.lockDate,
        currentTime
      );
      const minutesRemaining = getMinutesMinusHoursRemaining(
        nextExpiringStake.lockDate,
        currentTime
      );
      const secondsRemaining = getSecondsMinusMinutesRemaining(
        nextExpiringStake.lockDate,
        currentTime
      );
      setUnlockTimer(`${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`)
    } else {
      setUnlockTimer(undefined)
    }
  }, [nextExpiringStake, currentTime])

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false)
  }, [setUnstakeModalIsOpen])

  const handleOnStake = useCallback((duration: string, amount: string) => {
    onStake(duration, amount)
    handleDismissStakeModal()
  }, [handleDismissStakeModal, onStake])

  const handleOnUnstake = useCallback((amount: string) => {
    onUnstake(amount)
    handleDismissUnstakeModal()
  }, [
    handleDismissUnstakeModal,
    onUnstake,
  ])

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true)
  }, [setUnstakeModalIsOpen])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Stake"
          variant="secondary"
        />
      )
    }
    if (isStaking) {
      return (
        <Button
          disabled
          full
          text="Staking..."
          variant="secondary"
        />
      )
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={handleApprove}
          text={!isApproving ? "Approve staking" : "Approving staking..."}
          variant={isApproving || status !== 'connected' ? 'secondary' : 'default'}
        />
      )
    }

    if (isApproved) {
      return (
        <Button
          full
          onClick={handleStakeClick}
          text="Stake"
        />
      )
    }
  }, [
    handleStakeClick,
    isApproving,
    isStaking,
    handleApprove,
    status,
  ])

  const UnstakeButton = useMemo(() => {
    if (status !== 'connected' || (withdrawStakeAmount && withdrawStakeAmount.eq(0))) {
      return (
        <Button
          disabled
          full
          text="Unstake"
          variant="secondary"
        />
      )
    }
    if (isUnstaking) {
      return (
        <Button
          disabled
          full
          text="Unstaking..."
          variant="secondary"
        />
      )
    }
    return (
      <Button
        full
        onClick={handleUnstakeClick}
        text="Unstake"
        variant="secondary"
      />
    )
  }, [
    handleUnstakeClick,
    isApproving,
    isUnstaking,
    handleApprove,
    status,
    withdrawStakeAmount
  ])

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const getDisplayTotalBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(bnToDec(value)).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const showDurationModal = useMemo(() => {
    return stakeModalIsOpen ? <DurationStakeModal
      isOpen={stakeModalIsOpen}
      onDismiss={handleDismissStakeModal}
      onStake={handleOnStake}
      label={'STRN'}
      fullBalance={strnTokenBalance}
      maxTimestamp={endTime}
    /> : null
  }, [stakeModalIsOpen, strnTokenBalance, endTime])

  return (
    <>
      <Card>
        <Container size="sm">
          <Spacer />
          <StyledSubtitle>Stake STRN</StyledSubtitle>
        </Container>
        <CardIcon>🧬</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            row
          >
            <SplitRow>
              <>
                <Value value={getDisplayTotalBalance(totalStaked)} />
                <Label text={`Staked`} />
              </>
              <>
                <Value value={getDisplayBalance(strnTokenBalance)} />
                <Label text={`Wallet`} />
              </>
            </SplitRow>
          </Box>
          <Box
            alignItems="center"
            row
          >
            <SplitRow>
              <>
                <Value value={unlockTimer ? unlockTimer : '--'} />
                <Label text={`next stake unlock`} />
              </>
            </SplitRow>
          </Box>
          <Box>
            <>
              <Value value={getDisplayBalance(withdrawStakeAmount)} />
              <Label text={`unstakeable`} />
            </>
          </Box>
        </CardContent>
        <CardActions>
          {UnstakeButton}
          {StakeButton}
        </CardActions>
      </Card>
      {showDurationModal}
      <UnstakeModal
        isOpen={unstakeModalIsOpen}
        onDismiss={handleDismissUnstakeModal}
        onUnstake={handleOnUnstake}
        label={'STRN'}
        fullBalance={withdrawStakeAmount}
      />
    </>
  )
}

export default SingleStake
