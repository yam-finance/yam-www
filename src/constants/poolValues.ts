import { BigNumber } from "bignumber.js";

export enum PoolIds {
  STRN_ETH = "0",
  STRN_XIOT = "1",
  STRN_SINGLE = "2"
}

export const MIN_STRN_GEN_VALUE = new BigNumber(420);
export const MIN_STRN_ETH_LP_VALUE = 4.20;
export const MIN_STRN_XIOT_LP_VALUE = 0.000000542;
export const DEFAULT_NFT_SIZE = 250;
export const ENABLE_BURN_REWARDS_AMOUNT = new BigNumber(10).pow(18);
export const COOLING_OFF_IN_SECONDS = 5400;
export const MAX_STXP_BREEDING_AMOUNT = 1000;

export const MIN_LP_AMOUNTS = [
  MIN_STRN_ETH_LP_VALUE,
  MIN_STRN_XIOT_LP_VALUE
]

export const MIN_LP_AMOUNTS_DISPLAY = [
  "4.20",
  "0.000000542"
]


export const POOL_NAMES = [
  "STRN/ETH",
  "STRN/XIOT"
]

export interface SingleStake {
  amount: BigNumber;
  lockDate: number;
  shares: BigNumber;
}

export interface NftInfo {
  gnome?: string;
  name?: string;
  breedCount?: string;
  lastBreedTime?: string;
  parent1ID?: string;
  parent2ID?: string;
}

export interface NftInstance {
  nftId: string;
  nftName?: string;
  dataUrl?: string;
  lpBalance?: BigNumber;
  attribs?: AttribCollection;
  poolId?: string;
  isDestroying?: boolean;
  nftInfo?: NftInfo;
  canBreed?: boolean;
  breedFee?: string;
}

export interface AttribCollection {
  name?: string;
  image?: string;
  description?: string;
  external_url?: string;
  background_color?: string;
  attributes?: { trait_type: string; value: string }[]
}

export enum attributeNames {
  VIBES = "Vibes",
  TERPZ = "Terps",
  RARITY = "Rarity",
  LEFT_ARM = "Left arm",
  LEFT_EYE = "Left eye",
  MOUTH = "mouth",
  RIGHT_ARM = "Right arm",
  RIGHT_EYE = "Right eye",
  MINTED = "Minted",
  LP_TYPE = "LP Type"
}

export const TerpsIndexValues = [
  "Myrcene",
  "Limonene",
  "Linalool",
  "Caryophyllene",
  "Pinene",
  "Humulene",
  "Terpinolene",
  "Ocimene",
]

export const VibeIndexValues = [
  "Ruderalis",
  "Indica",
  "Sativa",
  "Landrace",
]

export const RarityIndexValues = [
  "Earthy", "Starbright", "Moonpie", "Supernova"
]
