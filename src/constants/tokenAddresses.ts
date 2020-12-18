export const yam = '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
export const yamv2 = '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a'
export const yamv3 = '0x0AaCfbeC6a24756c20D41914F2caba817C0d8521'
export const yUsd = '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c'
export const yycrvUniLp = '0xb93Cc05334093c6B3b8Bfd29933bb8d5C031caBC'
export const migrator = '0x72cfed9293cbfb2bfc7515c413048c697c6c811c'

// harcode chainId for wallet provider lib
export const chainId = 1;
export const base_image_url = 'https://nft-image-service.herokuapp.com/'
//export const infura_key = 'https://rinkeby.infura.io/v3/1b38871d05fa4d3298a3096c6e863c97';
export const infura_key = 'https://mainnet.infura.io/v3/b939aead2bdf44ad89eecac113a4e143';

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

        strainNFTAddress: '0x0f24aFC9f3FCdf66132060fE1fA344711859C571',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json        
        strainNFTCrafterAddress: '0xCbb9fA9b7b3d70231B4aD1C6819D6251d612b116',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    },
    4: {
        strnTokenAddress: '0x60C60185505965f4cFfdc9DcE3aE0F72E140D94E',
        strnLPTokenAddress: '0x478b1c77e7679ff65c8931d268f1d9c420280133',
        strnEthIncAddress: '0x25d766A7e469741BE43C1dAD8439AF74a8344613',

        // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
        // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
        strnXiotLPTokenAddress: '0xc7cfa8c19c64506ef31280850a8224c75b32f71b',
        strnXiotPoolAddress: '0xF70dE70202F326EA79f85C90e635F0abE338d73d',

        // -- single staking
        stxpTokenAddress: '0xa88b38138152EE83C81aF124FC2948Fc00c26CE5',
        // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
        singleStrnPool: '0x69dc085C3C51F5ef74C737E817DD2A271e772B17',
        // xiot: "0x5deb4627202cD666cE025F78956A14418345f508"
        strainNFTAddress: '0x7C69E81b4d597f30cB594d96E07C0c4e5adaac4c',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json
        strainNFTCrafterAddress: '0x7Dc128baaa3D9c839c7E92d6899207bD6BfDF4dB',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    }
}

/*
STRN: 0x60C60185505965f4cFfdc9DcE3aE0F72E140D94E
StrainNFT: 0x7C69E81b4d597f30cB594d96E07C0c4e5adaac4c
StrainCrafter: 0x7Dc128baaa3D9c839c7E92d6899207bD6BfDF4dB


STXP: 0xa88b38138152EE83C81aF124FC2948Fc00c26CE5
XIOT: 0x82D51e59c243462d69761979d478bd17e2B7fF30

STRN LP: 0x478b1c77e7679ff65c8931d268f1d9c420280133
XIOT LP: 0xc7cfa8c19c64506ef31280850a8224c75b32f71b
*/

export function getAddresses(): { [name: string]: string } {
    return addresses[chainId]
}

export function getMulticallAddress(): string {
    const addresses = {
        1: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
        4: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
    }
    return addresses[chainId];
}