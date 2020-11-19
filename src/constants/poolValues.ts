import { BigNumber } from "bignumber.js";

export enum PoolIds {
    STRN_ETH = "0",
    STRN_XIOT = "1",
    STRN_SINGLE = "2"
}


export interface SingleStake {
    amount: BigNumber;
    lockDate: number;
    shares: BigNumber;
  }