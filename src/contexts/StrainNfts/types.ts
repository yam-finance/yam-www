import BigNumber from 'bignumber.js';
import { NftInstance } from 'constants/poolValues';

export interface ContextValues {
  setConfirmTxModalIsOpen: (isOpen: boolean) => void,
  strainNftCollection: NftInstance[],
  isCreating: boolean,
  isAdding: boolean,
  isLoading: boolean,
  isHarvesting: boolean,
  onCreateNft: (poolId: string, amount: string, name: string) => void,
  onDestroyNft: (poolId: string, nftId: NftInstance) => void,  
  onRetrieve: (nft: NftInstance) => Promise<NftInstance>,
  onAddNftStake: (poolId: string, nftId: string, amount: string, stxpAmount: string) => void,
  onHarvest: () => void,
  earnedStrnBalance?: BigNumber,
  strnEthLpPoolBalance?: BigNumber,
  strnXiotLpPoolBalance?: BigNumber,
  findNftById: (nftId: string) => NftInstance | undefined,
}