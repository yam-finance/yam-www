import { BigNumber } from "bignumber.js";

export enum PoolIds {
    STRN_ETH = "0",
    STRN_XIOT = "1",
    STRN_SINGLE = "2"
}

export const MIN_STRN_ETH_LP_VALUE = 4.20;
export const MIN_STRN_XIOT_LP_VALUE = 0.000000542;


export const MIN_LP_AMOUNTS = {
    [PoolIds.STRN_ETH]: MIN_STRN_ETH_LP_VALUE,
    [PoolIds.STRN_XIOT]: MIN_STRN_XIOT_LP_VALUE
}

export const RNG_ETH_FEE = "0.032";

export interface SingleStake {
    amount: BigNumber;
    lockDate: number;
    shares: BigNumber;
  }

  export interface NftInstance {
      nftId: string;
      dataUrl?: string;
      lpBalance?: BigNumber,
      attribs?: AttribCollection
  }

  export interface AttribCollection {
    name?: string;
    image?: string;
    description?: string;
    external_url?: string;
    background_color?: string;
    attributes?: { trait_type: string; value: number}
  }

  export enum attributeNames {
    VIBES = "Vibes",
    TERPZ = "Terps",
    RARITY = "Rarity",
    BODY = "Body",
    LEFT_ARM = "Left arm",
    LEFT_EYE = "Left eye",
    MOUTH = "mouth",
    RIGHT_ARM = "Right arm",
    RIGHT_EYE = "Right eye",    
  }
  