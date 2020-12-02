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
            <>
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
            </>
        </>
    )
}

const StyledTitle = styled.h3`
    text-align: center;
`
export default GenerateNFT
