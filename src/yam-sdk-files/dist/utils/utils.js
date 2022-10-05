"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const bn = ethers_1.ethers.BigNumber;
class Utils {
    static normalYam(amount) {
        return bn.from(amount).div(bn.from(10).pow(18)).toNumber();
    }
    static bouYam(amount) {
        return bn.from(amount).div(bn.from(10).pow(24)).toNumber();
    }
    static numberDecs(amount) {
        return Math.floor(Number(amount.toString()) / 10 ** 24);
    }
}
Utils.stateMap = {
    0: "Pending",
    1: "Active",
    2: "Canceled",
    3: "Defeated",
    4: "Succeeded",
    5: "Queued",
    6: "Expired",
    7: "Executed",
};
Utils.contractsNames = {
    "0x0e2298E3B3390e3b945a5456fBf59eCc3f55DA16": "yamv1",
    "0x1fB361f274f316d383B94D761832AB68099A7B00": "rebaser",
    "0xCF27cA116dd5C7b4201c75B46489D1c075362087": "reserves",
    "0x62702387C2a26C903985e9D078d18C45ACaE0908": "previous governor",
    "0x8b4f1616751117C38a0f84F9A146cca191ea3EC5": "timelock governance",
    "0xADDBCd6A68BFeb6E312e82B30cE1EB4a54497F4c": "ycrv pool",
    "0x5b0501F7041120d36Bc8c6DC3FAeA0b74b32a0Ed": "yusd farming",
    "0xAba8cAc6866B83Ae4eec97DD07ED254282f6aD8A": "yamv2",
    "0xf1d7c9E4c57a5C1902f4A4aE2630d2Da78Ffb1c1": "yamv1 yamv2 migrator",
    "0x0AaCfbeC6a24756c20D41914F2caba817C0d8521": "yamv3",
    "0x72CFEd9293cbFB2bfC7515c413048c697C6c811C": "migrator",
    "0x78BdD33e95ECbcAC16745FB28DB0FFb703344026": "second governor",
    "0x92ab5CCe7Af1605da2681458aE52a0BEc4eCB74C": "otc",
    "0x97990B693835da58A281636296D2Bf02787DEa17": "new reserves",
    "0xC32f9b0292965c5dd4A0Ea1abfcC1f5a36d66986": "dual governor old",
    "0x2DA253835967D6E721C6c077157F9c9742934aeA": "dual governor current",
    "0xD93f403b432d39aa0f736C2021bE6051d85a1D55": "eth rebaser",
    "0xD67c05523D8ec1c60760Fd017Ef006b9F6e496D0": "voting eth yam incentivizer",
    "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd": "master chef",
    "0x0F82E57804D0B1F6FAb2370A43dcFAd3c7cB239c": "sushiswap lp",
    "0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272": "sushi bar xsushi",
    "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2": "sushi token",
    "0xB93b505Ed567982E2b6756177ddD23ab5745f309": "index coop staking rewards",
    "0xDCf613db29E4d0B35e7e15e93BF6cc6315eB0b82": "vesting pool",
};
exports.default = Utils;
