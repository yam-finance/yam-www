import FancyValue from 'components/FancyValue'
import Label from 'components/Label'
import { attributeNames, TerpsIndexValues, NftInstance, RarityIndexValues, VibeIndexValues, DEFAULT_NFT_SIZE } from 'constants/poolValues'
import useStrainNfts from 'hooks/useStrainNfts'
import React, { useEffect, useState } from 'react'

import {
    Button,
    CardActions,
    Spacer,
} from 'react-neu'

import styled from 'styled-components'

const StyledNft = ({ nft }: { nft: NftInstance }) => {
    const [isNftLoading, setIsNftLoading] = useState(false)
    const [updatedNft, setUpdatedNft] = useState<NftInstance>()

    //TODO: get nft LP balance
    const lpAmount = "22.00";

    const {
        onRetrieve,
        onDestroyNft,
        isDestroying,
    } = useStrainNfts();


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
    }, [nft, updatedNft])

    const getAttribute = (name: string, collection: string[]): string => {
        if (!updatedNft) return '-';
        const attributes = updatedNft?.attribs?.attributes;
        if (!attributes) return '-';
        const found = attributes.find(a => a.trait_type === name)
        if (!found) return '-';
        return collection[found.value]
    }

    const getName = () => {
        if (!updatedNft) return '-';
        if (updatedNft?.nftName) return updatedNft?.nftName;
        return updatedNft?.attribs?.name;
    }

    const handelUnstake = () => {
        // TODO: get NFTs poolId
        onDestroyNft("0", nft.nftId)
    }

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
                                disabled={isDestroying}
                                text={isDestroying ? "Burning ..." : "Burn"}
                                size="sm"
                            />
                            <StyledLabels>
                                <div>{"STRN/XIOT LP:"}</div>
                                <StyledValue>{lpAmount}</StyledValue>
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
    margin: 0 20px;
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

