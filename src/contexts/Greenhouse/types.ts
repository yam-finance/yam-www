export interface ContextValues {
  parentOneNftId: string,
  parentTwoNftId: string,
  isBreeding: boolean,
  onBreeding: () => void,
  setBurnAmount: (amount: string) => void,
  setStxpAmount: (amount: string) => void,
  setParentOneNftId: (nftId: string) => void,
  setParentTwoNftId: (nftId: string) => void,
  burnAmount: string,
  stxpAmount: string,
  childName: string,
  setChildName: (name: string) => void;
  lpTokenAmount: string,
  setLpTokenAmount: (amount: string) => void,
}