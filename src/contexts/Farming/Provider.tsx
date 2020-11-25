import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import {
  getAddresses
} from 'constants/tokenAddresses'
import useYam from 'hooks/useYam'

import {
  getEarned,
  harvest,
  redeem,
  stake,
  unstake,
} from 'yam-sdk/utils'

import Context from './Context'
import { getItemValue, setItemValue } from 'utils'

const addresses = getAddresses()

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState([false, false])
  const [isRedeeming, setIsRedeeming] = useState([false, false])
  const [isStaking, setIsStaking] = useState([false, false])
  const [isUnstaking, setIsUnstaking] = useState([false, false])

  const [earnedStrnPoolBalances, setEarnedStrnPoolBalance] = useState<BigNumber>()
  const [earnedXiotPoolBalances, setEarnedXiotPoolBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account } = useWallet()

  const lpAddresses = [addresses.strnLPTokenAddress, addresses.strnXiotLPTokenAddress]
  const getPoolLPAddress = (poolId: string) => {
    return lpAddresses[Number(poolId)]
  }
  
  const incentivizerAddresses = [addresses.strnEthIncAddress, addresses.strnXiotPoolAddress]
  const getIncentivizerAddress = (poolId: string) => {
    return incentivizerAddresses[Number(poolId)]
  }

  const getSetRewardsBalanceMethod = (poolId: string = "0") => {
    return [setEarnedStrnPoolBalance, setEarnedXiotPoolBalance][Number(poolId)]
  }

  const getIncContract = (poolId: string) => {
    if (yam) {
      if (poolId === "0") {
        return yam.contracts.strneth_pool
      }
      return yam.contracts.strnxiot_pool
    }
  }

  const getEarnedBalances = (poolId: string): BigNumber => {
    return [earnedStrnPoolBalances, earnedXiotPoolBalances][Number(poolId)] || new BigNumber(0)
  }

  const fetchEarnedBalance = useCallback(async (poolId) => {
    if (!account || !yam) return
    const balance = await getEarned(yam, getIncContract(poolId), account)
    getSetRewardsBalanceMethod(poolId)(balance)
  }, [
    account,
    setEarnedStrnPoolBalance,
    setEarnedXiotPoolBalance,
    yam
  ])

  const fetchBalances = useCallback(async (poolId) => {
    fetchEarnedBalance(poolId)
  }, [
    fetchEarnedBalance,
  ])

  const handleHarvest = useCallback(async (poolId) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsHarvesting(setItemValue(isHarvesting, poolId, true))
    await harvest(getIncContract(poolId), yam.web3.eth, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
    })
    setIsHarvesting(setItemValue(isHarvesting, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam
  ])

  const handleRedeem = useCallback(async (poolId) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsRedeeming(setItemValue(isRedeeming, poolId, true))
    await redeem(getIncContract(poolId), yam.web3.eth, "0", account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsRedeeming(setItemValue(isRedeeming, poolId, false))
    })
    setIsRedeeming(setItemValue(isRedeeming, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    yam
  ])

  const handleStake = useCallback(async (poolId: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsStaking(setItemValue(isStaking, poolId, true))
    await stake(getIncContract(poolId), yam.web3.eth, "0", amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsStaking(setItemValue(isStaking, poolId, false))
    })
    setIsStaking(setItemValue(isStaking, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    yam
  ])

  const handleUnstake = useCallback(async (poolId: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsUnstaking(setItemValue(isUnstaking, poolId, true))
    await unstake(getIncContract(poolId), yam.web3.eth, "0", amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsUnstaking(setItemValue(isUnstaking, poolId, false))  
    })
    setIsUnstaking(setItemValue(isUnstaking, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsUnstaking,
    yam
  ])

  useEffect(() => {
    fetchBalances("0")
    fetchBalances("1")
    let refreshInterval = setInterval(() => {
      fetchBalances("0")
      fetchBalances("1")
    }, 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchBalances])

  return (
    <Context.Provider value={{
      getPoolLPAddress,
      setConfirmTxModalIsOpen,
      getEarnedBalances,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
      getIncentivizerAddress,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider