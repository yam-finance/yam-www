import React, { useMemo } from 'react'

import numeral from 'numeral'
import {
    Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import { bnToDec } from 'utils'
import useStrainNfts from 'hooks/useStrainNfts'
import styled from 'styled-components'
import StyledPrimaryButton from 'views/Common/StyledButton'

const Harvest: React.FC = () => {
    const {
        earnedStrnBalance,
        isHarvesting,
        onHarvest,
    } = useStrainNfts()

    const { status } = useWallet()

    const HarvestAction = useMemo(() => {
        if (status !== 'connected' || earnedStrnBalance === undefined) {
            return (
                <StyledPrimaryButton
                    disabled
                    full
                    text="Claim Rewards"
                    variant="secondary"
                />
            )
        }
        if (!isHarvesting) {
            return (
                <StyledPrimaryButton
                    full
                    onClick={() => onHarvest()}
                    text="Claim Rewards"
                />
            )
        }
        if (isHarvesting) {
            return (
                <StyledPrimaryButton
                    disabled
                    full
                    text="Claiming..."
                    variant="secondary"
                />
            )
        }
    }, [
        String(isHarvesting),
        earnedStrnBalance,
        onHarvest,
        status
    ])

    const formattedEarnedBalance = useMemo(() => {
        if (earnedStrnBalance) {
            return numeral(bnToDec(earnedStrnBalance)).format('0.00a')
        } else {
            return '--'
        }
    }, [earnedStrnBalance])

    if (status === 'connected') {
        return (
            <>
                <Spacer size="md" />
                <div>STRN Rewards: <StyledValue>{formattedEarnedBalance}</StyledValue></div>
                <Spacer size="sm" />
                {HarvestAction}
            </>
        )
    }
    return null;
}

const StyledValue = styled.span`
    font-size: 18px;
    font-weight: 600;
`



export default Harvest