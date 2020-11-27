import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import Web3 from 'web3'
import { provider, TransactionReceipt } from 'web3-core'
import { AbiItem } from 'web3-utils'

import ERC20ABI from 'constants/abi/ERC20.json'
import ERC1155 from 'constants/abi/ERC1155.json'
import { NftInstance } from 'constants/poolValues'

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const waitTransaction = async (provider: provider, txHash: string) => {
  const web3 = new Web3(provider)
  let txReceipt: TransactionReceipt | null = null
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash)
    txReceipt = r
    await sleep(2000)
  }
  return (txReceipt.status)
}

export const approve = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider,
  onTxHash?: (txHash: string) => void
): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress)
    return tokenContract.methods
      .approve(spenderAddress, ethers.constants.MaxUint256)
      .send({ from: userAddress, gas: 80000 }, async (error: any, txHash: string) => {
        if (error) {
          console.log("ERC20 could not be approved", error)
          onTxHash && onTxHash('')
          return false
        }
        if (onTxHash) {
          onTxHash(txHash)
        }
        const status = await waitTransaction(provider, txHash)
        if (!status) {
          console.log("Approval transaction failed.")
          return false
        }
        return true
      })
  } catch (e) {
    console.log('here')
    return false
  }
}

export const setApprovalForAll = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider,
  onTxHash?: (txHash: string) => void
): Promise<boolean> => {
  try {
    const tokenContract = getERC1155Contract(provider, tokenAddress)
    return tokenContract.methods
      .setApprovalForAll(spenderAddress, true)
      .send({ from: userAddress, gas: 80000 }, async (error: any, txHash: string) => {
        if (error) {
          console.log("ERC1155 could not be approved", error)
          onTxHash && onTxHash('')
          return false
        }
        if (onTxHash) {
          onTxHash(txHash)
        }
        const status = await waitTransaction(provider, txHash)
        if (!status) {
          console.log("Approval for all transaction failed.")
          return false
        }
        return true
      })
  } catch (e) {
    console.log('set approval for all ', e)
    return false
  }
}

export const isApprovalForAll = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider,
): Promise<boolean> => {
  try {
    const tokenContract = getERC1155Contract(provider, tokenAddress)
    return tokenContract.methods.isApprovedForAll(userAddress, spenderAddress)
  } catch (e) {
    console.log('set approval for all ', e)
    return false
  }
}

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress)
    const allowance: string = await tokenContract.methods.allowance(userAddress, spenderAddress).call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (provider: provider, tokenAddress: string, userAddress: string): Promise<string> => {
  const tokenContract = getERC20Contract(provider, tokenAddress)
  try {
    const balance: string = await tokenContract.methods.balanceOf(userAddress).call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const getUserNfts = async (provider: provider, nftAddress: string, crafterAddress: string, userAddress: string): Promise<NftInstance[]> => {
  const nftContract = getERC1155Contract(provider, nftAddress)
  try {
    const length = await nftContract.methods.getItemIDsLength().call();
    const userItems: NftInstance[] = []
    for (let i = 0; i < length; i++) {
      const nftId = await nftContract.methods.itemIDs(i).call();
      const owner = await nftContract.methods.nfOwners(nftId).call();
      if (owner == userAddress) {
        const dataUrla = await nftContract.methods.uri(nftId).call();
        // TODO: when json service is up remove this
        const dataUrl = "https://nft-image-service.herokuapp.com/tester";
        const nft = {
          nftId,
          dataUrl
        }
        userItems.push(nft)
      }
    }
    return userItems
  } catch (e) {
    return []
  }
}

export const getERC20Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(ERC20ABI.abi as unknown as AbiItem, address)
  return contract
}

export const getERC1155Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(ERC1155.abi as unknown as AbiItem, address)
  return contract
}

export const bnToDec = (bn: BigNumber, decimals = 18) => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const setItemValue = (items: boolean[], index: string, value: boolean) => {
  items[Number(index)] = value
  return items;
}

export const getItemValue = (items: boolean[] = [], index: string = "0"): boolean => {
  return items[Number(index)]
}
