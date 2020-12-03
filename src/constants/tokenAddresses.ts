export const yam = '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
export const yamv2 = '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a'
export const yamv3 = '0x0AaCfbeC6a24756c20D41914F2caba817C0d8521'
export const yUsd = '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c'
export const yycrvUniLp = '0xb93Cc05334093c6B3b8Bfd29933bb8d5C031caBC'
export const migrator = '0x72cfed9293cbfb2bfc7515c413048c697c6c811c'

// harcode chainId for wallet provider lib
export const chainId = 4;
export const base_image_url = 'https://nft-image-service.herokuapp.com/'

// mainnet
const strn = '0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f'
const strnEthLP = '0xa198f36e3648dd16e75d721f0c6516e00e9ca053'
const strnIncentivizer = '0x19Bf9bef453f57983319Eb3033a95a7aa7DB764d'
// make sure to update the addresses in json files
// src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
// src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
const strnXiotLP = '0xae14831467c8d0e3153aba2ea009bcdc485125a2'
const strnXiotIncentivizer = '0x0B864C8eD32457C83d3E35b47200085E96005425'

// -- single staking
const stxp = '0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772'
// src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
const singleStrnPool = '0x69dc085C3C51F5ef74C737E817DD2A271e772B17'

const addresses = {
    1: {
        strnTokenAddress: '0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f',
        strnLPTokenAddress: '0xa198f36e3648dd16e75d721f0c6516e00e9ca053',
        strnEthIncAddress: '0x19Bf9bef453f57983319Eb3033a95a7aa7DB764d',

        // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
        // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
        strnXiotLPTokenAddress: '0xae14831467c8d0e3153aba2ea009bcdc485125a2',
        strnXiotPoolAddress: '0x0B864C8eD32457C83d3E35b47200085E96005425',

        // -- single staking
        stxpTokenAddress: '0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772',
        // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
        singleStrnPool: '0x69dc085C3C51F5ef74C737E817DD2A271e772B17',

        strainNFTAddress: '0x78357271b76161aEB280D387D0da357aBB8824d4',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json        
        strainNFTCrafterAddress: '0x7b8B851D4e26D46f68bF3F2C67a220398B7DB234',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    },
    4: {
        strnTokenAddress: '0xf0855E08DBBCB7563a196c5613C18690aAc738fe',
        strnLPTokenAddress: '0x6cd98d3909035f779eaa7c98f940daa0173a48e2',
        strnEthIncAddress: '0x25d766A7e469741BE43C1dAD8439AF74a8344613',

        // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
        // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
        strnXiotLPTokenAddress: '0x19a73ec9d54a6e0ffc0f4378266cf5c51492fb74',
        strnXiotPoolAddress: '0xF70dE70202F326EA79f85C90e635F0abE338d73d',

        // -- single staking
        stxpTokenAddress: '0x13d0DE15e45460bd69F58AE3f0E7dE8ba53AC162',
        // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
        singleStrnPool: '0x69dc085C3C51F5ef74C737E817DD2A271e772B17',
        // xiot: "0x5deb4627202cD666cE025F78956A14418345f508"
        strainNFTAddress: '0xCB89BD0E7c71Eed45e52286fD1851a283BE3eACa',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json
        strainNFTCrafterAddress: '0xbAFd1956FF097E9E15a4955d9D1056Bd7aB04ca9',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    }
}

export function getAddresses(): { [name: string]: string } {
    return addresses[chainId]
}