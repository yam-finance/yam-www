import {
  ethers
} from "ethers";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import request from "request";
import {
  ContractIndexStaking,
  ContractIncentivizer,
  yamv3
} from "constants/tokenAddresses";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const GAS_LIMIT = {
  GENERAL: 510000,
  STAKING: {
    DEFAULT: 510000,
    SNX: 850000,
  },
};

const stateMap = {
  0: "Pending",
  1: "Active",
  2: "Canceled",
  3: "Defeated",
  4: "Succeeded",
  5: "Queued",
  6: "Expired",
  7: "Executed",
};

const knownSnapshots = {
  "0x110f2263e5adf63ea82514bbec3440762edefed1bdf4f0ee06a9458fc3e7e2e7": "https://snapshot.page/#/yamv2/proposal/QmTCXW2bhETiwHoDqeyxoDA4CwjURyfc6T4fAJLGz3yKj9",
  "0xad13b6cc77c781ee81529b3bcac2c2e81f588eede376fc9b2c75879cd20ffdc7": "https://snapshot.page/#/yam/proposal/QmVzvqJwnnEhnJGxDoKZNNkeRXvrmscrhwpLbZrQxw1mkf",
  "0xd00307c2982b4fba5790f238ff8df9faab975794dd4144eddbd30ac67eb873ed": "https://snapshot.page/#/yam/proposal/QmQxMTQkz7fW3AXma69ueEwhq5Sf8HNdUYseEFQFw3uKEx",
  "0xe4e06aae747e811b8de892c0c8b1ca78238b437a2893e78a3b1be91db608f75e": "https://snapshot.page/#/yam/proposal/Qmf6ECSwrmWqHNq6CRTtnFR66ZFhth4kBXTbRy24wcVzLg",
  "0x64c9c21c8fa9482456aaf0234e5deb07a06318a714434388b2c7bdc3336140a7": "https://snapshot.page/#/yam/proposal/QmPYUwtbqsAjQxHZJ6HzGMmrP22FDVhL81cz5X2yFAe7vG",
  "0x8fd235442f5edec67d5af587640115cc26b98ae04ab4a2212f0815d589d1ea80": "https://snapshot.page/#/yam/proposal/QmdPpHZZ5zpYmmM3SxGWmi8MCa8shPnmWvRGcsV1qkRUDJ",
  "0xb8392c2a230f3428e05e3874fd01306354b762da88e73e70482d48ad67e00834": "https://snapshot.page/#/yam/proposal/QmdPpHZZ5zpYmmM3SxGWmi8MCa8shPnmWvRGcsV1qkRUDJ",
};

const requestHttp = (url) => {
  return new Promise((resolve, reject) => {
    request({
        url: url,
        json: true,

      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const yamToFragment = async (yam, amount) => {
  let BASE24 = new BigNumber(10).pow(24);
  let scalingFactor = new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call());

  return amount.multipliedBy(scalingFactor).dividedBy(BASE24);
};

/**
 * Stake the lp tokens
 * @param yam - Yam object
 * @param amount - Amount of staking lp tokens
 * @param account - Address of user
 * @param poolContract - Object of farming contract
 * @param onTxHash - Display transaction hash
 * @public
 * @methods
  */
export const stake = async (yam, amount, account, poolContract, onTxHash) => {
  let now = new Date().getTime() / 1000;
  const gas = GAS_LIMIT.STAKING.DEFAULT;
  if (now >= 1597172400) {
    return poolContract.methods
      .stake(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({
        from: account,
        gas
      }, async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash("");
          console.log("Staking error", error);
          return false;
        }
        onTxHash && onTxHash(txHash);
        const status = await waitTransaction(yam.web3.eth, txHash);
        if (!status) {
          console.log("Staking transaction failed.");
          return false;
        }
        return true;
      });
  } else {
    alert("pool not active");
  }
};

/**
 * Unstake the lp tokens
 * @param yam - Yam object
 * @param amount - Amount of unstaking lp tokens
 * @param account - Address of user
 * @param poolContract - Object of farming contract
 * @param onTxHash - Display transaction hash
 * @public
 * @methods
  */
export const unstake = async (yam, amount, account, poolContract, onTxHash) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
      .send({
        from: account,
        gas: GAS_LIMIT.GENERAL
      }, async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash("");
          console.log("Unstaking error", error);
          return false;
        }
        onTxHash && onTxHash(txHash);
        const status = await waitTransaction(yam.web3.eth, txHash);
        if (!status) {
          console.log("Unstaking transaction failed.");
          return false;
        }
        return true;
      });
  } else {
    alert("pool not active");
  }
};

/**
 * Harvest reward
 * @param yam - Yam object
 * @param account - Address of user
 * @param poolContract - Object of farming contract
 * @param onTxHash - Display transaction hash
 * @public
 * @methods
  */
export const harvest = async (yam, account, poolContract, onTxHash) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods.getReward().send({
      from: account,
      gas: GAS_LIMIT.GENERAL
    }, async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Harvest error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(yam.web3.eth, txHash);
      if (!status) {
        console.log("Harvest transaction failed.");
        return false;
      }
      return true;
    });
  } else {
    alert("pool not active");
  }
};

/**
 * Redeem 
 * @param yam - Yam object
 * @param account - Address of user
 * @param poolContract - Object of farming contract
 * @param onTxHash - Display transaction hash
 * @public
 * @methods
  */
export const redeem = async (yam, account, poolContract, onTxHash) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods.exit().send({
      from: account,
      gas: GAS_LIMIT.GENERAL
    }, async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Redeem error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(yam.web3.eth, txHash);
      if (!status) {
        console.log("Redeem transaction failed.");
        return false;
      }
      return true;
    });
  } else {
    alert("pool not active");
  }
};

/**
 * Approve lp tokens 
 * @param tokenContract - Object of token contract
 * @param poolContract - Object of pool contract
 * @param account - Address of account
 * @public
 * @methods
  */
export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods.approve(poolContract.options.address, ethers.constants.MaxUint256).send({
    from: account,
    gas: 80000
  });
};

/**
 * Get objects of pool contracts
 * @param  yam - Yam object 
 * @returns Array of objects of pool contracts
 */
export const getPoolContracts = async (yam) => {
  const pools = Object.keys(yam.contracts)
    .filter((c) => c.indexOf("_pool") !== -1)
    .reduce((acc, cur) => {
      const newAcc = {
        ...acc
      };
      newAcc[cur] = yam.contracts[cur];
      return newAcc;
    }, {});
  return pools;
};

/**
 * Fetching earned amounts of reward 
 * @param  yam - Yam Object
 * @param  pool - Object of pool contract
 * @param  account - Address of user 
 * @returns Earned amount
 */
export const getEarned = async (yam, pool, account) => {
  const scalingFactor = new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call());
  const earned = new BigNumber(await pool.methods.earned(account).call());
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)));
};

/**
 * Fetching staked amount of lp tokens 
 * @param  yam - Yam Object
 * @param  pool - Object of pool contract
 * @param  account - Address of user 
 * @returns Staked amount
 */
export const getStaked = async (yam, pool, account) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call());
};

/**
 * Fetching current yam price
 * @returns current yam price
 */
export const getCurrentPrice = async () => {
  return  await getPriceByContract(yamv3);
};

export async function getContractInfo(address) {
  const data = await requestHttp(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`);
  return data;
};

/**
 * Fetching price by address
 * @param {*} address - Address of token
 * @param {*} toCurrency - Unit of currency
 * @returns Current price of a token
 */
export async function getPriceByContract(address, toCurrency) {
  const result = await getContractInfo(address);
  return result && result.market_data && result.market_data.current_price[toCurrency || "usd"];
}

/**
 * Get next rebasing timestamp
 * @param  yam - Yam object  
 * @returns secondsToRebase
 */
export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock("latest").then((res) => res.timestamp);
    let interval = 43200; // 12 hours
    let offset = 28800; // 8am/8pm utc
    let secondsToRebase = 0;
    if (await yam.contracts.eth_rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
        secondsToRebase = interval - (now % interval) + offset;
      } else {
        secondsToRebase = offset - (now % interval);
      }
    }
    return secondsToRebase;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Delegate yam to another address
 * @param {*} yam - Yam object 
 * @param {*} account - Address of user
 * @param {*} delegatee - Address of delegating 
 * @param {*} onTxHash - Displaying transaction hash
 * @returns 
 */
export const delegate = async (yam, account, delegatee, onTxHash) => {
  return yam.contracts.yamV3.methods.delegate(delegatee).send({ from: account, gas: 150000 }, async (error, txHash) => {
    if (error) {
      onTxHash && onTxHash("");
      console.log("Delegate error", error);
      return false;
    }
    onTxHash && onTxHash(txHash);
    const status = await waitTransaction(yam.web3.eth, txHash);
    if (!status) {
      console.log("Delegate transaction failed.");
      return false;
    }
    return true;
  });
};

/**
 * Delegate voting eth to another address
 * @param {*} yam - Yam object 
 * @param {*} account - Address of user
 * @param {*} delegatee - Address of delegating
 * @param {*} onTxHash - Displaying transaction hash
 * @returns 
 */
export const delegateStaked = async (yam, account, delegatee, onTxHash) => {
  return yam.contracts.voting_eth_pool.methods.delegate(delegatee).send({ from: account, gas: 150000 }, async (error, txHash) => {
    if (error) {
      onTxHash && onTxHash("");
      console.log("Delegate error", error);
      return false;
    }
    onTxHash && onTxHash(txHash);
    const status = await waitTransaction(yam.web3.eth, txHash);
    if (!status) {
      console.log("Delegate transaction failed.");
      return false;
    }
    return true;
  });
};

/**
 * Get delegated address
 * @param {*} yam - Yam object
 * @param {*} account - Address of user
 * @returns Delegated Address
 */
export const delegatedTo = async(yam, account) => {
  const emptyDelegation = '0x0000000000000000000000000000000000000000';
  const [unstaked, staked] = await Promise.allSettled([
    yam.contracts.yamV3.methods.delegates(account).call(),
    yam.contracts.voting_eth_pool.methods.delegates(account).call()
  ]);

  if(unstaked.value !== emptyDelegation) {
    return unstaked.value
  } else if(staked.value !== emptyDelegation) {
    return staked.value
  } else {
    return emptyDelegation;
  }
}

/**
 * Vote proposals
 * @param {*} yam - Yam object 
 * @param {*} proposal - proposal id
 * @param {*} side - boolean value of support
 * @param {*} account - Address of user
 * @param {*} onTxHash - Displaying transaction hash
 * @returns 
 */
export const vote = async (yam, proposal, side, account, onTxHash) => {
  return yam.contracts.gov4.methods.castVote(proposal, side).send({
    from: account,
    gas: 300000
  }, async (error, txHash) => {
    if (error) {
      onTxHash && onTxHash("");
      console.log("Vote error", error);
      return false;
    }
    onTxHash && onTxHash(txHash);
    const status = await waitTransaction(yam.web3.eth, txHash);
    if (!status) {
      console.log("Vote transaction failed.");
      return false;
    }
    return true;
  });
};

/**
 * Get proposals
 * @param {*} yam - Yam object 
 * @returns Array of proposals
 */
export const getProposals = async (yam) => {
  let BASE24 = new BigNumber(10).pow(24);

  const v1Proposals = await yam.contracts.gov.getPastEvents("ProposalCreated", {
    fromBlock: 10887059,
    toBlock: 10926022,
  });
  let proposals = [];
  for (let i = 0; i < v1Proposals.length; i++) {
    let id = v1Proposals[i]["returnValues"]["id"];
    let targets = [];
    for (let j = 0; j < v1Proposals[i]["returnValues"]["targets"].length; j++) {
      if (yam.contracts.names[v1Proposals[i]["returnValues"]["targets"][j]]) {
        targets.push(yam.contracts.names[v1Proposals[i]["returnValues"]["targets"][j]]);
      } else {
        targets.push(v1Proposals[i]["returnValues"]["targets"][j]);
      }
    }

    let sigs = [];
    for (let j = 0; j < v1Proposals[i]["returnValues"]["signatures"].length; j++) {
      if (yam.contracts.names[v1Proposals[i]["returnValues"]["signatures"][j]]) {
        sigs.push(yam.contracts.names[v1Proposals[i]["returnValues"]["signatures"][j]]);
      } else {
        sigs.push(v1Proposals[i]["returnValues"]["signatures"][j]);
      }
    }

    let ins = [];
    for (let j = 0; j < v1Proposals[i]["returnValues"]["calldatas"].length; j++) {
      let abi_types = v1Proposals[i]["returnValues"]["signatures"][j].split("(")[1].split(")").slice(0, -1)[0].split(",");
      let result = yam.web3.eth.abi.decodeParameters(abi_types, v1Proposals[i]["returnValues"]["calldatas"][j]);
      let fr = [];
      for (let k = 0; k < result.__length__; k++) {
        fr.push(result[k.toString()]);
      }
      ins.push(fr);
    }

    let proposal = await yam.contracts.gov.methods.proposals(id).call();
    let fv = new BigNumber(proposal["forVotes"]).div(BASE24);
    let av = new BigNumber(proposal["againstVotes"]).div(BASE24);
    let more;
    if (knownSnapshots[v1Proposals[i]["transactionHash"]]) {
      more = knownSnapshots[v1Proposals[i]["transactionHash"]];
    }

    proposals.push({
      gov: "gov",
      description: v1Proposals[i]["returnValues"]["description"],
      state: stateMap[await yam.contracts.gov.methods.state(id).call()],
      targets: targets,
      signatures: sigs,
      inputs: ins,
      forVotes: fv.toNumber(),
      againstVotes: av.toNumber(),
      id: id,
      start: v1Proposals[i]["returnValues"]["startBlock"],
      end: v1Proposals[i]["returnValues"]["endBlock"],
      hash: v1Proposals[i]["transactionHash"],
      more: more,
    });
  }
  const v2Proposals = await yam.contracts.gov2.getPastEvents("ProposalCreated", {
    fromBlock: 10926022,
    toBlock: 11258285
  });
  for (let i = 0; i < v2Proposals.length; i++) {
    let id = v2Proposals[i]["returnValues"]["id"];
    let targets = [];
    for (let j = 0; j < v2Proposals[i]["returnValues"]["targets"].length; j++) {
      if (yam.contracts.names[v2Proposals[i]["returnValues"]["targets"][j]]) {
        targets.push(yam.contracts.names[v2Proposals[i]["returnValues"]["targets"][j]]);
      } else {
        targets.push(v2Proposals[i]["returnValues"]["targets"][j]);
      }
    }

    let sigs = [];
    for (let j = 0; j < v2Proposals[i]["returnValues"]["signatures"].length; j++) {
      if (yam.contracts.names[v2Proposals[i]["returnValues"]["signatures"][j]]) {
        sigs.push(yam.contracts.names[v2Proposals[i]["returnValues"]["signatures"][j]]);
      } else {
        sigs.push(v2Proposals[i]["returnValues"]["signatures"][j]);
      }
    }

    let ins = [];
    for (let j = 0; j < v2Proposals[i]["returnValues"]["calldatas"].length; j++) {
      let abi_types;
      if (v2Proposals[i]["returnValues"]["signatures"][j]) {
        abi_types = v2Proposals[i]["returnValues"]["signatures"][j].split("(")[1].split(")").slice(0, -1)[0].split(",");
        if (abi_types[0] != "") {
          let result = yam.web3.eth.abi.decodeParameters(abi_types, v2Proposals[i]["returnValues"]["calldatas"][j]);
          let fr = [];
          for (let k = 0; k < result.__length__; k++) {
            fr.push(result[k.toString()]);
          }
          ins.push(fr);
        }
      }
    }

    let proposal = await yam.contracts.gov2.methods.proposals(id).call();
    let fv = new BigNumber(proposal["forVotes"]).div(BASE24);
    let av = new BigNumber(proposal["againstVotes"]).div(BASE24);

    let more;
    if (knownSnapshots[v2Proposals[i]["transactionHash"]]) {
      more = knownSnapshots[v2Proposals[i]["transactionHash"]];
    }

    proposals.push({
      gov: "gov2",
      description: v2Proposals[i]["returnValues"]["description"],
      state: stateMap[await yam.contracts.gov2.methods.state(id).call()],
      targets: targets,
      signatures: sigs,
      inputs: ins,
      forVotes: fv.toNumber(),
      againstVotes: av.toNumber(),
      id: id,
      start: v2Proposals[i]["returnValues"]["startBlock"],
      end: v2Proposals[i]["returnValues"]["endBlock"],
      hash: v2Proposals[i]["transactionHash"],
      more: more,
    });
  }

  const v3Proposals = await yam.contracts.gov3.getPastEvents("ProposalCreated", {
    fromBlock: 11185996,
    toBlock: 11797475
  });
  for (let i = 0; i < v3Proposals.length; i++) {
    let id = v3Proposals[i]["returnValues"]["id"];
    let targets = [];
    for (let j = 0; j < v3Proposals[i]["returnValues"]["targets"].length; j++) {
      if (yam.contracts.names[v3Proposals[i]["returnValues"]["targets"][j]]) {
        targets.push(yam.contracts.names[v3Proposals[i]["returnValues"]["targets"][j]]);
      } else {
        targets.push(v3Proposals[i]["returnValues"]["targets"][j]);
      }
    }

    let sigs = [];
    for (let j = 0; j < v3Proposals[i]["returnValues"]["signatures"].length; j++) {
      if (yam.contracts.names[v3Proposals[i]["returnValues"]["signatures"][j]]) {
        sigs.push(yam.contracts.names[v3Proposals[i]["returnValues"]["signatures"][j]]);
      } else {
        sigs.push(v3Proposals[i]["returnValues"]["signatures"][j]);
      }
    }

    let ins = [];
    for (let j = 0; j < v3Proposals[i]["returnValues"]["calldatas"].length; j++) {
      let abi_types;
      try {
        abi_types = v3Proposals[i]["returnValues"]["signatures"][j].split("(")[1].split(")").slice(0, -1)[0].split(",");
        if (abi_types[0] != "") {
          let result = yam.web3.eth.abi.decodeParameters(abi_types, v3Proposals[i]["returnValues"]["calldatas"][j]);
          let fr = [];
          for (let k = 0; k < result.__length__; k++) {
            fr.push(result[k.toString()]);
          }
          ins.push(fr);
        }
      } catch (e) {
        console.log("Error parsing prop", e);
      }
    }

    let proposal = await yam.contracts.gov3.methods.proposals(id).call();
    let fv = new BigNumber(proposal["forVotes"]).div(BASE24);
    let av = new BigNumber(proposal["againstVotes"]).div(BASE24);

    let more;
    if (knownSnapshots[v3Proposals[i]["transactionHash"]]) {
      more = knownSnapshots[v3Proposals[i]["transactionHash"]];
    }

    proposals.push({
      gov: "gov3",
      description: v3Proposals[i]["returnValues"]["description"],
      state: stateMap[await yam.contracts.gov3.methods.state(id).call()],
      targets: targets,
      signatures: sigs,
      inputs: ins,
      forVotes: fv.toNumber(),
      againstVotes: av.toNumber(),
      id: id,
      start: v3Proposals[i]["returnValues"]["startBlock"],
      end: v3Proposals[i]["returnValues"]["endBlock"],
      hash: v3Proposals[i]["transactionHash"],
      more: more,
    });
  }

  const v4Proposals = await yam.contracts.gov4.getPastEvents("ProposalCreated", {
    fromBlock: 11778137,
    toBlock: "latest"
  });
  for (let i = 0; i < v4Proposals.length; i++) {
    let id = v4Proposals[i]["returnValues"]["id"];
    let targets = [];
    for (let j = 0; j < v4Proposals[i]["returnValues"]["targets"].length; j++) {
      if (yam.contracts.names[v4Proposals[i]["returnValues"]["targets"][j]]) {
        targets.push(yam.contracts.names[v4Proposals[i]["returnValues"]["targets"][j]]);
      } else {
        targets.push(v4Proposals[i]["returnValues"]["targets"][j]);
      }
    }

    let sigs = [];
    for (let j = 0; j < v4Proposals[i]["returnValues"]["signatures"].length; j++) {
      if (yam.contracts.names[v4Proposals[i]["returnValues"]["signatures"][j]]) {
        sigs.push(yam.contracts.names[v4Proposals[i]["returnValues"]["signatures"][j]]);
      } else {
        sigs.push(v4Proposals[i]["returnValues"]["signatures"][j]);
      }
    }

    let ins = [];
    for (let j = 0; j < v4Proposals[i]["returnValues"]["calldatas"].length; j++) {
      let abi_types;
      try {
        abi_types = v4Proposals[i]["returnValues"]["signatures"][j].split("(")[1].split(")").slice(0, -1)[0].split(",");
        if (abi_types[0] != "") {
          let result = yam.web3.eth.abi.decodeParameters(abi_types, v4Proposals[i]["returnValues"]["calldatas"][j]);
          let fr = [];
          for (let k = 0; k < result.__length__; k++) {
            fr.push(result[k.toString()]);
          }
          ins.push(fr);
        }
      } catch (e) {
        console.log("Error parsing prop", e);
      }
    }
    let proposal = await yam.contracts.gov4.methods.proposals(id).call();
    console.log(proposal)
    let fv = new BigNumber(proposal["forVotes"]).div(BASE24);
    let av = new BigNumber(proposal["againstVotes"]).div(BASE24);

    let more;
    if (knownSnapshots[v4Proposals[i]["transactionHash"]]) {
      more = knownSnapshots[v4Proposals[i]["transactionHash"]];
    }

    proposals.push({
      gov: "gov4",
      description: v4Proposals[i]["returnValues"]["description"],
      state: stateMap[await yam.contracts.gov4.methods.state(id).call()],
      targets: targets,
      signatures: sigs,
      inputs: ins,
      forVotes: fv.toNumber(),
      againstVotes: av.toNumber(),
      id: id,
      start: v4Proposals[i]["returnValues"]["startBlock"],
      end: v4Proposals[i]["returnValues"]["endBlock"],
      hash: v4Proposals[i]["transactionHash"],
      more: more,
    });
  }
  // proposals[1].state = "Active"
  // proposals[0].state = "Active"
  return proposals;
};

/**
 * Get voting power of user
 * @param {*} yam - Yam object
 * @param {*} proposals - Array of proposal ids
 * @param {*} account - Address of user
 * @returns 
 */
export const getVotingPowers = async (yam, proposals, account) => {
  let BASE24 = new BigNumber(10).pow(24);
  let powers = [];
  for (let i = 0; i < proposals.length; i++) {
    if (proposals[i].gov === "gov") {
      let receipt = await yam.contracts.gov.methods.getReceipt(proposals[i].id, account).call();
      let power = new BigNumber(receipt[2]).div(BASE24).toNumber();
      if (power == 0) {
        power = new BigNumber(await yam.contracts.yamV3.methods.getPriorVotes(account, proposals[i].start).call()).div(BASE24).toNumber();
      }
      powers.push({
        hash: proposals[i].hash,
        power: power,
        voted: receipt[0],
        side: receipt[1],
      });
    } else if (proposals[i].gov === "gov2") {
      let receipt = await yam.contracts.gov2.methods.getReceipt(proposals[i].id, account).call();
      let power = new BigNumber(receipt[2]).div(BASE24).toNumber();
      if (power == 0) {
        power = new BigNumber(await yam.contracts.yamV3.methods.getPriorVotes(account, proposals[i].start).call()).div(BASE24).toNumber();
      }
      powers.push({
        hash: proposals[i].hash,
        power: power,
        voted: receipt[0],
        side: receipt[1],
      });
    } else if (proposals[i].gov === "gov3") {
      let receipt = await yam.contracts.gov3.methods.getReceipt(proposals[i].id, account).call();
      let power = new BigNumber(receipt[2]).div(BASE24).toNumber();
      if (power == 0) {
        power = new BigNumber(await yam.contracts.gov3.methods.getPriorVotes(account, proposals[i].start).call()).div(BASE24).toNumber();
      }
      powers.push({
        hash: proposals[i].hash,
        power: power,
        voted: receipt[0],
        side: receipt[1],
      });
    } else {
      let receipt = await yam.contracts.gov4.methods.getReceipt(proposals[i].id, account).call();
      let power = new BigNumber(receipt[2]).div(BASE24).toNumber();
      if (power == 0) {
        power = new BigNumber(await yam.contracts.gov4.methods.getPriorVotes(account, proposals[i].start).call()).div(BASE24).toNumber();
      }
      powers.push({
        hash: proposals[i].hash,
        power: power,
        voted: receipt[0],
        side: receipt[1],
      });
    }
  }
  return powers;
};

/**
 * Get current votes of user
 * @param {*} yam - Yam object 
 * @param {*} account - Address of user
 * @returns current votes number of user
 */
export const getCurrentVotingPower = async (yam, account) => {
  let BASE24 = new BigNumber(10).pow(24);
  return new BigNumber(await yam.contracts.yamV3.methods.getCurrentVotes(account).call()).dividedBy(BASE24).toNumber();
};

/**
 * Get scaling factor
 * @param {*} yam - Yam object 
 * @returns 
 */
export const getScalingFactor = async (yam) => {
  return new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call());
};


/**
 * Get current vested number of user
 * @param {*} yam - Yam object
 * @param {*} account - Address of user 
 * @returns 
 */
export const currVested = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);

  let vested = new BigNumber(await yam.contracts.migrator.methods.vested(account).call());
  let amt = await yamToFragment(yam, vested);
  return amt.dividedBy(BASE);
};

/**
 * Get current unclimed delegator rewards
 * @param {*} yam - Yam object 
 * @param {*} account - Address of user
 * @returns 
 */
export const currUnclaimedDelegatorRewards = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);
  let start = new BigNumber(1600444800);
  let duration = new BigNumber(90 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1);
  }
  let totalVesting = new BigNumber(await yam.contracts.migrator.methods.delegator_vesting(account).call());
  let claimed = new BigNumber(await yam.contracts.migrator.methods.delegator_claimed(account).call());
  let unclaimed = totalVesting.multipliedBy(percDone).minus(claimed);
  let amt = await yamToFragment(yam, unclaimed);
  return amt.dividedBy(BASE);
};
/**
 * Get current unclaimed migrator vesting amount
 * @param {*} yam - Yam object
 * @param {*} account - Address of user
 * @returns 
 */
export const currUnclaimedMigratorVesting = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);
  let start = new BigNumber(1600444800);
  let duration = new BigNumber(30 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1);
  }
  let totalVesting = new BigNumber(await yam.contracts.migrator.methods.vesting(account).call());
  let claimed = new BigNumber(await yam.contracts.migrator.methods.claimed(account).call());
  let unclaimed = totalVesting.multipliedBy(percDone).minus(claimed);
  let amt = await yamToFragment(yam, unclaimed);
  return amt.dividedBy(BASE);
};

/**
 * Migrate to yamv3
 * @param {*} yam - Yam object
 * @param {*} account - Address of user
 * @param {*} onTxHash - Display transaction hash
 * @returns 
 */
export const migrateV3 = async (yam, account, onTxHash) => {
  return await yam.contracts.migrator.methods.migrate().send({
    from: account,
    gas: 250000
  }, async (error, txHash) => {
    if (error) {
      onTxHash && onTxHash("");
      console.log("Migration error", error);
      return false;
    }
    onTxHash && onTxHash(txHash);
    const status = await waitTransaction(yam.web3.eth, txHash);
    if (!status) {
      console.log("Migration transaction failed.");
      return false;
    }
    return true;
  });
};
/**
 * Claim vested amount
 * @param {*} yam - Yam Object 
 * @param {*} account - Address of account
 * @param {*} onTxHash - Displaying transaction hash
 * @returns 
 */
export const claimVested = async (yam, account, onTxHash) => {
  return await yam.contracts.migrator.methods.claimVested().send({
    from: account,
    gas: 140000
  });
};
/**
 * Fetch treasury events
 * @param {*} yam - Yam object
 * @returns 
 */
export const treasuryEvents = async (yam) => {
  let BASE = new BigNumber(10).pow(18);
  let rebases = await yam.contracts.rebaser.getPastEvents("TreasuryIncreased", {
    fromBlock: 10886913,
    toBlock: 11199322 + 4000,
  });
  rebases.push(
    ...(await yam.contracts.eth_rebaser.getPastEvents("TreasuryIncreased", {
      fromBlock: 11185822,
      toBlock: "latest",
    }))
  );
  let reservesAdded = [];
  let yamsSold = [];
  let yamsFromReserves = [];
  let yamsToReserves = [];
  let blockNumbers = [];
  let blockTimes = [];
  for (let i = 0; i < rebases.length; i++) {
    // const block = await yam.web3.eth.getBlock(rebases[i]["blockNumber"])
    // blockNumbers.push(block.blockNumber);
    // blockTimes.push(block.timestamp);
    blockNumbers.push(rebases[i]["blockNumber"]);
    reservesAdded.push(Math.round(new BigNumber(rebases[i]["returnValues"]["reservesAdded"]).div(BASE).toNumber() * 100) / 100);
    yamsSold.push(Math.round(new BigNumber(rebases[i]["returnValues"]["yamsSold"]).div(BASE).toNumber() * 100) / 100);
    yamsFromReserves.push(Math.round(new BigNumber(rebases[i]["returnValues"]["yamsFromReserves"]).div(BASE).toNumber() * 100) / 100);
    yamsToReserves.push(Math.round(new BigNumber(rebases[i]["returnValues"]["yamsToReserves"]).div(BASE).toNumber() * 100) / 100);
  }
  return {
    reservesAdded: reservesAdded,
    yamsSold: yamsSold,
    yamsFromReserves: yamsFromReserves,
    yamsToReserves: yamsToReserves,
    blockNumbers: blockNumbers,
    blockTimes: blockTimes,
  };
};

/**
 * Fetch tvl
 * @param {*} yam - Yam object
 * @returns 
 */
export const getTVL = async (yam) => {
  const BASE = new BigNumber(10).pow(18);
  const yamPrice = await getCurrentPrice();
  const wethPrice = await getPriceByName('weth');
  const totalIncentivizerValue = (await yam.contracts.masterchef.methods.userInfo(44, ContractIncentivizer).call()).amount;
  const totalSLPSupply = await yam.contracts.slp.methods.totalSupply().call();
  const totalSLPReserves = await yam.contracts.slp.methods.getReserves().call();
  const Yamvalue = new BigNumber(totalSLPReserves._reserve0).dividedBy(BASE).toNumber();
  const ETHvalue = new BigNumber(totalSLPReserves._reserve1).dividedBy(BASE).toNumber();
  return Math.round((totalIncentivizerValue / totalSLPSupply) * (ETHvalue * wethPrice + Yamvalue * yamPrice) * 1) / 1;
};
/**
 * Calculate indexcooplp
 * @param {*} yam - Yam object
 * @returns 
 */
export const getIndexCoopLP = async (yam) => {
  const BASE = new BigNumber(10).pow(18);
  try {
    const lpBalance = await yam.contracts.IndexStakingRewards.methods.balanceOf(ContractIndexStaking).call();
    return new BigNumber(lpBalance).dividedBy(BASE).toNumber();
  } catch (e) {
    console.log(e);
  }
};
/**
 * Calculate indexcooplp rewards
 * @param {*} yam - Yam object
 * @returns 
 */
export const getIndexCoopLPRewards = async (yam) => {
  const BASE = new BigNumber(10).pow(18);
  try {
    const lpBalanceRewards = await yam.contracts.IndexStakingRewards.methods.earned(ContractIndexStaking).call();
    return new BigNumber(lpBalanceRewards).dividedBy(BASE).toNumber();
  } catch (e) {
    console.log(e);
  }
};

/**
 * Get shshirewards
 * @param {*} yam - Yam object 
 * @returns 
 */
export const getSushiRewards = async (yam) => {
  const BASE = new BigNumber(10).pow(18);
  const incentivizerBalance = new BigNumber(await yam.contracts.SushibarXSushi.methods.balanceOf(ContractIncentivizer).call())
    .dividedBy(BASE)
    .toNumber();
  const xSushiTotalSupply = new BigNumber(await yam.contracts.SushibarXSushi.methods.totalSupply().call()).dividedBy(BASE).toNumber();
  const sushiXSushiBalance = new BigNumber(await yam.contracts.SushiToken.methods.balanceOf(yam.contracts.SushibarXSushi.options.address).call())
    .dividedBy(BASE)
    .toNumber();
  const SushiBalance = new BigNumber(await yam.contracts.SushiToken.methods.balanceOf(ContractIncentivizer).call()).dividedBy(BASE).toNumber();
  return (incentivizerBalance * sushiXSushiBalance) / xSushiTotalSupply + SushiBalance;
};



export const waitTransaction = async (provider, txHash) => {
  const web3 = new Web3(provider);
  let txReceipt = null;
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash);
    txReceipt = r;
    await sleep(2000);
  }
  return txReceipt.status;
};
/**
 * Get current block number 
 * @param {*} yam - Yam object
 * @returns 
 */
export const getCurrentBlock = async (yam) => {
  try {
    return await yam.web3.eth.getBlock("latest");
  } catch (e) {
    console.log(e);
  }
};

/**
 * Get contributor vesting data
 * @param {*} yam - Yam object 
 * @param {*} contributor Contributor information(key: address, value: id and amount)
 * @returns 
 */
export const getContributorVestingData = async (yam, contributor) => {
  try {
    let BASE24 = new BigNumber(10).pow(24);
    const vestingDataAvailable = await yam.contracts.VestingPool.methods.claimable(contributor.id).call();
    const vestingData = await yam.contracts.VestingPool.methods.streams(contributor.id).call();
    const totalAmount = Number(new BigNumber(vestingData.totalAmount).dividedBy(BASE24).toString()) || 0;
    const amountPaidOut = Number(new BigNumber(vestingData.amountPaidOut).dividedBy(BASE24).toString()) || 0;
    const availableClaim = Number(new BigNumber(vestingDataAvailable).dividedBy(BASE24).toString()) || 0;
    const result = {
      totalClaimed: amountPaidOut * 2.5,
      availableClaim: availableClaim * 2.5,
      availableClaimOver: (totalAmount - amountPaidOut) * 2.5,
      totalAmount,
      amountPaidOut,
    };
    console.log("contributor", contributor);
    console.debug("result", result);
    return result;
  } catch (e) {
    // console.log(e);
  }
};
/**
 * Claim vested tokens of contributor
 * @param {*} yam - Yam object
 * @param {*} account - Address of user
 * @param {*} contributor - Contributor information(key: address, value: id and amount)
 * @returns 
 */
export const claimContributorVestedTokens = async (yam, account, contributor) => {
  console.log("account, accountId", account, contributor)
  return yam.contracts.VestingPool.methods.payout(contributor.id).send({
    from: account,
    gas: 200000
  });
};

export const getDPIMarketCap = async (from, to) => {
  const data = await requestHttp(
    "https://api.coingecko.com/api/v3/coins/defipulse-index/market_chart/range?vs_currency=usd&from=" + from + "&to=" + to
  );
  return data.market_caps;
};

export const getYam = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/yam-2");
  return data;
};

export const getMaxSupply = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/yam-2");
  return data.market_data.max_supply;
};

export const getValue = async (asset_name) => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/" + asset_name);
  return data;
};

export const getYam30D = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/yam-2/market_chart?vs_currency=usd&days=30&interval=daily");
  return data.prices;
};

export const getYamHousePrice = async () => {
  const data = await requestHttp("https://api.tokensets.com/public/v2/portfolios/yamhouse");
  return data.portfolio.price_usd;
}

export const getTreasuryAsset = async () => {
  const data = await requestHttp("https://api.yam.finance/treasury");
  return data;
};
/**
 * Get asset price by name
 * @param {*} asset_name - name of asset
 * @returns 
 */
export const getPriceByName = async (asset_name) => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/" + asset_name);
  return data.market_data.current_price.usd;
};