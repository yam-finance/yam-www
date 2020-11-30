import { NftInstance } from 'constants/poolValues';

export interface ContextValues {
  setConfirmTxModalIsOpen: (isOpen: boolean) => void,
  strainNftCollection: NftInstance[],
  isCreating: boolean,
  isDestroying: boolean,
  isLoading: boolean,
  onCreateNft: (poolId: string, amount: string, name: string) => void,
  onDestroyNft: (poolId: string, nftId: string) => void,  
  onRetrieve: (nft: NftInstance) => Promise<NftInstance>,
}