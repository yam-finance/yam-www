import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  getAddresses,
} from 'constants/tokenAddresses'

import Context from './Context'
import { NftInstance } from 'constants/poolValues'
import useYam from 'hooks/useYam'
import { burnNft, generateNft, getEarned, harvest } from 'yam-sdk/utils'
import { getUserNfts } from 'utils'
import Axios from 'axios'

// StrainNFT.uri(_nftid) returns the nft uri address
// StrainNFTCrafter.craftStrainNFT sending it 0.03 ether (for rng)
// StrainNFT.setApprovalForAll(address _operator, bool _approved)

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [nftcollection, setNftCollection] = useState<NftInstance[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [earnedStrnBalance, setEarnedStrnBalance] = useState<BigNumber>()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const yam = useYam()

  const fetchUsersNfts = useCallback(async (yam: any, userAddress: string, provider: provider) => {
    if (account === undefined || yam === undefined) {
      console.log('account, yam', account !== undefined, yam !== undefined)
      return
    }
    setIsLoading(true)

    getUserNfts(provider, getAddresses().strainNFTAddress, userAddress, yam.contracts.strain_nft_crafter)
      .then(nftinstances => {
        nftinstances.map(n => console.log('Nfts in provider', n))
        setNftCollection(nftinstances)
      })
      .catch(e => {
        setIsLoading(false);
      })

  }, [yam])

  const fetchEarnedBalance = useCallback(async (yam, account) => {
    if (!account || !yam) return
    // todo: get new pool incentivizer
    const balance = await getEarned(yam, yam.contracts.strain_nft_crafter, account)
    setEarnedStrnBalance(balance)
  }, [
    account,
    setEarnedStrnBalance,
    yam
  ])

  useEffect(() => {
    if (account && ethereum && yam) {
      fetchUsersNfts(yam, account, ethereum)
      let refreshInterval = setInterval(() => {
        fetchUsersNfts(yam, account, ethereum);
        fetchEarnedBalance(yam, account);
      }, 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchUsersNfts,
    yam,
  ])

  const handleCreateNft = useCallback(async (poolId: string, amount: string, name: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsCreating(true)
    await generateNft(yam.contracts.strain_nft_crafter, yam.web3.eth, poolId, amount, name, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsCreating(false)
    })
    setIsCreating(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsCreating,
    yam
  ])

  const handleDestroyNft = useCallback(async (poolId: string, nft: NftInstance) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    nft.isDestroying = true;
    await burnNft(yam.contracts.strain_nft_crafter, yam.web3.eth, nft.nftId, poolId, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      nft.isDestroying = false;
    })
    nft.isDestroying = false;
  }, [
    account,
    setConfirmTxModalIsOpen,
    yam
  ])

  const handleNftRetrive = useCallback(async (nft: NftInstance): Promise<NftInstance> => {
    if (!nft?.dataUrl) return nft;
    Axios.get(nft.dataUrl)
    const promise = Axios.get(nft.dataUrl)
    return promise.then(response => ({ ...nft, attribs: response.data }));
  }, [])

  const handleHarvest = useCallback(async () => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsHarvesting(true)
    await harvest(yam.contracts.strain_nft_crafter, yam.web3.eth, account, () => {
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

  return (
    <Context.Provider value={{
      setConfirmTxModalIsOpen,
      strainNftCollection: nftcollection,
      onDestroyNft: handleDestroyNft,
      onRetrieve: handleNftRetrive,
      onCreateNft: handleCreateNft,
      onHarvest: handleHarvest,
      earnedStrnBalance,
      isCreating,
      isLoading,
      isHarvesting
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider