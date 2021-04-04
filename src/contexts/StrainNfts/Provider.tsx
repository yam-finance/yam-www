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
import Axios from 'axios'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [nftcollection, setNftCollection] = useState<NftInstance[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [earnedStrnBalance, setEarnedStrnBalance] = useState<BigNumber>()
  const [strnEthLpPoolBalance, setStrnEthLpPoolBalance] = useState<BigNumber>()
  const [strnXiotLpPoolBalance, setStrnXiotLpPoolBalance] = useState<BigNumber>()
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [fetchNfts, setFetchNfts] = useState(true);
  const [txHash, setTxHash] = useState<string>()

  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const yam = useYam()

  const fetchUsersNfts = useCallback(async (yam: any, userAddress: string, provider: provider) => {
    if (account === undefined || yam === undefined) {
      console.log('account, yam', account !== undefined, yam !== undefined)
      return
    }
    setIsLoading(true)

    if (txHash) checkTxHashRefreshUserNfts(yam.web3.eth, txHash, setTxHash);
    if (fetchNfts) {
      const startTime = new Date().getTime();
      setFetchNfts(false)
      getUserNfts(provider, getAddresses().strainNFTAddress, userAddress, yam.contracts.strain_nft_crafter, yam.contracts.strain_nft_genetics)
        .then(nftinstances => {
          const fetchTime = new Date().getTime();
          console.log(`NFT fetching took ${(fetchTime - startTime) / 1000} seconds`)
          console.log('nftinstances', nftinstances)
          setNftCollection(nftinstances)

          // sum up LPs in each pool
          const strnEthNfts = nftinstances.filter(n => n.poolId === PoolIds.STRN_ETH).reduce((p, n) => p.plus(n.lpBalance || 0), new BigNumber(0));
          const strnXiotNfts = nftinstances.filter(n => n.poolId === PoolIds.STRN_XIOT).reduce((p, n) => p.plus(n.lpBalance || 0), new BigNumber(0));
          setStrnEthLpPoolBalance(strnEthNfts);
          setStrnXiotLpPoolBalance(strnXiotNfts);
        })
        .catch(e => {
          setIsLoading(false);
          setFetchNfts(true)
        })
    }
    setIsLoading(false);
  }, [yam, fetchNfts, txHash])

  const fetchEarnedBalance = useCallback(async (yam, account, nftcollection: NftInstance[]) => {
    if (!account || !yam) return
    if (!nftcollection || nftcollection.length === 0) return setEarnedStrnBalance(new BigNumber(0));
    const nftIds = nftcollection.map(n => n.nftId);
    const balance = await getNftEarned(yam, yam.contracts.strain_nft_crafter, account, nftIds);
    console.log('nft earned balance', String(balance));
    setEarnedStrnBalance(balance)
  }, [
    account,
    setEarnedStrnBalance,
    yam,
    nftcollection
  ])

  useEffect(() => {
    if (account && ethereum && yam) {
      fetchUsersNfts(yam, account, ethereum)
      let refreshInterval = setInterval(() => {
        fetchUsersNfts(yam, account, ethereum);
        fetchEarnedBalance(yam, account, nftcollection);
      }, 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchUsersNfts,
    yam,
    nftcollection,
  ])

  const handleCreateNft = useCallback(async (poolId: string, amount: string, name: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsCreating(true)
    await generateNft(yam.contracts.strain_nft_crafter, yam.web3.eth, poolId, amount, name, account, (txHash: string) => {
      setConfirmTxModalIsOpen(false)
      setTxHash(txHash)
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

  const handleAddNftStake = useCallback(async (poolId: string, nftId: string, amount: string, stxpAmount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsAdding(true)
    await addNftStake(yam.contracts.strain_nft_crafter, yam.web3.eth, poolId, nftId, amount, stxpAmount, account, async (txHash: string) => {
      setConfirmTxModalIsOpen(false)
      setTxHash(txHash)
    }).catch(e => {
      console.error(e)
      setIsAdding(false)
    })
    setIsAdding(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsAdding,
    yam
  ])

  const handleDestroyNft = useCallback(async (poolId: string, nft: NftInstance) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    nft.isDestroying = true;
    await burnNft(yam.contracts.strain_nft_crafter, yam.web3.eth, nft.nftId, poolId, account, (txHash: string) => {
      setConfirmTxModalIsOpen(false)
      setTxHash(txHash)
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
    const nftids = nftcollection.map(nft => nft.nftId);
    if (nftids.length === 0) return;
    await harvestNfts(yam.contracts.strain_nft_crafter, yam.web3.eth, account, nftids, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
    })
    setIsHarvesting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam,
    nftcollection
  ])

  const checkTxHashRefreshUserNfts = async (provider: any, txHash: string, setTxHash: Function) => {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (receipt !== null) {
      setTimeout(setFetchNfts(true), 5000)
      setTxHash('')
    }
  }

  const findNftById = (nftId: string): NftInstance | undefined => {
    return nftcollection.find(n => n.nftId === nftId);
  }

  return (
    <Context.Provider value={{
      setConfirmTxModalIsOpen,
      strainNftCollection: nftcollection,
      onDestroyNft: handleDestroyNft,
      onRetrieve: handleNftRetrive,
      onCreateNft: handleCreateNft,
      onHarvest: handleHarvest,
      onAddNftStake: handleAddNftStake,
      earnedStrnBalance,
      isCreating,
      isAdding,
      isLoading,
      isHarvesting,
      strnEthLpPoolBalance,
      strnXiotLpPoolBalance,
      findNftById,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider