"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamRedeemer = void 0;
const ethers_1 = require("ethers");
const Token_1 = require("./Token");
const bn = ethers_1.ethers.BigNumber;
class YamRedeemer {
    constructor(abis, signer) {
        this.abis = abis;
        this.signer = signer;
        this.contract = new ethers_1.ethers.Contract(this.abis.redeemer.address, this.abis.redeemer.abi, this.signer);
        this.address = this.abis.redeemer.address;
        this.yamToken = new Token_1.YamToken(this.abis, this.signer);
    }
    // Read functions
    async checkAllowance(addressOwner) {
        const allowance = await this.yamToken.allowance(addressOwner, this.abis.redeemer.address);
        console.log("allowance", allowance);
        return bn.from(allowance);
    }
    // Write functions
    async redeem(address, amount) {
        return await this.contract.redeem(address, amount);
    }
}
exports.YamRedeemer = YamRedeemer;
