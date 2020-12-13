import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
    Button,
    Spacer,
} from 'react-neu'

import styled from 'styled-components'
import StyledBlankNFT from 'views/Common/StyledBlankNFT'
import useBalances from 'hooks/useBalances'
import { PoolIds } from 'constants/poolValues'
import GenerateNftButton from './GenerateNftButton'

const GenerateNFT = () => {
    const {
        strnEthLpBalance,
        strnXiotLpBalance,
    } = useBalances()

    return (
        <>
            <StyledTitle>Generate NFT</StyledTitle>
            <Spacer size={"sm"} />
            <StyledBlankNFT />
            <GenFee>420 STRN Fee to Generate each NFT</GenFee>
            <StyledSection>
                <Spacer size="sm" />
                <GenerateNftButton
                    poolId={PoolIds.STRN_ETH}
                    walletBalance={strnEthLpBalance}
                />
                <Spacer size="md" />
                <Spacer size="sm" />
                <GenerateNftButton
                    poolId={PoolIds.STRN_XIOT}
                    walletBalance={strnXiotLpBalance}
                />
            </StyledSection>
        </>
    )
}

const StyledTitle = styled.h3`
    text-align: center;
`

const GenFee = styled.div`
    color: #00AC69;
    text-align: center;
    font-weight: 600;
    padding: 1rem;
`

const StyledSection = styled.div`
    border-top: 1px solid #00AC69;
    margin-top: 1rem;
    padding-top: 1rem;
`

export default GenerateNFT
