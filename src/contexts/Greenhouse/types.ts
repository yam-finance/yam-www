export interface ContextValues {
  parentOneNftId: string,
  parentTwoNftId: string,
  isBreeding: boolean,
  onBreeding: () => void,
  setBurnAmount: (amount: string) => void,
  setParentOneNftId: (nftId: string) => void,
  setParentTwoNftId: (nftId: string) => void,
  burnAmount: string,
  childName: string,
  setChildName: (name: string) => void;
}