import { useContext } from "react";

import { GovernanceContext } from "contexts/Governance";

const useGovernance = () => {
  return { ...useContext(GovernanceContext) };
};

export default useGovernance;
