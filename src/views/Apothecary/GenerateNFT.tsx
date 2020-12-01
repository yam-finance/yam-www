import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
    Container,
    Button,
    Spacer,
} from 'react-neu'

import styled from 'styled-components'
import StyledBlankNFT from 'views/Common/StyledBlankNFT'
import useApproval from 'hooks/useApproval'
import { getAddresses } from 'constants/tokenAddresses'
import useStrainNfts from 'hooks/useStrainNfts'
import useBalances from 'hooks/useBalances'
import { useWallet } from 'use-wallet'
import { MIN_LP_AMOUNTS, MIN_STRN_ETH_LP_VALUE, MIN_STRN_XIOT_LP_VALUE, PoolIds } from 'constants/poolValues'
import NamedGeneratingModal from 'views/Modals/NamedGeneratingModal'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import Label from 'components/Label'

const GenerateNFT = () => {
    const [generateModalIsOpen, setGenerateModalIsOpen] = useState(false)
    const [canStrnLpGenerate, setCanStrnLpGenerate] = useState(false)
    const [canXiotLpGenerate, setCanXiotLpGenerate] = useState(false)
    const [poolId, setPoolid] = useState(String(PoolIds.STRN_ETH))
    const {
        setConfirmTxModalIsOpen,
        isCreating,
        onCreateNft,
    } = useStrainNfts();

    const { status } = useWallet()

    const {
        strnEthLpBalance,
        strnXiotLpBalance,
    } = useBalances()

    const { isApproved, isApproving, onApprove } = useApproval(
        getAddresses().strnLPTokenAddress,
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

    const handleGenerateClick = useCallback((poolId: string) => {
        setPoolid(poolId)
        setGenerateModalIsOpen(true)
    }, [setGenerateModalIsOpen])

    const handleOnGenerate = (amount: string, name: string) => {
        onCreateNft(poolId, amount, name)
        handleDismissGenerateModal()
    }

    const handleDismissGenerateModal = useCallback(() => {
        setGenerateModalIsOpen(false)
    }, [setGenerateModalIsOpen])

    const walletBalance = useMemo(() => {
        // need better way to get specific pool balance
        return poolId === "0" ? strnEthLpBalance : strnXiotLpBalance
    }, [strnEthLpBalance, strnXiotLpBalance])

    useEffect(() => {
        if (!strnEthLpBalance && !strnXiotLpBalance) {
            setCanStrnLpGenerate(false);
            setCanXiotLpGenerate(false);
        }
        if (strnEthLpBalance && new BigNumber(strnEthLpBalance).gte(new BigNumber(MIN_STRN_ETH_LP_VALUE))) {
            setCanStrnLpGenerate(true)
        }
        if (strnXiotLpBalance && new BigNumber(strnXiotLpBalance).gte(new BigNumber(MIN_STRN_XIOT_LP_VALUE))) {
            setCanXiotLpGenerate(true)
        }
    }, [strnEthLpBalance, strnXiotLpBalance])

    const formattedStrnLPBalance = useMemo(() => {
        if (strnEthLpBalance) {
            return numeral(strnEthLpBalance).format('0.00a')
        } else {
            return '--'
        }
    }, [strnXiotLpBalance])

    const formattedStrnXiotLPBalance = useMemo(() => {
        if (strnXiotLpBalance) {
            return strnXiotLpBalance.toFixed(8)
        } else {
            return '--'
        }
    }, [strnXiotLpBalance])

    const GenerateButton = useMemo(() => {
        if (status !== 'connected') {
            return (
                <>
                    <Spacer size="lg" />
                    <Button
                        disabled
                        full
                        text="Not Connected"
                        variant="secondary"
                    />
                </>
            )
        }
        if (strnEthLpBalance === undefined && strnXiotLpBalance === undefined) {
            return (
                <>
                    <Spacer size="lg" />
                    <Button
                        disabled
                        full
                        text="Loading ..."
                        variant="secondary"
                    />
                </>
            )
        }

        if (!canStrnLpGenerate && !canXiotLpGenerate) {
            return (
                <>
                    <Spacer size={"sm"} />
                    <Label text={'Minimum balance needed to Generate NFT'} />
                    <Spacer size={"md"} />
                    <Label text={`${String(MIN_STRN_ETH_LP_VALUE)} STRN/ETH LP`} />
                    <Label text={`${String(MIN_STRN_XIOT_LP_VALUE.toFixed(8))} STRN/XIOT LP`} />
                    <Spacer size={"sm"} />
                    <Button
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
                    <Spacer size={"lg"} />
                    <Button
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
                    <Spacer size={"lg"} />
                    <Button
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
                    {canStrnLpGenerate && (
                        <>
                            <div>STRN/ETH LP: <StyledValue>{formattedStrnLPBalance}</StyledValue></div>
                            <Label text={`Min: ${String(MIN_STRN_ETH_LP_VALUE)} STRN/ETH LP`} />
                            <Spacer size="sm" />
                            <Button
                                full
                                onClick={() => handleGenerateClick(PoolIds.STRN_ETH)}
                                text="wrap [STRN/ETH] LP"
                            />
                        </>)
                    }
                    {canStrnLpGenerate && canXiotLpGenerate && (
                        <Spacer size="md" />
                    )}
                    {canXiotLpGenerate && (
                        <>
                            <div>STRN/XIOT LP: <StyledValue>{formattedStrnXiotLPBalance}</StyledValue></div>
                            <Label text={`Min: ${String(MIN_STRN_XIOT_LP_VALUE.toFixed(8))} STRN/XIOT LP`} />
                            <Spacer size="sm" />
                            <Button
                                full
                                onClick={() => handleGenerateClick(PoolIds.STRN_XIOT)}
                                text="wrap [STRN/XIOT] LP"
                            />
                        </>)}

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
            <StyledTitle>Generate NFT</StyledTitle>
            <Spacer size={"sm"} />
            <StyledBlankNFT />

            {status !== 'connected' && <Spacer size="sm" />}
            {GenerateButton}

            <NamedGeneratingModal
                isOpen={generateModalIsOpen}
                onDismiss={handleDismissGenerateModal}
                onGenerate={handleOnGenerate}
                label={`Generate NFT`}
                fullBalance={walletBalance}
                minAmount={MIN_LP_AMOUNTS[Number(poolId)]}
            />
        </>
    )
}

const StyledTitle = styled.h3`
    text-align: center;
`
const StyledValue = styled.span`
    font-size: 18px;
    font-weight: 600;
`

export default GenerateNFT
