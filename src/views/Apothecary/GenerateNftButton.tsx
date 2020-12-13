import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
    Spacer,
} from 'react-neu'

import styled from 'styled-components'
import useApproval from 'hooks/useApproval'
import { getAddresses } from 'constants/tokenAddresses'
import useStrainNfts from 'hooks/useStrainNfts'
import { useWallet } from 'use-wallet'
import { MIN_LP_AMOUNTS, MIN_LP_AMOUNTS_DISPLAY, PoolIds, POOL_NAMES } from 'constants/poolValues'
import NamedGeneratingModal from 'views/Modals/NamedGeneratingModal'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import Label from 'components/Label'
import StyledPrimaryButton from 'views/Common/StyledButton'

const GenerateNftButton = ({ poolId, walletBalance }: { poolId: string, walletBalance?: BigNumber }) => {
    const [generateModalIsOpen, setGenerateModalIsOpen] = useState(false)
    const [canGenerate, setCanGenerate] = useState(false)

    const {
        setConfirmTxModalIsOpen,
        isCreating,
        onCreateNft,
        isLoading,
    } = useStrainNfts();

    const { status } = useWallet()

    const poolName = useMemo(() => POOL_NAMES[Number(poolId)], [poolId])
    const minAmountLpTokens = useMemo(() => MIN_LP_AMOUNTS[Number(poolId)], [poolId])

    const getLpTokenAddress = () => {
        if (poolId === PoolIds.STRN_ETH) return getAddresses().strnLPTokenAddress
        return getAddresses().strnXiotLPTokenAddress
    }

    const { isApproved, isApproving, onApprove } = useApproval(
        getLpTokenAddress(),
        getAddresses().strainNFTCrafterAddress,
        () => setConfirmTxModalIsOpen(false)
    )

    const handleApprove = useCallback(() => {
        setConfirmTxModalIsOpen(true)
        onApprove()
    }, [
        onApprove,
        setConfirmTxModalIsOpen,
    ])

    const handleGenerateClick = useCallback(() => {
        setGenerateModalIsOpen(true)
    }, [setGenerateModalIsOpen])

    const handleOnGenerate = (amount: string, name: string) => {
        onCreateNft(poolId, amount, name)
        handleDismissGenerateModal()
    }

    const handleDismissGenerateModal = useCallback(() => {
        setGenerateModalIsOpen(false)
    }, [setGenerateModalIsOpen])

    useEffect(() => {
        if (!minAmountLpTokens && !walletBalance) {
            setCanGenerate(false);
        }
        if (walletBalance && new BigNumber(walletBalance).gte(new BigNumber(minAmountLpTokens))) {
            setCanGenerate(true)
        }
    }, [walletBalance, poolId])

    const formattedLPBalance = useMemo(() => {
        if (walletBalance) {
            return poolId === PoolIds.STRN_ETH ? numeral(walletBalance).format('0.00a') : walletBalance.toFixed(8)
        } else {
            return '--'
        }
    }, [walletBalance, poolId])

    const GenerateButton = useMemo(() => {
        if (status !== 'connected') {
            return (
                <>
                    <StyledPrimaryButton
                        disabled
                        full
                        text={'Not Connected'}
                        variant="secondary"
                    />
                </>
            )
        }
        if (walletBalance === undefined) {
            return (
                <>
                    <StyledPrimaryButton
                        disabled
                        full
                        text="Loading ..."
                        variant="secondary"
                    />
                </>
            )
        }

        if (!canGenerate) {
            return (
                <>
                    <Spacer size={"sm"} />
                    <StyledPrimaryButton
                        disabled
                        full
                        text="Insufficient LP balance"
                        variant="secondary"
                    />
                </>
            )
        }

        if (isCreating) {
            return (
                <>
                    <StyledPrimaryButton
                        disabled
                        full
                        text="Generating..."
                        variant="secondary"
                    />
                </>
            )
        }

        if (!isApproved) {
            // disable generation
            return (
                <>
                    <StyledPrimaryButton
                        full
                        onClick={handleApprove}
                        text={!isApproving ? "Approve Generating" : "Approving Generating..."}
                        variant={isApproving || status !== 'connected' ? 'secondary' : 'default'}
                    />
                </>
            )
        }

        if (isApproved) {
            return (
                <>
                    {canGenerate && (
                        <>
                            <StyledPrimaryButton
                                full
                                onClick={handleGenerateClick}
                                text={`wrap ${poolName} LP`}
                            />
                        </>)
                    }
                </>)
        }

    }, [
        handleGenerateClick,
        isApproving,
        isCreating,
        handleApprove,
        status,
    ])

    return (
        <>
            {status !== 'connected' && <Spacer size="sm" />}
            <div>{poolName} LP: <StyledValue>{formattedLPBalance}</StyledValue></div>
            <Label text={`Min: ${String(MIN_LP_AMOUNTS_DISPLAY[Number(poolId)])} ${poolName} LP`} />
            <Spacer size="sm" />

                {GenerateButton}


            <NamedGeneratingModal
                isOpen={generateModalIsOpen}
                onDismiss={handleDismissGenerateModal}
                onGenerate={handleOnGenerate}
                label={poolName}
                fullBalance={walletBalance}
                minAmount={minAmountLpTokens}
                poolId={poolId}
            />
        </>
    )
}

const StyledValue = styled.span`
    font-size: 18px;
    font-weight: 600;
`


export default GenerateNftButton
