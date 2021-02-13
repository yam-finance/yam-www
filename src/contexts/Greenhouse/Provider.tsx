import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  getAddresses,
} from 'constants/tokenAddresses'

import Context from './Context'
import { NftInstance, PoolIds } from 'constants/poolValues'
import useYam from 'hooks/useYam'
import { addNftStake, burnNft, generateNft, getNftEarned, harvestNfts } from 'yam-sdk/utils'
import { getUserNfts } from 'utils'

const Provider: React.FC = ({ children }) => {
  const [isBreeding, setIsBreeding] = useState<boolean>(false)
  const [parentOneNftId, setParentOneNftId] = useState('')
  const [parentTwoNftId, setParentTwoNftId] = useState('')
  const [burnAmount, setBurnAmount] = useState('0')
  
  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const yam = useYam()

  const handleBreeding = useCallback(async () => {
    if (!yam) return
    setIsBreeding(true)
    if (parentOneNftId === '' || parentTwoNftId === '') return;
    const nftids = [parentOneNftId, parentTwoNftId];
    /*
    await breedNfts(yam.contracts.strain_nft_crafter, yam.web3.eth, account, nftids, () => {
      setIsBredingting(false)
    }).catch(e => {
      console.error(e)
    })
    */
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
      setParentOneNftId,
      setParentTwoNftId,
      burnAmount,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider