import BigNumber from "bignumber.js/bignumber";
import Web3 from "web3";
import * as Types from "./types.js";
import { SUBTRACT_GAS_LIMIT, addressMap } from "./constants.js";

import ERC20Json from "../clean_build/contracts/IERC20.json";
import YAMv2Json from "../clean_build/contracts/YAMv2.json";
import YAMv2MigrationJson from "../clean_build/contracts/YAMv2Migration.json";
import YAMJson from "../clean_build/contracts/YAMDelegator.json";

import YAMRebaserJson from "../clean_build/contracts/YAMRebaser.json";
import YAMRebaser2Json from "../clean_build/contracts/YAMRebaser2.json";

import YAMReservesJson from "../clean_build/contracts/YAMReserves.json";
import YAMReserves2Json from "../clean_build/contracts/YAMReserves2.json";

import OTCJson from "../clean_build/contracts/OTC.json";

import YAMGovJson from "../clean_build/contracts/GovernorAlpha.json";
import DualGovJson from "../clean_build/contracts/DualGovernorAlpha.json";

import YAMTimelockJson from "../clean_build/contracts/Timelock.json";
import WETHJson from "./weth.json";
import SNXJson from "./snx.json";
import UNIFactJson from "./unifact2.json";
import UNIPairJson from "./uni2.json";
import UNIRouterJson from "./uniR.json";

import WETHPoolJson from "../clean_build/contracts/YAMETHPool.json";
import AMPLPoolJson from "../clean_build/contracts/YAMAMPLPool.json";
import YFIPoolJson from "../clean_build/contracts/YAMYFIPool.json";
import MKRPoolJson from "../clean_build/contracts/YAMMKRPool.json";
import LENDPoolJson from "../clean_build/contracts/YAMLENDPool.json";
import COMPPoolJson from "../clean_build/contracts/YAMCOMPPool.json";
import SNXPoolJson from "../clean_build/contracts/YAMSNXPool.json";
import LINKPoolJson from "../clean_build/contracts/YAMLINKPool.json";

import IncOldJson from "../clean_build/contracts/YAMIncentivizerOld.json";
import IncJson from "../clean_build/contracts/YAMIncentivizer.json";
import VotingIncJson from "../clean_build/contracts/YAMIncentivizerWithVoting.json";
import MasterChefJson from "../clean_build/contracts/MasterChef.json";
import SushiswapPoolJson from "../clean_build/contracts/SushiswapPool.json";
import SushiBarXSushiJson from "../clean_build/contracts/SushiBarXSushi.json";
import SushiTokenJson from "../clean_build/contracts/SushiToken.json";
import IndexStakingRewardsJson from "../clean_build/contracts/IndexStakingRewards.json";
import VestingPoolJson from "../clean_build/contracts/VestingPool.json";

import MigratorJson from "../clean_build/contracts/Migrator.json";
import YAMv3Json from "../clean_build/contracts/YAMDelegatorV3.json";
import YAMLogic2Json from "../clean_build/contracts/YAMDelegate2.json";

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    this.uni_pair = new this.web3.eth.Contract(UNIPairJson);
    this.uni_router = new this.web3.eth.Contract(UNIRouterJson);
    this.uni_fact = new this.web3.eth.Contract(UNIFactJson);
    this.yfi = new this.web3.eth.Contract(ERC20Json.abi);
    this.UNIAmpl = new this.web3.eth.Contract(ERC20Json.abi);
    this.ycrv = new this.web3.eth.Contract(ERC20Json.abi);
    this.yycrv = new this.web3.eth.Contract(ERC20Json.abi);
    this.yam = new this.web3.eth.Contract(YAMJson.abi);

    this.yfi_pool = new this.web3.eth.Contract(YFIPoolJson.abi);
    this.eth_pool = new this.web3.eth.Contract(WETHPoolJson.abi);
    this.ampl_pool = new this.web3.eth.Contract(AMPLPoolJson.abi);
    this.ycrv_pool = new this.web3.eth.Contract(IncOldJson.abi);
    this.yycrv_pool = new this.web3.eth.Contract(IncJson.abi);
    this.voting_eth_pool = new this.web3.eth.Contract(VotingIncJson.abi);
    this.masterchef = new this.web3.eth.Contract(MasterChefJson.abi);
    this.slp = new this.web3.eth.Contract(SushiswapPoolJson.abi);
    this.SushibarXSushi = new this.web3.eth.Contract(SushiBarXSushiJson.abi);
    this.SushiToken = new this.web3.eth.Contract(SushiTokenJson.abi);
    this.IndexStakingRewards = new this.web3.eth.Contract(IndexStakingRewardsJson.abi);
    this.VestingPool = new this.web3.eth.Contract(VestingPoolJson.abi);

    this.comp_pool = new this.web3.eth.Contract(COMPPoolJson.abi);
    this.link_pool = new this.web3.eth.Contract(LINKPoolJson.abi);
    this.lend_pool = new this.web3.eth.Contract(LENDPoolJson.abi);
    this.snx_pool = new this.web3.eth.Contract(SNXPoolJson.abi);
    this.mkr_pool = new this.web3.eth.Contract(MKRPoolJson.abi);

    this.comp = new this.web3.eth.Contract(ERC20Json.abi);
    this.link = new this.web3.eth.Contract(ERC20Json.abi);
    this.lend = new this.web3.eth.Contract(ERC20Json.abi);
    this.snx = new this.web3.eth.Contract(ERC20Json.abi);
    this.mkr = new this.web3.eth.Contract(ERC20Json.abi);
    this.yam_ycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi);
    this.yam_yycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi);

    this.erc20 = new this.web3.eth.Contract(ERC20Json.abi);
    this.pool = new this.web3.eth.Contract(LENDPoolJson.abi);

    this.yamV2 = new this.web3.eth.Contract(YAMv2Json.abi);
    this.yamV2migration = new this.web3.eth.Contract(YAMv2MigrationJson.abi);

    this.yamV3 = new this.web3.eth.Contract(YAMLogic2Json.abi);
    this.migrator = new this.web3.eth.Contract(MigratorJson.abi);

    this.rebaser = new this.web3.eth.Contract(YAMRebaserJson.abi);
    this.eth_rebaser = new this.web3.eth.Contract(YAMRebaser2Json.abi);
    this.reserves = new this.web3.eth.Contract(YAMReservesJson.abi);
    this.reserves2 = new this.web3.eth.Contract(YAMReserves2Json.abi);
    this.otc = new this.web3.eth.Contract(OTCJson.abi);
    this.gov = new this.web3.eth.Contract(YAMGovJson.abi);
    this.gov2 = new this.web3.eth.Contract(YAMGovJson.abi);
    this.gov3 = new this.web3.eth.Contract(DualGovJson.abi);
    this.gov4 = new this.web3.eth.Contract(DualGovJson.abi);
    this.timelock = new this.web3.eth.Contract(YAMTimelockJson.abi);
    this.weth = new this.web3.eth.Contract(WETHJson);
    this.setProvider(provider, networkId);
    this.setDefaultAccount(this.web3.eth.defaultAccount);
  }

  setProvider(provider, networkId) {
    this.yam.setProvider(provider);
    this.rebaser.setProvider(provider);
    this.reserves.setProvider(provider);
    this.gov.setProvider(provider);
    this.timelock.setProvider(provider);
    const contracts = [
      { contract: this.yam, json: YAMJson },
      { contract: this.rebaser, json: YAMRebaserJson },
      { contract: this.eth_rebaser, json: YAMRebaser2Json },
      { contract: this.reserves, json: YAMReservesJson },
      { contract: this.reserves2, json: YAMReserves2Json },
      { contract: this.gov, json: YAMGovJson },
      { contract: this.otc, json: OTCJson },
      { contract: this.timelock, json: YAMTimelockJson },
      { contract: this.ycrv_pool, json: IncOldJson },
      { contract: this.yycrv_pool, json: IncJson },
      { contract: this.eth_pool, json: WETHPoolJson },
      { contract: this.yfi_pool, json: YFIPoolJson },
      { contract: this.ampl_pool, json: AMPLPoolJson },
      { contract: this.snx_pool, json: SNXPoolJson },
      { contract: this.mkr_pool, json: MKRPoolJson },
      { contract: this.lend_pool, json: LENDPoolJson },
      { contract: this.link_pool, json: LINKPoolJson },
      { contract: this.comp_pool, json: COMPPoolJson },
      { contract: this.yamV2, json: YAMv2Json },
      { contract: this.yamV2migration, json: YAMv2MigrationJson },
      { contract: this.yamV3, json: YAMv3Json },
      { contract: this.migrator, json: MigratorJson },
      { contract: this.masterchef, json: MasterChefJson },
      { contract: this.slp, json: SushiswapPoolJson },
      { contract: this.SushibarXSushi, json: SushiBarXSushiJson },
      { contract: this.SushiToken, json: SushiTokenJson },
      { contract: this.IndexStakingRewards, json: IndexStakingRewardsJson },
      { contract: this.VestingPool, json: VestingPoolJson },
    ];

    contracts.forEach((contract) => this.setContractProvider(contract.contract, contract.json, provider, networkId));
    this.yfi.options.address = addressMap["YFI"];
    this.ycrv.options.address = addressMap["YCRV"];
    this.yycrv.options.address = addressMap["YYCRV"];
    this.weth.options.address = addressMap["WETH"];
    this.snx.options.address = addressMap["SNX"];
    this.comp.options.address = addressMap["COMP"];
    this.link.options.address = addressMap["LINK"];
    this.lend.options.address = addressMap["LEND"];
    this.mkr.options.address = addressMap["MKR"];
    this.UNIAmpl.options.address = addressMap["UNIAmpl"];
    this.uni_fact.options.address = addressMap["uniswapFactoryV2"];
    this.uni_router.options.address = addressMap["UNIRouter"];
    this.yam_ycrv_uni_lp.options.address = addressMap["YAMYCRV"];
    this.yam_yycrv_uni_lp.options.address = addressMap["YAMYYCRV"];
    this.gov2.options.address = "0x78BdD33e95ECbcAC16745FB28DB0FFb703344026";
    this.reserves2.options.address = "0x97990B693835da58A281636296D2Bf02787DEa17";
    this.otc.options.address = "0x92ab5CCe7Af1605da2681458aE52a0BEc4eCB74C";
    this.gov3.options.address = "0xC32f9b0292965c5dd4A0Ea1abfcC1f5a36d66986";
    this.gov4.options.address = "0x2da253835967d6e721c6c077157f9c9742934aea";
    this.voting_eth_pool.options.address = "0xD67c05523D8ec1c60760Fd017Ef006b9F6e496D0";
    this.eth_rebaser.options.address = "0xD93f403b432d39aa0f736C2021bE6051d85a1D55";
    this.masterchef.options.address = "0xc2edad668740f1aa35e4d8f227fb8e17dca888cd";
    this.slp.options.address = "0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c";
    this.SushibarXSushi.options.address = "0x8798249c2e607446efb7ad49ec89dd1865ff4272";
    this.SushiToken.options.address = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";
    this.IndexStakingRewards.options.address = "0xb93b505ed567982e2b6756177ddd23ab5745f309";
    this.VestingPool.options.address = "0xDCf613db29E4d0B35e7e15e93BF6cc6315eB0b82";

    this.pools = [
      {
        tokenAddr: this.yfi.options.address,
        poolAddr: this.yfi_pool.options.address,
      },
      {
        tokenAddr: this.snx.options.address,
        poolAddr: this.snx_pool.options.address,
      },
      {
        tokenAddr: this.weth.options.address,
        poolAddr: this.eth_pool.options.address,
      },
      {
        tokenAddr: this.comp.options.address,
        poolAddr: this.comp_pool.options.address,
      },
      {
        tokenAddr: this.link.options.address,
        poolAddr: this.link_pool.options.address,
      },
      {
        tokenAddr: this.lend.options.address,
        poolAddr: this.lend_pool.options.address,
      },
      {
        tokenAddr: this.mkr.options.address,
        poolAddr: this.mkr_pool.options.address,
      },
      {
        tokenAddr: this.UNIAmpl.options.address,
        poolAddr: this.ampl_pool.options.address,
      },
    ];

    this.names = {};
    this.names[this.yam.options.address] = "YAMv1";
    this.names[this.rebaser.options.address] = "Rebaser";
    this.names[this.reserves.options.address] = "Reserves";
    this.names[this.gov.options.address] = "Previous Governor";
    this.names[this.timelock.options.address] = "Timelock Governance";
    this.names[this.ycrv_pool.options.address] = "YCRV Pool";
    this.names[this.yycrv_pool.options.address] = "yUSD Farming";
    this.names[this.yamV2.options.address] = "YAMv2";
    this.names[this.yamV2migration.options.address] = "YAMv1-YAMv2 Migrator";
    this.names[this.yamV3.options.address] = "YAM (v3)";
    this.names[this.migrator.options.address] = "Migrator";
    this.names[this.gov2.options.address] = "Second Governor";
    this.names[this.otc.options.address] = "OTC";
    this.names[this.reserves2.options.address] = "New Reserves";
    this.names[this.gov3.options.address] = "Dual Governor (old)";
    this.names[this.gov4.options.address] = "Dual Governor (current)";
    this.names[this.eth_rebaser.options.address] = "ETH Rebaser";
    this.names[this.voting_eth_pool.options.address] = "Voting ETH/YAM Incentivizer";
    this.names[this.masterchef.options.address] = "Master Chef";
    this.names[this.slp.options.address] = "Sushiswap LP";
    this.names[this.SushibarXSushi.options.address] = "Sushi Bar XSushi";
    this.names[this.SushiToken.options.address] = "Sushi Token";
    this.names[this.IndexStakingRewards.options.address] = "INDEX Coop Staking Rewards";
    this.names[this.VestingPool.options.address] = "Vesting Pool";
  }

  setDefaultAccount(account) {
    this.yfi.options.from = account;
    this.ycrv.options.from = account;
    this.yam.options.from = account;
    this.weth.options.from = account;
  }

  async callContractFunction(method, options) {
    const { confirmations, confirmationType, autoGasMultiplier, ...txOptions } = options;

    if (!this.blockGasLimit) {
      await this.setGasLimit();
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice;
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate;
      if (this.defaultGas && confirmationType !== Types.ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas;
      } else {
        try {
          console.log("estimating gas");
          gasEstimate = await method.estimateGas(txOptions);
        } catch (error) {
          const data = method.encodeABI();
          const { from, value } = options;
          const to = method._parent._address;
          error.transactionData = { from, value, data, to };
          throw error;
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier;
        const totalGas = Math.floor(gasEstimate * multiplier);
        txOptions.gas = totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit;
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas;
        return { gasEstimate, g };
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0);
    } else {
      txOptions.value = "0";
    }

    const promi = method.send(txOptions);

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    };

    let hashOutcome = OUTCOMES.INITIAL;
    let confirmationOutcome = OUTCOMES.INITIAL;

    const t = confirmationType !== undefined ? confirmationType : this.confirmationType;

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`);
    }

    let hashPromise;
    let confirmationPromise;

    if (t === Types.ConfirmationType.Hash || t === Types.ConfirmationType.Both) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on("error", (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED;
            reject(error);
            const anyPromi = promi;
            anyPromi.off();
          }
        });

        promi.on("transactionHash", (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED;
            resolve(txHash);
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi;
              anyPromi.off();
            }
          }
        });
      });
    }

    if (t === Types.ConfirmationType.Confirmed || t === Types.ConfirmationType.Both) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on("error", (error) => {
          if ((t === Types.ConfirmationType.Confirmed || hashOutcome === OUTCOMES.RESOLVED) && confirmationOutcome === OUTCOMES.INITIAL) {
            confirmationOutcome = OUTCOMES.REJECTED;
            reject(error);
            const anyPromi = promi;
            anyPromi.off();
          }
        });

        const desiredConf = confirmations || this.defaultConfirmations;
        if (desiredConf) {
          promi.on("confirmation", (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED;
                resolve(receipt);
                const anyPromi = promi;
                anyPromi.off();
              }
            }
          });
        } else {
          promi.on("receipt", (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED;
            resolve(receipt);
            const anyPromi = promi;
            anyPromi.off();
          });
        }
      });
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise;
      if (this.notifier) {
        this.notifier.hash(transactionHash);
      }
      return { transactionHash };
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise;
    }

    const transactionHash = await hashPromise;
    if (this.notifier) {
      this.notifier.hash(transactionHash);
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    };
  }

  async callConstantContractFunction(method, options) {
    const m2 = method;
    const { blockNumber, ...txOptions } = options;
    return m2.call(txOptions, blockNumber);
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock("latest");
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT;
  }

  setContractProvider(contract, contractJson, provider, networkId) {
    contract.setProvider(provider);
    try {
      contract.options.address = contractJson.networks[networkId] && contractJson.networks[networkId].address;
    } catch (error) {
      // console.log(error)
    }
  }
}
