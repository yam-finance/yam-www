import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import {
  strn as strnTokenAddress,
  singleStrnPool as strnStxnPoolAddress
} from 'constants/tokenAddresses'
import useYam from 'hooks/useYam'

import {
  getExitableAmount,
  getSingleEarned,
  getSingleStakeBalances,
  getSingleStakingEndTime,
  singleExit,
  stxpSingleHarvest,
  stxpSingleRedeem,
  stxpSingleStake,
} from 'yam-sdk/utils'

import Context from './Context'
import { SingleStake } from 'constants/poolValues'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [totalStaked, setTotakStaked] = useState<BigNumber>()
  const [earnedStxpPoolBalance, setEarnedStxpPoolBalance] = useState<BigNumber>()
  const [userStakes, setUserStakes] = useState<SingleStake[]>([])
  const [withdrawStakeAmount, setWithdrawStakeAmount] = useState<BigNumber>()
  const [endTime, setEndTime] = useState<BigNumber>()
  const [lastExpiringStake, setLastExpiringStake] = useState<SingleStake>()

  const yam = useYam()
  const { account } = useWallet()

  const getIncentivizerAddress = () => {
    return strnStxnPoolAddress
  }

  const fetchStakedBalance = useCallback(async () => {
    if (!account || !yam) return
    const exitableAmount = await getExitableAmount(yam.contracts.stxpInc_pool, account);
    setWithdrawStakeAmount(new BigNumber(String(exitableAmount)).dividedBy(new BigNumber(10).pow(18)))

    const stakes: SingleStake[] = await getSingleStakeBalances(yam.contracts.stxpInc_pool, account)
    const totalStaked = stakes.reduce((p, s) => p.plus(s.amount), new BigNumber(0))
    setTotakStaked(totalStaked)
    setUserStakes(stakes)

    console.log('user stakes', stakes)

    if (stakes && stakes.length > 0) {
      const current = (new Date().getTime() / 1000);
      const lastExpiringStake = stakes.filter(s => s.lockDate > current)
        .sort((a, b) => Number(a.lockDate) < Number(b.lockDate) ? 1 : -1)
      if (lastExpiringStake && lastExpiringStake.length > 0) {
        setLastExpiringStake(lastExpiringStake[0])
      }
      else {
        setLastExpiringStake(undefined)
      }
    }
  }, [
    account,
    setTotakStaked,
    setUserStakes,
    yam
  ])

  const fetchEarnedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getSingleEarned(yam, yam.contracts.stxpInc_pool, account)
    setEarnedStxpPoolBalance(balance)
  }, [
    account,
    setEarnedStxpPoolBalance,
    yam
  ])

  const fetchBalances = useCallback(async () => {
    fetchEarnedBalance()
    fetchStakedBalance()
  }, [
    fetchEarnedBalance,
    fetchStakedBalance
  ])

  const handleHarvest = useCallback(async () => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsHarvesting(true)
    await stxpSingleHarvest(yam.contracts.stxpInc_pool, yam.web3.eth, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
    })
    setIsHarvesting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam
  ])

  // amount is the amount of STRN user wants to exit and will claim all STXP
  const handleRedeem = useCallback(async (amount) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsRedeeming(true)
    await stxpSingleRedeem(yam.contracts.stxpInc_pool, yam.web3.eth, amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsRedeeming(false)
    })
    setIsRedeeming(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    yam
  ])

  const handleStake = useCallback(async (duration: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsStaking(true)
    await stxpSingleStake(yam.contracts.stxpInc_pool, yam.web3.eth, duration, amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsStaking(false)
    })
    setIsStaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    yam
  ])

  const handleUnstake = useCallback(async (amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsUnstaking(true)
    await singleExit(yam.contracts.stxpInc_pool, yam.web3.eth, amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsUnstaking(false)
    })
    setIsUnstaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsUnstaking,
    yam
  ])

  useEffect(() => {
    if (yam) getSingleStakingEndTime(yam, yam.contracts.stxpInc_pool).then(endTime => setEndTime(endTime))
    fetchBalances()
    let refreshInterval = setInterval(() => {
      fetchBalances()
    }, 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchBalances, yam])

  return (
    <Context.Provider value={{
      setConfirmTxModalIsOpen,
      earnedStxpPoolBalance,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
      getIncentivizerAddress,
      totalStaked,
      strnTokenAddress,
      endTime,
      withdrawStakeAmount,
      lastExpiringStake,
      userStakes
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider