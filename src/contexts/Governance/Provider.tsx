import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import useYam from 'hooks/useYam'
import {
  getProposals,
} from 'yam-sdk/utils'


import Context from './Context'

import { Proposal } from "./types"

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet()
  const yam = useYam()

  const [proposals, setProposals] = useState<Proposal[]>()

  const fetchProposals = useCallback(async () => {
    const props: Proposal[] = await getProposals(yam);
    setProposals(props);
  }, [
    setProposals,
    yam,
  ])

  useEffect(() => {
    if (yam) {
      fetchProposals()
    }
  }, [
    fetchProposals,
    yam,
  ])

  useEffect(() => {
    if (yam) {
      fetchProposals()
      let refreshInterval = setInterval(fetchProposals, 100000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    yam,
    fetchProposals,
  ])

  return (
    <Context.Provider value={{
      proposals
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
