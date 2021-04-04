export interface ContextValues {
  onBreeding: () => void,           // method to call to breed the parents selected
  isBreeding: boolean,              // indication that breading tx has been sent
  setParentOneNftId: (nftId: string) => void,  // set first parent
  parentOneNftId: string,           // set first parent's nft id
  setParentTwoNftId: (nftId: string) => void,  // set second parent
  parentTwoNftId: string,           // set second parent's nft id
  setBurnAmount: (amount: string) => void,  // set the stxp amount to be burnt for breeding
  burnAmount: string,               // stxp amount set
  setStxpAmount: (amount: string) => void,  // set the stxp to give to child
  stxpAmount: string,               // stxp amount to give child
  setChildName: (name: string) => void;       // set the child name
  childName: string,                // name of child nft
  setLpTokenAmount: (amount: string) => void, // set the LP token amount
  lpTokenAmount: string,            // amount of LP tokens to give child nft
  getBreedingFee: () => string,     // get STRN fee after parents have been selected
  strainCrafterAddress: string,     // crafter contract address used for approvals
  parentsCanBreed: boolean,         // indicates the chosen parents can breed
}