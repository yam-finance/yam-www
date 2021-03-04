import BigNumber from "bignumber.js";

export interface Proposal {
  gov?: string;
  description?: string;
  state?: string;
  id: number;
  targets: string[];
  signatures: string[];
  inputs: string[][];
  forVotes: number;
  againstVotes: number;
  start?: number;
  end?: number;
  hash: string;
  more?: string;
}

export interface ProposalVotingPower {
  hash: string;
  power: number;
  voted: boolean;
  side: boolean;
}

export interface ContextValues {
  proposals?: Proposal[];
  votingPowers?: ProposalVotingPower[];
  currentPower?: number;
  isRegistered?: boolean;
  isRegistering?: boolean;
  isVoting?: boolean;
  isDelegated: boolean;
  onVote: (proposal: number, side: boolean) => void;
  onRegister: () => void;
  onUnregister: () => void;
  onDelegateStaked: (delegatee: string) => void;
  onDelegateUnstaked: (delegatee: string) => void;
  onRemoveDelegation: () => void;
}
