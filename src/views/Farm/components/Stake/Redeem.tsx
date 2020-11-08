import React, { useMemo } from 'react'

import {
    Box,
    Button,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import useFarming from 'hooks/useFarming'
import { getItemValue } from 'utils'

const Redeem: React.FC<{ poolId: string }> = ({ poolId }) => {
    const { status } = useWallet()
    const {
        isRedeeming,
        onRedeem,
    } = useFarming()

    const RedeemButton = useMemo(() => {
        if (status !== 'connected') {
            return (
                <Button
                    disabled
                    text="Claim &amp; Unstake"
                    variant="secondary"
                />
            )
        }
        if (!getItemValue(isRedeeming, poolId)) {
            return (
                <Button
                    onClick={() => onRedeem(poolId)}
                    text="Claim &amp; Unstake"
                    variant="secondary"
                />
            )
        }
        return (
            <Button
                disabled
                text="Redeeming..."
                variant="secondary"
            />
        )
    }, [
        String(isRedeeming),
        onRedeem,
    ])

    return (
        <Box row justifyContent="center">
            {RedeemButton}
        </Box>
    )
}

export default Redeem