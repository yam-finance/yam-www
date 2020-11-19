import { useContext } from 'react'

import { StakingContext } from 'contexts/Staking'

const useStaking = () => {
  return { ...useContext(StakingContext) }
}

export default useStaking