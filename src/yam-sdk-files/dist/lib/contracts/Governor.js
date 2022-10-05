"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamGovernor = void 0;
const ethers_1 = require("ethers");
const utils_1 = __importDefault(require("../../utils/utils"));
const bn = ethers_1.ethers.BigNumber;
const BASE24 = bn.from(10).pow(24);
class YamGovernor {
    constructor(abi, signer) {
        this.abi = abi;
        this.signer = signer;
        this.contract = new ethers_1.ethers.Contract(this.abi.address, this.abi.abi, this.signer);
    }
    // Read functions
    /**
     * Get the yam governor name from the governor contract.
     * @returns {string} The name of the governor contract.
     */
    async name() {
        return await this.contract.name();
    }
    /**
     * Get the voting period of the governor.
     * @returns {object} The voting period of the governor.
     */
    async votingPeriod() {
        return await this.contract.votingPeriod();
    }
    /**
     * Get onchain proposals.
     * Recent proposals starts from 11778137
     * @returns {object} All the onchain proposals of the governor.
     */
    async getProposals(fromBlock) {
        let proposalsData = [];
        const latestBlock = await this.contract.provider.getBlockNumber();
        const proposals = await this.contract.queryFilter("ProposalCreated", fromBlock, latestBlock);
        for (let i = 0; i < proposals.length; i++) {
            let id = proposals[i]["args"]["id"];
            let targets = [];
            let sigs = [];
            let inputs = [];
            for (let j = 0; j < proposals[i]["args"]["targets"].length; j++) {
                if (utils_1.default.contractsNames[proposals[i]["args"]["targets"][j]]) {
                    targets.push(utils_1.default.contractsNames[proposals[i]["args"]["targets"][j]]);
                }
                else {
                    targets.push(proposals[i]["args"]["targets"][j]);
                }
            }
            for (let j = 0; j < proposals[i]["args"]["signatures"].length; j++) {
                if (utils_1.default.contractsNames[proposals[i]["args"]["signatures"][j]]) {
                    sigs.push(utils_1.default.contractsNames[proposals[i]["args"]["signatures"][j]]);
                }
                else {
                    sigs.push(proposals[i]["args"]["signatures"][j]);
                }
            }
            for (let j = 0; j < proposals[i]["args"]["calldatas"].length; j++) {
                let abi_types;
                try {
                    abi_types = proposals[i]["args"]["signatures"][j]
                        .split("(")[1]
                        .split(")")
                        .slice(0, -1)[0]
                        .split(",");
                    if (abi_types[0] != "") {
                        let result = ethers_1.ethers.utils.defaultAbiCoder.decode(abi_types, proposals[i]["args"]["calldatas"][j]);
                        let fr = [];
                        for (let k = 0; k < result.__length__; k++) {
                            fr.push(result[k.toString()]);
                        }
                        inputs.push(fr);
                    }
                }
                catch (error) {
                    // console.log("Error parsing", error);
                }
            }
            proposalsData.push({
                id: id.toString(),
                gov: "gov4",
                hash: proposals[i]["transactionHash"],
                description: proposals[i]["args"]["description"],
                targets: targets,
                signatures: sigs,
                inputs: inputs,
                start: proposals[i]["args"]["startBlock"].toString(),
                end: proposals[i]["args"]["endBlock"].toString(),
                forVotes: 0,
                againstVotes: 0,
            });
        }
        return proposalsData;
    }
    /**
     * Get most recent onchain proposals.
     * @returns {object} The onchain proposals of the governor starting from block `11778137`.
     */
    async getRecentProposals() {
        return await this.getProposals(11778137);
    }
    /**
     * Get onchain proposal votes.
     * @returns {object} The `forVotes` and `againstVotes` of an onchain proposal.
     */
    async getProposalVotes(proposalId) {
        const proposal = await this.contract.proposals(proposalId);
        const forVotes = bn.from(proposal["forVotes"]).div(BASE24).toNumber();
        const againstVotes = bn
            .from(proposal["againstVotes"])
            .div(BASE24)
            .toNumber();
        return { forVotes, againstVotes };
    }
    /**
     * Get proposals state.
     * @returns {string} The state of the proposal in text.
     */
    async getProposalState(proposalId) {
        return utils_1.default.stateMap[await this.contract.state(proposalId)];
    }
    /**
     * Get proposals state number.
     * @returns {number} The state of the proposal in number.
     */
    async getProposalStateNumber(proposalId) {
        return await this.contract.state(proposalId);
    }
}
exports.YamGovernor = YamGovernor;
