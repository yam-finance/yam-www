import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import Web3 from 'web3'
import { provider, TransactionReceipt } from 'web3-core'
import { AbiItem } from 'web3-utils'

import ERC20ABI from 'constants/abi/ERC20.json'
import ERC1155 from 'constants/abi/ERC1155.json'
import { COOLING_OFF_IN_SECONDS, NftInfo, NftInstance } from 'constants/poolValues'
import StrainNFTLPTokenWrapper from '../yam-sdk/lib/clean_build/contracts/StrainNFTLPTokenWrapper.json'
import StrainNft from '../yam-sdk/lib/clean_build/contracts/StrainNFT.json'
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'

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
      .approve(spenderAddress, String(ethers.constants.MaxUint256))
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
    console.error('approve', e)
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

const getUsersNftsMulticalResults = async (provider: Web3Provider, nftAddress: string, nftCount: number, userAddress: string): Promise<string[]> => {
  //let provider = new ethers.providers.StaticJsonRpcProvider(infura_key);
  const multicall = new Multicall({ ethersProvider: provider });
  console.log('nft count:', nftCount)
  let items: number[] = [];
  for (let i = 0; i < nftCount; i++) { items.push(i) }

  const contractGetNftIdsCall: ContractCallContext[] = items.map(i =>
    ({
      reference: `nftContract${i}`,
      contractAddress: nftAddress,
      abi: ERC1155.abi,
      calls: [{ reference: `nftContract${i}`, methodName: 'itemIDs', methodParameters: [i] }]
    })
  );
  let nftIds: string[] = []
  const nftResults: ContractCallResults = await multicall.call(contractGetNftIdsCall);
  Object.keys(nftResults.results).map(key => {
    // lame issue with typing and this array of calls
    const nftId = String(new BigNumber(JSON.parse(JSON.stringify(nftResults.results[key].callsReturnContext[0].returnValues)).hex))
    nftIds.push(nftId);
  })

  const contractGetNftOwnerCall: ContractCallContext[] = nftIds.map(i =>
    ({
      reference: `nftContract${i}`,
      contractAddress: nftAddress,
      abi: ERC1155.abi,
      calls: [{ reference: `nftContract${i}`, methodName: 'nfOwners', methodParameters: [i] }]
    })
  );

  // ----- get NFT owner ----- //
  let usersNfts: string[] = []
  const ownerResults: ContractCallResults = await multicall.call(contractGetNftOwnerCall);
  Object.keys(ownerResults.results).map(key => {
    // lame issue with typing and this array of calls
    const owner = String(ownerResults.results[key].callsReturnContext[0].returnValues)
    if (owner.toLowerCase() === userAddress.toLowerCase()) {
      const nftId = String(ownerResults.results[key].originalContractCallContext.calls[0].methodParameters[0])
      usersNfts.push(nftId);
    }
  })

  return usersNfts
}


const getNftDetailsMulticalResults = async (provider: Web3Provider, nftAddress: string, nftIds: string[]): Promise<NftInstance[]> => {
  //let provider = new ethers.providers.StaticJsonRpcProvider(infura_key);
  const multicall = new Multicall({ ethersProvider: provider });
  const nftDetails: { [key: string]: NftInstance } = nftIds.reduce((p, n) => ({ ...p, [n]: { nftId: n, dataUrl: '', nftName: '' } }), {});

  const contractGetNftDetailCalls: ContractCallContext[] = []
  for (let i = 0; i < nftIds.length; i++) {
    const nftId = nftIds[i];
    contractGetNftDetailCalls.push({
      reference: `nftContract${nftId}Uri`,
      contractAddress: nftAddress,
      abi: ERC1155.abi,
      calls: [{ reference: `nftContract${nftId}Uri`, methodName: 'uri', methodParameters: [nftId] }]
    });

    contractGetNftDetailCalls.push({
      reference: `nftContract${nftId}Name`,
      contractAddress: nftAddress,
      abi: StrainNft.abi,
      calls: [{ reference: `nftContract${nftId}Name`, methodName: 'nftInfo', methodParameters: [nftId] }]
    });

    contractGetNftDetailCalls.push({
      reference: `nftContract${nftId}Name`,
      contractAddress: nftAddress,
      abi: StrainNft.abi,
      calls: [{ reference: `nftContract${nftId}Name`, methodName: 'getName', methodParameters: [nftId] }]
    });

  }

  // ----- get NFT details ----- //
  const ownerResults: ContractCallResults = await multicall.call(contractGetNftDetailCalls);
  Object.keys(ownerResults.results).map(key => {
    const method = String(ownerResults.results[key].originalContractCallContext.calls[0].methodName)
    const nftId = String(ownerResults.results[key].originalContractCallContext.calls[0].methodParameters[0])
    const value = ownerResults.results[key].callsReturnContext[0].returnValues as any;

    if (method === 'uri') {
      nftDetails[nftId].dataUrl = String(value);
    } else if (method === 'nftInfo') {
      nftDetails[nftId].nftInfo = value as NftInfo;
    } else if (method === 'getName') {
      nftDetails[nftId].nftName = String(value);
    }
  })

  return Object.values(nftDetails)
}

export const getUserNfts = async (provider: provider, nftAddress: string, userAddress: string, crafterContract: any, geneticsContract: any): Promise<NftInstance[]> => {
  const nftContract = getERC1155Contract(provider, nftAddress)
  try {
    const length = await nftContract.methods.getItemIDsLength().call();
    // @ts-ignore
    const p = new Web3Provider(window?.ethereum);
    const usersNfts = await getUsersNftsMulticalResults(p, nftAddress, length, userAddress);
    const nfts = await getNftDetailsMulticalResults(p, nftAddress, usersNfts)

    const userItems: NftInstance[] = []

    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i]
      const { poolId, lpBalance } = await getNftPoolIdBalance(provider, crafterContract, nft.nftId, userAddress);
      nft.lpBalance = lpBalance;
      nft.poolId = poolId

      // add convenience property
      const now = new Date().getTime() / 1000;
      const timePassed = now - Number(nft.nftInfo ? nft.nftInfo.lastBreedTime : 0);
      nft.canBreed = timePassed > COOLING_OFF_IN_SECONDS;

      // TODO: verify genetics contract address then turn this on
      //nft.breedFee = await getNftBreedingBurnFee(provider, geneticsContract, nft, userAddress);
      nft.breedFee = "10000000000000000000";

      userItems.push(nft)
    }
    // for debugging
    console.log('users NFTs', userItems)
    return userItems
  } catch (e) {
    return []
  }
}

export const getNftBreedingBurnFee = async (provider: provider, contract: any, nft: NftInstance, userAddress: string) => {
  let fee = "0"; // set default
  fee = await contract.methods.getBurnerFee(nft.nftInfo?.gnome, nft.nftInfo?.breedCount, nft.nftInfo?.lastBreedTime).call().catch((e: Error) => {
    console.error("Could not get NFT's pool Id, defaulting to `0`", e);
  })

  return fee;
}

export const getNftPoolIdBalance = async (provider: provider, contract: any, nftId: string, userAddress: string) => {
  let poolId = "0"; // set default
  poolId = await contract.methods.nftPool(nftId).call().catch((e: Error) => {
    console.error("Could not get NFT's pool Id, defaulting to `0`", e);
  })

  const poolContactAddress = await contract.methods.pools(poolId).call().catch((e: Error) => {
    console.error("Could not get NFT's balance", e);
  })
  const lpWrapperContract = getLPTokenWrapperContract(provider, poolContactAddress)
  const lpBalance = await lpWrapperContract.methods.originalBalanceOf(nftId).call().catch((e: Error) => {
    console.error("Could not get NFT's balance", e);
  })
  /*
    lpBalance = await contract.methods.balanceOf(nftId).call().catch((e: Error) => {
      console.error("Could not get NFT's balance", e);
    })
  */

  return { poolId, lpBalance: new BigNumber(lpBalance).dividedBy(new BigNumber(10).pow(18)) };
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

export const getLPTokenWrapperContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(StrainNFTLPTokenWrapper.abi as unknown as AbiItem, address)
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
