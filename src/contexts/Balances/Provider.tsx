import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  strn as strnTokenAddress,
  strnEthLP as strnLPTokenAddress,
  strnIncentivizer as strnEthIncAddress
} from 'constants/tokenAddresses'
import { getBalance } from 'utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [strnEthLpBalance, setStrnEthLpBalance] = useState<BigNumber>()
  const [strnTokenBalance, setStrnTokenBalance] = useState<BigNumber>()
  const [strnIncBalance, setStrnIncBalance] = useState<BigNumber>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const fetchBalances = useCallback(async (userAddress: string, provider: provider) => {
    const balances = await Promise.all([
      await getBalance(provider, strnLPTokenAddress, userAddress),
      await getBalance(provider, strnTokenAddress, userAddress),
      await getBalance(provider, strnEthIncAddress, userAddress)
    ])
    setStrnEthLpBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18)))
    setStrnTokenBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setStrnIncBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
  }, [
    setStrnEthLpBalance,
    setStrnTokenBalance,
    setStrnIncBalance
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  return (
    <Context.Provider value={{
      strnEthLpBalance,
      strnTokenBalance,
      strnIncBalance
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider