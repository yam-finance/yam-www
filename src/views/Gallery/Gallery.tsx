import React, { useEffect, useState } from 'react'
import {
    Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import { DEFAULT_NFT_SIZE, RarityIndexValues, TerpsIndexValues, VibeIndexValues } from 'constants/poolValues'
import { base_image_url } from 'constants/tokenAddresses'

interface NftGallery {
    genome: string;
    name: string;
    url: string;
}

const Gallery: React.FC = () => {

    const [nfts, setNfts] = useState<NftGallery[]>([])

    useEffect(() => {
        let builder: NftGallery[] = []
        const strainnft = "11111";
        RarityIndexValues.map((rarity, i) => {
            VibeIndexValues.map((vibe, j) => {
                TerpsIndexValues.map((terp, k) => {
                    const genome = `${i}${j}${k}${strainnft}`
                    builder.push({ genome, name: `${rarity} ${vibe} ${terp}`, url: `${base_image_url}genome/${genome}` })
                })
            })
        })

        setNfts(builder)
    }, [setNfts])

    return (
        <Page>
            <StyledNftSection>
                {nfts && nfts.map(nft => (
                    <SytledGallery>
                        <Spacer size="sm" />
                        <img src={nft.url} height={DEFAULT_NFT_SIZE} />
                        <Spacer size="sm" />
                        <div>{nft.name}</div>
                        <div>genome: {nft.genome}</div>
                    </SytledGallery>
                ))}
            </StyledNftSection>

        </Page >
    )
}

const StyledNftSection = styled.div`
  border-left: 1px solid #00AC69;
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  @media (max-width: 600px) {
    border-left: unset;
  }
`
const SytledGallery = styled.div`
    display: flex;
    flex-flow: column nowrap;
    padding: 1rem;
`

export default Gallery

