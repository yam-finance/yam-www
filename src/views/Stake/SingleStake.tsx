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
    lastExpiringStake,
    userStakes,
  } = useStaking()

  const {
    strnTokenBalance,
  } = useBalances()

  const currentTime = useTimer()
  const [disableStaking, setDisableStaking] = useState<boolean>(true)
  const [disableUnstaking, setDisableUnstaking] = useState<boolean>(true)


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
    if (lastExpiringStake && lastExpiringStake.lockDate && currentTime) {
      const daysRemaining = getDaysRemaining(lastExpiringStake.lockDate, currentTime);
      const hoursRemaining = getHoursMinusDaysRemaining(
        lastExpiringStake.lockDate,
        currentTime
      );
      const minutesRemaining = getMinutesMinusHoursRemaining(
        lastExpiringStake.lockDate,
        currentTime
      );
      const secondsRemaining = getSecondsMinusMinutesRemaining(
        lastExpiringStake.lockDate,
        currentTime
      );
      setUnlockTimer(`${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`)
    } else {
      setUnlockTimer(undefined)
    }
  }, [lastExpiringStake, currentTime])

  useEffect(() => {
    if (userStakes) {
      // 1. if any stake with amount == 0 and lockDate > 0 disable stake button
      const disableStakeButton = userStakes.filter(s => new BigNumber(s.amount).gt(0) && new BigNumber(s.lockDate).gt(0))
      const hasUnstaked = userStakes.filter(s => new BigNumber(s.amount).eq(0))
      setDisableStaking(disableStakeButton.length > 0 || hasUnstaked.length > 0);
      // 2. if any stake lockDate > currentTime disable unstake button. 
      const disableUnstakButton = userStakes.filter(s => new BigNumber(s.lockDate).gt(new BigNumber(currentTime)))
      setDisableUnstaking(disableUnstakButton.length > 0)
    }
  }, [userStakes])

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
    if (status !== 'connected' || disableStaking) {
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
    if (status !== 'connected' || disableUnstaking || (withdrawStakeAmount && withdrawStakeAmount.eq(0))) {
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
                <Label text={`unstake after last stake unlocks`} />
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
        disableUnstaking={true}
      />
    </>
  )
}

export default SingleStake
