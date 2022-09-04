import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import Web3 from "web3";
import { provider, TransactionReceipt } from "web3-core";
import { AbiItem, isAddress, toChecksumAddress } from "web3-utils";

import ERC20ABI from "constants/abi/ERC20.json";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const shorten = (str: string) => {
  if (str.length < 10) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
};

export const waitTransaction = async (provider: provider, txHash: string) => {
  const web3 = new Web3(provider);
  let txReceipt: TransactionReceipt | null = null;
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash);
    txReceipt = r;
    await sleep(2000);
  }
  return txReceipt.status;
};

export const approve = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider,
  onTxHash?: (txHash: string) => void
): Promise<boolean> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    return tokenContract.methods
      .approve(spenderAddress, ethers.constants.MaxUint256)
      .send(
        { from: userAddress, gas: 80000 },
        async (error: any, txHash: string) => {
          if (error) {
            console.log("ERC20 could not be approved", error);
            onTxHash && onTxHash("");
            return false;
          }
          if (onTxHash) {
            onTxHash(txHash);
          }
          const status = await waitTransaction(provider, txHash);
          if (!status) {
            console.log("Approval transaction failed.");
            return false;
          }
          return true;
        }
      );
  } catch (e) {
    console.log("error", e);
    return false;
  }
};

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider
): Promise<string> => {
  try {
    const tokenContract = getERC20Contract(provider, tokenAddress);
    const allowance: string = await tokenContract.methods
      .allowance(userAddress, spenderAddress)
      .call();
    return allowance;
  } catch (e) {
    return "0";
  }
};

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  const tokenContract = getERC20Contract(provider, tokenAddress);
  try {
    const balance: string = await tokenContract.methods
      .balanceOf(userAddress)
      .call();
    return balance;
  } catch (e) {
    return "0";
  }
};

export const getERC20Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (ERC20ABI.abi as unknown) as AbiItem,
    address
  );
  return contract;
};

export const bnToDec = (bn: BigNumber, decimals = 18) => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};

export const decToBn = (dec: number, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals));
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

export const getNearestBlock = (from: Array<any>, target: number) => {
  return from.reduce(function (prev: any, curr: any) {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
};

export const getAMPM = (date: any) => {
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  return ampm;
};

export const getTimestampDate = (obj: { ts: number; ap?: boolean }) => {
  const d = new Date(obj.ts * 1000);
  const s = ".";
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year =
    d.getFullYear().toString().substring(0, 2) +
    (obj.ap ? " " + getAMPM(d) : "");
  return (
    (day < 9 ? "0" + day : day) +
    s +
    (month <= 9 ? "0" + month : month) +
    s +
    year
  );
};

export const validateAddress = (address: string) => {
  if (address == "") return;
  const checksumAddress = toChecksumAddress(address);
  return isAddress(checksumAddress);
};

export const checksumAddress = (address: string) => toChecksumAddress(address);
