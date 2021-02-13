import React, { useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Context from './Context'

import useYam from 'hooks/useYam'
import { breedNfts } from 'yam-sdk/utils'


const Provider: React.FC = ({ children }) => {
  const [isBreeding, setIsBreeding] = useState<boolean>(false)
  const [parentOneNftId, setParentOneNftId] = useState('')
  const [parentTwoNftId, setParentTwoNftId] = useState('')
  const [burnAmount, setBurnAmount] = useState('0')
  const [stxpAmount, setStxpAmount] = useState('0')
  const [childName, setChildName] = useState('')
  const [lpTokenAmount, setLpTokenAmount] = useState('0');

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const yam = useYam()

  const handleBreeding = useCallback(async () => {
    if (!yam) return
    setIsBreeding(true)
    if (parentOneNftId === '' || parentTwoNftId === '') return;
    // TODO not sure if we are going to use multiple pools
    await breedNfts(yam.contracts.strain_nft_crafter,
      yam.web3.eth,
      "0",
      lpTokenAmount,
      stxpAmount,
      burnAmount,
      childName,
      parentOneNftId,
      parentTwoNftId,
      account, (txHash: string) => {
        setIsBreeding(false)
      }).catch(e => {
        console.error(e)
        setIsBreeding(false)
      })
    setIsBreeding(false)
  }, [
    account,
    setIsBreeding,
    yam,
  ])

  return (
    <Context.Provider value={{
      parentOneNftId,
      parentTwoNftId,
      isBreeding,
      onBreeding: handleBreeding,
      setBurnAmount,
      setStxpAmount: setStxpAmount,
      setParentOneNftId,
      setParentTwoNftId,
      burnAmount,
      stxpAmount,
      setChildName,
      childName,
      lpTokenAmount,
      setLpTokenAmount,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider