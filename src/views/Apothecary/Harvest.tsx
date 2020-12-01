import React, { useMemo } from 'react'

import numeral from 'numeral'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardIcon,
    Container,
    Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'

import { bnToDec } from 'utils'
import useStrainNfts from 'hooks/useStrainNfts'
import styled from 'styled-components'

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
                <Button
                    disabled
                    full
                    text="Claim Rewards"
                    variant="secondary"
                />
            )
        }
        if (!isHarvesting) {
            return (
                <Button
                    full
                    onClick={() => onHarvest()}
                    text="Claim Rewards"
                />
            )
        }
        if (isHarvesting) {
            return (
                <Button
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