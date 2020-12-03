import { attributeNames, NftInstance, RarityIndexValues, VibeIndexValues, DEFAULT_NFT_SIZE, POOL_NAMES, PoolIds } from 'constants/poolValues'
import useStrainNfts from 'hooks/useStrainNfts'
import React, { useEffect, useMemo, useState } from 'react'

import {
    Button,
    Spacer,
} from 'react-neu'
import numeral from 'numeral'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

const StyledNft = ({ nft }: { nft: NftInstance }) => {
    const [isNftLoading, setIsNftLoading] = useState(false)
    const [updatedNft, setUpdatedNft] = useState<NftInstance>()
    const [canBurn, setCanBurn] = useState<boolean>(false)

    const {
        onRetrieve,
        onDestroyNft,
        earnedStrnBalance
    } = useStrainNfts();

    const poolName = useMemo(() => POOL_NAMES[Number(nft?.poolId)], [nft?.poolId])

    useEffect(() => {
        if (nft && !updatedNft) {
            setIsNftLoading(true);
            onRetrieve(nft)
                .then((updated: NftInstance) => {
                    setUpdatedNft(updated);
                    setIsNftLoading(false)
                })
                .catch((e: Error) => {
                    console.error(e);
                    setIsNftLoading(false);
                })
        }
    }, [nft.nftId, updatedNft])

    useEffect(() => {
        if (earnedStrnBalance === undefined) return setCanBurn(false);
        setCanBurn(earnedStrnBalance.lte(new BigNumber(1)))
    }, [earnedStrnBalance])


    const getAttribute = (name: string, collection: string[]): string => {
        if (!updatedNft) return '-';
        const attributes = updatedNft?.attribs?.attributes;
        if (!attributes) return '-';
        const found = attributes.find(a => a.trait_type === name)
        if (!found) return '-';
        return collection[found.value]
    }

    const getName = () => {
        if (!nft) return '-';
        if (nft?.nftName) return nft?.nftName;
        return updatedNft?.attribs?.name;
    }

    const handelUnstake = () => {
        if (!nft?.poolId) {
            console.error("for some reason the nft doesn't have a pool id")
            return;
        }
        onDestroyNft(nft.poolId, nft)
    }

    const formattedLPBalance = useMemo(() => {
        if (nft && nft?.lpBalance) {
            if (PoolIds.STRN_ETH === nft.poolId)
                return numeral(nft.lpBalance).format('0.00a')
            else
                return nft.lpBalance.toFixed(8)
        } else {
            return '--'
        }
    }, [nft])

    return (
        <>
            <NFTCard>
                {!isNftLoading && (
                    <>
                        <h3>{getName()}</h3>
                        <h4>{getAttribute(attributeNames.VIBES, VibeIndexValues)}</h4>
                        <Spacer size="sm" />
                        <img src={updatedNft?.attribs?.image} height={DEFAULT_NFT_SIZE} />
                        <Spacer size="sm" />
                        <RarityPill>{getAttribute(attributeNames.RARITY, RarityIndexValues)}</RarityPill>
                        <StyledInfo>
                            <Button
                                onClick={handelUnstake}
                                disabled={nft.isDestroying || !canBurn}
                                text={!canBurn ? "Claim first" : nft.isDestroying ? "Burning ..." : "Burn"}
                                size="sm"
                            />
                            <StyledLabels>
                                <div>{poolName}</div>
                                <StyledValue>{nft?.lpBalance ? formattedLPBalance : "-"}</StyledValue>
                            </StyledLabels>
                        </StyledInfo>
                    </>
                )}
                {isNftLoading && (
                    <StyledLoading>Loading ...</StyledLoading>
                )}
            </NFTCard>

            <Spacer size="md" />
        </>
    )
}


const NFTCard = styled.div`
    display: flex;
    flex-flow: column;
    min-width: 300px;
    max-height: 450px;
    background-color: #0E2B52;
    border-radius: 20px;
    color: white;
    text-align: center;
    display: inline-block !important;
    margin: 1rem;
`
const RarityPill = styled.button`
    width: 100px;
    height: 26px;
    background-color: #7AF7B6;
    border: 0;
    border-radius: 6px;
    font-family: Gopher;
`

const StyledLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const StyledInfo = styled.div`
    display flex;
    justify-content: space-between;
    align-items: center;    
    margin: 1rem;
`

const StyledLabels = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
`

const StyledValue = styled.span`
    font-size: 18px;
    font-weight: 600;
`

export default StyledNft

