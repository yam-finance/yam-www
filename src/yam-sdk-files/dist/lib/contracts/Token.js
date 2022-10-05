"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamToken = void 0;
const ethers_1 = require("ethers");
const utils_1 = __importDefault(require("../../utils/utils"));
class YamToken {
    constructor(abi, signer) {
        this.abi = abi;
        this.signer = signer;
        this.contract = new ethers_1.ethers.Contract(this.abi.address, this.abi.abi, this.signer);
    }
    // Read functions
    /**
     * Get the name of yam on the token contract.
     * @returns {string} The name of the token contract.
     */
    async name() {
        return await this.contract.name();
    }
    /**
     * Get the symbol of yam token.
     * @returns {string} The symbol of the yam token.
     */
    async symbol() {
        return await this.contract.symbol();
    }
    /**
     * Get the decimals of yam token.
     * @returns {number} The decimals of yam token.
     */
    async decimals() {
        return await this.contract.decimals();
    }
    /**
     * Get the total supply of yam token.
     * @returns {number} The total supply of yam token.
     */
    async totalSupply() {
        return await this.contract.totalSupply();
    }
    /**
     * Get the signer balance.
     * @returns {number} The balance of the signer.
     */
    async balance() {
        return utils_1.default.normalYam(await this.contract.balanceOf(this.signer.getAddress()));
    }
    /**
     * Get the balance of an address.
     * @param {string} address - Wallet address.
     * @returns {number} The balance of the wallet address.
     */
    async balanceOf(address) {
        return await this.contract.balanceOf(address);
    }
    /**
     * Get the balance of underlying (BoU) of an address.
     * @param {string} address - Wallet address.
     * @returns {object} The balance of underlying of the wallet address.
     */
    async balanceOfUnderlying(address) {
        return await this.contract.balanceOfUnderlying(address);
    }
    /**
     * Get the current voting power of an address.
     * @param {string} address - Wallet address.
     * @returns {number} The voting power of the wallet address.
     */
    async getCurrentVotes(address) {
        return await this.contract.getCurrentVotes(address);
    }
    /**
     * Get the prior voting power of an address based of a blocknumber.
     * @param {string} address - Wallet address.
     * @param {number} blockNumber - Block number.
     * @returns {number} The voting power of the wallet address.
     */
    async getPriorVotes(address, blockNumber) {
        return await this.contract.getPriorVotes(address, blockNumber);
    }
    /**
     * Check the allowance of an address.
     * @param {string} ownerAddress - Owner wallet address.
     * @param {string} spenderAddress - Spender wallet address.
     * @returns {number} The allowance.
     */
    async allowance(ownerAddress, spenderAddress) {
        return await this.contract.allowance(ownerAddress, spenderAddress);
    }
}
exports.YamToken = YamToken;
