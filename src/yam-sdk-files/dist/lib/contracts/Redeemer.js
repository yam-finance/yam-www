"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamRedeemer = void 0;
const ethers_1 = require("ethers");
class YamRedeemer {
    constructor(abis, signer) {
        this.abis = abis;
        this.signer = signer;
        this.contract = new ethers_1.ethers.Contract(this.abis.redeemer.address, this.abis.redeemer.abi, this.signer);
    }
    async redeem(address, amount) {
        return await this.contract.redeem(address, amount);
    }
}
exports.YamRedeemer = YamRedeemer;
