import { ProposalVotingPower } from "contexts/Governance/types";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { Yam } from "yam-sdk-files/dist/Yam";

const useSDK = () => {
  const { ethereum } = useWallet();
  const [yamSDK, setYamSDK] = useState<any>();
  // Contracts
  const [yamContract, setYamContract] = useState<any>();
  const [govContract, setGovContract] = useState<any>();
  const [redeemerContract, setRedeemerContract] = useState<any>();

  // Functions
  const [yamBalance, setYamBalance] = useState<any>();
  const [govProposals, setGovProposals] = useState<any>([]);

  const fetchSDK = useCallback(async () => {
    if (ethereum && Yam != undefined) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const yamSDK = await new Yam({
        provider: provider,
      });
      const yamContract = await yamSDK.contracts.token;
      const govContract = await yamSDK.contracts.governor;
      const redeemerContract = await yamSDK.contracts.redeemer;
      setYamSDK(yamSDK);
      setYamContract(yamContract);
      setGovContract(govContract);
      setRedeemerContract(redeemerContract);
      const userYamBalance = await yamContract.balance();
      const govProposals = await govContract.getRecentProposals();
      let govProposalsSorted = govProposals.sort((a: any, b: any) => {
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
      setYamBalance(userYamBalance);
      setGovProposals(govProposalsSorted);
    }
  }, [ethereum]);

  useEffect(() => {
    fetchSDK();
  }, [ethereum]);

  return {
    yamSDK,
    yamContract,
    govContract,
    redeemerContract,
    yamBalance,
    govProposals,
  };
};

export default useSDK;
