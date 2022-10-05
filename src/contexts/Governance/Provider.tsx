import React, { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { Proposal, ProposalVotingPower } from "./types";
import Context from "./Context";
import useYam from "hooks/useYam";
import {
  getProposals,
  vote,
  getVotingPowers,
  getCurrentVotingPower,
  delegate,
  delegateStaked,
  delegatedTo,
} from "yam-sdk/utils";

const emptyDelegation = '0x0000000000000000000000000000000000000000';

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet();
  const yam = useYam();
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [delegatedAddressToken, setDelegatedAddressToken] = useState('');
  const [delegatedAddressLP, setDelegatedAddressLP] = useState('');
  const [isDelegatedToken, setIsDelegatedToken] = useState(false);
  const [isDelegatedLP, setIsDelegatedLP] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>();
  const [votingPowers, setVotingPowers] = useState<ProposalVotingPower[]>();
  const [currentPower, setCurrentPower] = useState<number>();
  const [isRegistered, setIsRegistered] = useState<boolean>();
  const [isRegistering, setIsRegistering] = useState<boolean>();

  const fetchProposals = useCallback(async () => {
    if (!yam) return;
    let props: Proposal[] = await getProposals(yam);
    props = props.sort((a, b) => {
      if (a && b && a.end && b.end) {
        if (a.end === b.end) {
          return 0;
        }
        if (a.end < b.end) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return 0;
      }
    });
    setProposals(props);
  }, [setProposals, yam]);

  const fetchVotingPowers = useCallback(async () => {
    if(proposals){
      let votingPowers: ProposalVotingPower[] = await getVotingPowers(yam, proposals, account);
      setVotingPowers(votingPowers);
    }
  }, [setVotingPowers, yam]);

  const fetchCurrentPower = useCallback(async () => {
    if (!yam) return;
    let votingPower: number = await getCurrentVotingPower(yam, account);
    setCurrentPower(votingPower);
  }, [setCurrentPower, yam]);

  const handleVote = useCallback(
    async (proposal: number, side: boolean) => {
      if (!yam) return;
      setConfirmTxModalIsOpen(true);
      await vote(yam, proposal, side, account, () => {
        setConfirmTxModalIsOpen(false);
        setIsVoting(true);
      });
      setIsVoting(false);
    },
    [account, setConfirmTxModalIsOpen, setIsVoting, yam]
  );

  const delegateToken = useCallback(
    async (delegatee: string | null, callback?: (txHash?: string) => any) => {
      if (!account || !yam) return;
      try {
        await delegate(yam, account, delegatee, callback)
        verifyDelegation();
      }
      catch (err) {
        console.error(err.message);
      }
    },
    [account, yam]
  );

  const delegateLP = useCallback(
    async (delegatee: string | null, callback?: (txHash?: string) => any) => {
      if (!account || !yam) return;
      try {
        await delegateStaked(yam, account, delegatee, callback)
        verifyDelegation();
      }
      catch (err) {
        console.error(err.message);
      }
    },
    [account, yam]
  );

  const verifyDelegation = async () => {
    if (!account || !yam) return;
    const delegatedAccounts = await delegatedTo(yam, account);
    const delegatedAccountToken = delegatedAccounts.token;
    const delegatedAccountLP = delegatedAccounts.lp;
    setDelegatedAddressToken(delegatedAccountToken);
    setDelegatedAddressLP(delegatedAccountLP);
    setIsDelegatedToken(delegatedAccountToken !== emptyDelegation);
    setIsDelegatedLP(delegatedAccountLP !== emptyDelegation);
  };

  const fetchIsRegistered = useCallback(async () => {
    if (!account || !yam) return;
    setIsRegistered(((await delegatedTo(yam, account)).token.toString()) === account);
  }, [account, setIsRegistered, yam]);

  useEffect(() => {
    fetchIsRegistered();
  }, [account, fetchIsRegistered, yam]);

  const handleRegisterClick = async () => {
    await delegateToken(account, () => setIsRegistering(true));
    setIsRegistering(false)
  };

  const handleUnregisterClick = async () => {
    await delegateToken(emptyDelegation, () => setIsRegistering(true));
    setIsRegistering(false)
  };

  const handleDelegateToken = async (delegatee: string) => await delegateToken(delegatee, () => null)
  const handleDelegateLP = async (delegatee: string) => await delegateLP(delegatee, () => null)
  const handleRemoveDelegationToken = async () => await delegateToken(emptyDelegation, () => null);
  const handleRemoveDelegationLP = async () => await delegateLP(emptyDelegation, () => null);

  useEffect(
    () => {
      if (yam) verifyDelegation();
    },
    [account, yam]
  );

  useEffect(() => {
    if (yam) {
      fetchProposals();
      fetchVotingPowers();
      fetchCurrentPower();
    }
  }, [fetchProposals, fetchCurrentPower, yam]);

  // useEffect(() => {
  //   if (yam) {
  //     fetchProposals();
  //     let refreshInterval = setInterval(fetchProposals, 100000);
  //     return () => clearInterval(refreshInterval);
  //   }
  // }, [yam, fetchProposals]);

  return (
    <Context.Provider
      value={{
        proposals,
        votingPowers,
        isRegistered,
        isRegistering,
        isVoting,
        delegatedAddressToken,
        delegatedAddressLP,
        isDelegatedToken,
        isDelegatedLP,
        onRegister: handleRegisterClick,
        onUnregister: handleUnregisterClick,
        onVote: handleVote,
        onDelegateToken: handleDelegateToken,
        onDelegateLP: handleDelegateLP,
        onRemoveTokenDelegation: handleRemoveDelegationToken,
        onRemoveLPDelegation: handleRemoveDelegationLP,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
