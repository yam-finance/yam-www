import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
    Button,
    Spacer,
} from 'react-neu'

import styled from 'styled-components'
import StyledBlankNFT from 'views/Common/StyledBlankNFT'
import useBalances from 'hooks/useBalances'
import { useWallet } from 'use-wallet'
import { MIN_STRN_ETH_LP_VALUE, MIN_STRN_XIOT_LP_VALUE, PoolIds } from 'constants/poolValues'
import BigNumber from 'bignumber.js'
import GenerateNftButton from './GenerateNftButton'

const GenerateNFT = () => {
    const [canStrnLpGenerate, setCanStrnLpGenerate] = useState(false)
    const [canXiotLpGenerate, setCanXiotLpGenerate] = useState(false)

    const { status } = useWallet()

    const {
        strnEthLpBalance,
        strnXiotLpBalance,
    } = useBalances()

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
                {canStrnLpGenerate && canXiotLpGenerate && (
                    <Spacer size="md" />
                )}
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
