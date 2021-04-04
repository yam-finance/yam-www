import React, { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import Context from './Context'

import useYam from 'hooks/useYam'
import { breedNfts, getCanBreed } from 'yam-sdk/utils'
import useStrainNfts from 'hooks/useStrainNfts'
import {
  getAddresses
} from 'constants/tokenAddresses'
import { MIN_LP_AMOUNTS_DISPLAY, PoolIds } from 'constants/poolValues'

const addresses = getAddresses()

const Provider: React.FC = ({ children }) => {
  const [isBreeding, setIsBreeding] = useState<boolean>(false)
  const [parentOneNftId, setParentOneNftId] = useState('')
  const [parentTwoNftId, setParentTwoNftId] = useState('')
  const [burnAmount, setBurnAmount] = useState('0')
  const [stxpAmount, setStxpAmount] = useState('0')
  const [childName, setChildName] = useState('')
  const [lpTokenAmount, setLpTokenAmount] = useState(MIN_LP_AMOUNTS_DISPLAY[Number(PoolIds.STRN_ETH)]);
  const { strainNftCollection } = useStrainNfts();
  const [canBreed, setCanBreed] = useState(false); 

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const yam = useYam()

  const handleBreeding = useCallback(async () => {
    if (!yam) return
    setIsBreeding(true)
    console.log('parentOneNftId', parentOneNftId, 'parentTwoNftId', parentTwoNftId)
    if (parentOneNftId === '' || parentTwoNftId === '') return setIsBreeding(false);

    await breedNfts(yam.contracts.strain_nft_crafter,
      yam.web3.eth,
      "0", // only one pool
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
    parentOneNftId,
    parentTwoNftId,
    childName,
    lpTokenAmount
  ])

  const handleCalculateBreedFee = () => {
    if (parentOneNftId === '' || parentTwoNftId === '') return "0";
    if (!strainNftCollection || strainNftCollection.length === 0) return "0";
    const parentOne = strainNftCollection.find(s => s.nftId === parentOneNftId);
    const parentTwo = strainNftCollection.find(s => s.nftId === parentTwoNftId);
    if (!parentOne?.breedFee || !parentTwo?.breedFee) return "0";
    const feeOne = parentOne.breedFee;
    const feeTwo = parentTwo.breedFee;
    const totalFeeBN = new BigNumber(feeOne).plus(feeTwo);
    return String(totalFeeBN.div(new BigNumber(10).pow(18)))
  };

  useEffect(() => handleCanBreed(parentOneNftId, parentTwoNftId), [parentOneNftId, parentTwoNftId])

  const handleCanBreed = (parentOneNftId: string, parentTwoNftId: string) => {
    if (parentOneNftId === '' || parentTwoNftId === '') return setCanBreed(false);
    // need to get contract call worked out
    setCanBreed(true);
    //getCanBreed(yam.contracts.strain_nft_crafter, parentOneNftId, parentTwoNftId).then(result => setCanBreed(result));
  };

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
      getBreedingFee: handleCalculateBreedFee,
      parentsCanBreed: canBreed,
      strainCrafterAddress: addresses.strainNFTCrafterAddress
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider