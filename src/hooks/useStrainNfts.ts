import { useContext } from 'react'

import { StrainNftsContext } from 'contexts/StrainNfts'

const useStrainNfts = () => {
  return { ...useContext(StrainNftsContext) }
}

export default useStrainNfts