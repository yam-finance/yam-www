import { useCallback, useState, useEffect } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { isApprovalForAll, setApprovalForAll } from 'utils'

const useApprovalForAll = (
    tokenAddress?: string,
    spenderAddress?: string,
    onTxHash?: (txHash: string) => void,
) => {
    const [isApprovedForAll, setApprovedForAll] = useState(false)
    const [isApproving, setIsApproving] = useState(false)
    const [isApproved, setIsApproved] = useState(false)

    const { account, ethereum }: { account: string | null, ethereum?: provider } = useWallet()

    const fetchApprovalAll = useCallback(async (userAddress: string, provider: provider) => {
        if (!spenderAddress || !tokenAddress) {
            return
        }
        const isContractApproved = await isApprovalForAll(userAddress, spenderAddress, tokenAddress, provider)
        setApprovedForAll(isContractApproved)
    }, [setApprovedForAll, spenderAddress, tokenAddress])

    useEffect(() => {
        if (account && ethereum && spenderAddress && tokenAddress) {
            fetchApprovalAll(account, ethereum)
        }
        let refreshInterval = setInterval(fetchApprovalAll, 10000)
        return () => clearInterval(refreshInterval)
    }, [account, ethereum, spenderAddress, tokenAddress])

    const handleApprove = useCallback(async () => {
        if (!ethereum || !account || !spenderAddress || !tokenAddress) {
            return
        }
        try {
            setIsApproving(true)
            const result = await setApprovalForAll(
                account,
                spenderAddress,
                tokenAddress,
                ethereum,
                onTxHash,
            )
            setIsApproved(result)
            setIsApproving(false)
        } catch (e) {
            setIsApproving(false)
            return false
        }
    }, [
        account,
        ethereum,
        onTxHash,
        setIsApproved,
        setIsApproving,
        spenderAddress,
        tokenAddress,
    ])

    useEffect(() => {
        if (!!isApprovedForAll) {
            setIsApproved(true)
        }
    }, [
        isApprovedForAll,
        setIsApproved,
    ])

    return {
        isApproved,
        isApproving,
        onApprove: handleApprove,
    }
}

export default useApprovalForAll