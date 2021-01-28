import React, { useCallback, useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";

import useYam from "hooks/useYam";
import {
  getProposals,
  vote,
  didDelegate,
  getVotingPowers,
  getCurrentVotingPower,
  delegate,
  delegateStaked,
} from "yam-sdk/utils";

import Context from "./Context";

import { Proposal, ProposalVotingPower } from "./types";

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet();
  const yam = useYam();

  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isDelegated, setIsDelegated] = useState(false);
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
        if (a.end == b.end) {
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
    let votingPowers: ProposalVotingPower[] = await getVotingPowers(yam, props, account);
    setProposals(props);
    setVotingPowers(votingPowers);
  }, [setProposals, setVotingPowers, yam]);

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

  const fetchIsRegistered = useCallback(async () => {
    if (!account || !yam) return;
    const registered = await didDelegate(yam, account);
    setIsRegistered(registered);
  }, [account, setIsRegistered, yam]);

  useEffect(() => {
    fetchIsRegistered();
  }, [account, fetchIsRegistered, yam]);

  const handleRegisterClick = useCallback(async () => {
    if (!account || !yam) return;
    await delegate(yam, account, account, (txHash: string) => setIsRegistering(true));
    setIsRegistering(false);
  }, [account, setIsRegistering, yam]);

  const handleDelegateUnstaked = useCallback(
    async (delegatee: string) => {
      if (!account || !yam) return;
      try {
        await delegate(yam, account, delegatee, (txHash: string) => null);
        verifyDelegation();
      }
      catch(err) {
        console.error(err.message);
      }
    },
    [account, yam]
  );

  const handleDelegateStaked = useCallback(
    async (delegatee: string) => {
      if (!account || !yam) return;
      try {
        await delegateStaked(yam, account, delegatee, (txHash: string) => null)
        verifyDelegation();
      }
      catch(err) {
        console.error(err.message);
      }
    },
    [account, yam]
  );
  
  const handleRemoveDelegation = useCallback(
    async () => {
      if (!account || !yam) return;
      try {
        await delegate(yam, account, account, (txHash: string) => null);
        verifyDelegation();
      }
      catch(err) {
        console.error(err.message);
      }
    }, [account, yam]
  );

  const verifyDelegation = async () => setIsDelegated(await didDelegate(yam, account));

  useEffect(
    () => {
      if(yam) verifyDelegation();
    },
    [account, yam]
  );

  useEffect(() => {
    if (yam) {
      fetchProposals();
      fetchCurrentPower();
    }
  }, [fetchProposals, fetchCurrentPower, yam]);

  useEffect(() => {
    if (yam) {
      fetchProposals();
      let refreshInterval = setInterval(fetchProposals, 100000);
      return () => clearInterval(refreshInterval);
    }
  }, [yam, fetchProposals]);

  return (
    <Context.Provider
      value={{
        proposals,
        votingPowers,
        isRegistered,
        isRegistering,
        isVoting,
        isDelegated,
        onRegister: handleRegisterClick,
        onVote: handleVote,
        onDelegateStaked: handleDelegateStaked,
        onDelegateUnstaked: handleDelegateUnstaked,
        onRemoveDelegation: handleRemoveDelegation,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
