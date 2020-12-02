import BigNumber from 'bignumber.js';
import { NftInstance } from 'constants/poolValues';

export interface ContextValues {
  setConfirmTxModalIsOpen: (isOpen: boolean) => void,
  strainNftCollection: NftInstance[],
  isCreating: boolean,
  isLoading: boolean,
  isHarvesting: boolean,
  onCreateNft: (poolId: string, amount: string, name: string) => void,
  onDestroyNft: (poolId: string, nftId: NftInstance) => void,  
  onRetrieve: (nft: NftInstance) => Promise<NftInstance>,
  onHarvest: () => void,
  earnedStrnBalance?: BigNumber,
  strnEthLpPoolBalance?: BigNumber,
  strnXiotLpPoolBalance?: BigNumber,
}