"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamRedeemer = void 0;
const ethers_1 = require("ethers");
const Token_1 = require("./Token");
const bn = ethers_1.ethers.BigNumber;
const BASE24 = bn.from(10).pow(24);
const BASE18 = bn.from(10).pow(18);
const BASE6 = bn.from(10).pow(6);
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
    async previewRedeem(yamBalance) {
        const previewBalances = await this.contract.previewRedeem(yamBalance);
        const balances = {
            weth: (Number(bn.from(previewBalances === null || previewBalances === void 0 ? void 0 : previewBalances.amountsOut[0]).toString()) / (10 ** 18)).toFixed(2),
            usdc: (Number(bn.from(previewBalances === null || previewBalances === void 0 ? void 0 : previewBalances.amountsOut[1]).toString()) / (10 ** 6)).toFixed(2),
        };
        return balances;
    }
    // Write functions
    async redeem(address, amount) {
        return await this.contract.redeem(address, amount);
    }
}
exports.YamRedeemer = YamRedeemer;
