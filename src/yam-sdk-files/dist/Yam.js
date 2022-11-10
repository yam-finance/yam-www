"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yam = void 0;
const Token_1 = require("./lib/contracts/Token");
const Governor_1 = require("./lib/contracts/Governor");
const Redeemer_1 = require("./lib/contracts/Redeemer");
const yam_json_1 = __importDefault(require("./utils/abis/yam.json"));
const governor_json_1 = __importDefault(require("./utils/abis/governor.json"));
const timelock_json_1 = __importDefault(require("./utils/abis/timelock.json"));
const incentivizer_json_1 = __importDefault(require("./utils/abis/incentivizer.json"));
const migrator_json_1 = __importDefault(require("./utils/abis/migrator.json"));
const redeemer_json_1 = __importDefault(require("./utils/abis/redeemer.json"));
const tokens_1 = __importDefault(require("./utils/tokens"));
class Yam {
    // config!: any;
    // read!: any;
    // write!: any;
    /**
     * Initialize the SDK instance.
     * @param params - Parameters the SDK takes on creation { provider, signer }
     */
    constructor(params) {
        this.signer = params.signer || params.provider.getSigner();
        this.provider = params.provider;
        this.chainId = this.getChainId();
        this.tokens = tokens_1.default;
        this.abis = {
            token: yam_json_1.default,
            governor: governor_json_1.default,
            timelock: timelock_json_1.default,
            incentivizer: incentivizer_json_1.default,
            migrator: migrator_json_1.default,
            redeemer: redeemer_json_1.default,
        };
        this.contracts = {
            token: new Token_1.YamToken(this.abis, this.signer),
            governor: new Governor_1.YamGovernor(this.abis, this.signer),
            redeemer: new Redeemer_1.YamRedeemer(this.abis, this.signer),
        };
        this.loaded = Promise.all([]);
    }
    async getChainId() {
        return await this.signer.getChainId();
    }
    async checkYam() {
        return 200 * 10 ** 24;
    }
}
exports.Yam = Yam;
