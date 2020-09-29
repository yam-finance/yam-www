import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import useYam from 'hooks/useYam'
import {
  getProposals,
  vote,
} from 'yam-sdk/utils'


import Context from './Context'

import { Proposal } from "./types"

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet()
  const yam = useYam()

  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [proposals, setProposals] = useState<Proposal[]>()

  const fetchProposals = useCallback(async () => {
    let props: Proposal[] = await getProposals(yam);
    props = props.sort((a, b) => {
      if (a && b && a.end && b.end) {
        if (a.end == b.end) {
          return 0
        }
        if (a.end < b.end) {
          return 1
        } else {
          return -1
        }
      } else {
        return 0
      }

    });
    setProposals(props);
  }, [
    setProposals,
    yam,
  ])

  const handleVote = useCallback(async (proposal: number, side: boolean) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await vote(yam, proposal, side, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsVoting(true)
    })
    setIsVoting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsVoting,
    yam
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
      proposals,
      onVote: handleVote,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
