import React, { useCallback, useMemo, useState } from 'react'

import {
    Button,
    Container,
    Spacer,
} from 'react-neu'

import styled from 'styled-components'
import StyledBlankNFT from 'views/Common/StyledBlankNFT'
import useApproval from 'hooks/useApproval'
import { getAddresses } from 'constants/tokenAddresses'
import useStrainNfts from 'hooks/useStrainNfts'
import useBalances from 'hooks/useBalances'
import { useWallet } from 'use-wallet'
import { PoolIds, RNG_ETH_FEE } from 'constants/poolValues'
import NamedGeneratingModal from 'views/Modals/NamedGeneratingModal'

const GenerateNFT = () => {
    const [generateModalIsOpen, setGenerateModalIsOpen] = useState(false)
    const [poolId, setPoolid] = useState(PoolIds.STRN_ETH)
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

    const handleGenerateClick = useCallback(() => {
        setGenerateModalIsOpen(true)
      }, [setGenerateModalIsOpen])

    const handleOnGenerate = useCallback((amount: string, name: string) => {
        const fee = RNG_ETH_FEE;
        onCreateNft(poolId, amount, name, fee)
        handleDismissGenerateModal()
    }, [setGenerateModalIsOpen])

    const handleDismissGenerateModal = useCallback(() => {
        setGenerateModalIsOpen(false)
    }, [setGenerateModalIsOpen])

    const walletBalance = useMemo(() => {
        // need better way to get specific pool balance
        return poolId === "0" ? strnEthLpBalance : strnXiotLpBalance
    }, [strnEthLpBalance, strnXiotLpBalance])


    const GenerateButton = useMemo(() => {
        if (status !== 'connected') {
            return (
                <Button
                    disabled
                    full
                    text="Generate"
                    variant="secondary"
                />
            )
        }
        if (isCreating) {
            return (
                <Button
                    disabled
                    full
                    text="Generating..."
                    variant="secondary"
                />
            )
        }
        if (!isApproved) {
            // disable generation
            return (
                <Button
                    full
                    onClick={handleApprove}
                    text={!isApproving ? "Approve generating" : "Approving generating..."}
                    variant={isApproving || status !== 'connected' ? 'secondary' : 'default'}
                />
            )
        }

        if (isApproved) {
            return (
                <Button
                    full
                    onClick={handleGenerateClick}
                    text="Generate"
                />
            )
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
            <Container>
                <StyledBlankNFT />
                <Spacer size="lg" />
                <Spacer />
                <Spacer size="md" />
                <div>
                    {GenerateButton}
                </div>
            </Container>

            <NamedGeneratingModal
                isOpen={generateModalIsOpen}
                onDismiss={handleDismissGenerateModal}
                onGenerate={handleOnGenerate}
                label={`Generate NFT`}
                fullBalance={walletBalance}
            />
        </>
    )
}

export default GenerateNFT
