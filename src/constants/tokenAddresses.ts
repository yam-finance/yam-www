export const yam = "0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16";
export const yamv2 = "0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a";
export const yamv3 = "0x0AaCfbeC6a24756c20D41914F2caba817C0d8521";
export const yUsd = "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c";
export const yycrvUniLp = "0xb93Cc05334093c6B3b8Bfd29933bb8d5C031caBC";
export const migrator = "0x72cfed9293cbfb2bfc7515c413048c697c6c811c";

// harcode chainId for wallet provider lib
export const chainId = 1;
export const base_image_url = "https://nft-image-service.herokuapp.com/";
//export const infura_key = 'https://rinkeby.infura.io/v3/1b38871d05fa4d3298a3096c6e863c97';
//export const infura_key =
  //"https://rinkeby.infura.io/v3/b939aead2bdf44ad89eecac113a4e143";

// mainnet
const strn = "0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f";
const strnEthLP = "0xa198f36e3648dd16e75d721f0c6516e00e9ca053";
const strnIncentivizer = "0x19Bf9bef453f57983319Eb3033a95a7aa7DB764d";
// make sure to update the addresses in json files
// src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
// src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
const strnXiotLP = "0xae14831467c8d0e3153aba2ea009bcdc485125a2";
const strnXiotIncentivizer = "0x0B864C8eD32457C83d3E35b47200085E96005425";

// -- single staking
const stxp = "0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772";
// src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
const singleStrnPool = "0x69dc085C3C51F5ef74C737E817DD2A271e772B17";

const addresses = {
  1: {
    strnTokenAddress: "0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f",
    strnLPTokenAddress: "0xa198f36e3648dd16e75d721f0c6516e00e9ca053",
    strnEthIncAddress: "0x19Bf9bef453f57983319Eb3033a95a7aa7DB764d",

    // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
    // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
    strnXiotLPTokenAddress: "0xae14831467c8d0e3153aba2ea009bcdc485125a2",
    strnXiotPoolAddress: "0x0B864C8eD32457C83d3E35b47200085E96005425",

    // -- single staking
    stxpTokenAddress: "0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772",
    // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
    singleStrnPool: "0x69dc085C3C51F5ef74C737E817DD2A271e772B17",

    strainNFTAddress: "0x3DF366063189a7F6c872A81128787E51E22927A4",
    // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json
    strainNFTCrafterAddress: "0x52B1C5838881E17c12Fc84163bcD7a77DdE582B5",
    // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    strainNFTGeneticsAdderss: "0xd7579f0aB4d15FBF0B519E172936B228FBC9a942",
    // src/yam-sdk/lib/clean_build/contracts/StrainNFTGenetics.json
  },
  4: {
    strnTokenAddress: "0x49aF0fa41DdC96F502c67AcdC5064aABFf6b43da",
    strnLPTokenAddress: "0x49aF0fa41DdC96F502c67AcdC5064aABFf6b43da",
    strnEthIncAddress: "0x25d766A7e469741BE43C1dAD8439AF74a8344613",

    // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
    // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
    strnXiotLPTokenAddress: "0x2bb8A63DDEd948D0A70dC79B08495c4d1Ea7bd95",
    strnXiotPoolAddress: "0xF70dE70202F326EA79f85C90e635F0abE338d73d",

    // -- single staking
    stxpTokenAddress: "0x3472cb185E2a457Fb2e17aaE9454A7dE0921ba05",
    // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
    singleStrnPool: "0x69dc085C3C51F5ef74C737E817DD2A271e772B17",
    // xiot: "0x5deb4627202cD666cE025F78956A14418345f508"
    strainNFTAddress: "0xfC83c90052FE546Ad1d9F78D4e62AE9a08327936",
    // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json
    strainNFTCrafterAddress: "0xE8BC9c9885dE95d6b4A8dBbE9507232b7c954569",
    // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    strainNFTGeneticsAdderss: "0xe11aB4fC365eb6305B6aDe0c3F50D16d03a54388",
    // src/yam-sdk/lib/clean_build/contracts/StrainNFTGenetics.json
  },
};


export function getAddresses(): { [name: string]: string } {
  return addresses[chainId];
}

export function getMulticallAddress(): string {
  const addresses = {
    1: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
    4: "0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821",
  };
  return addresses[chainId];
}
