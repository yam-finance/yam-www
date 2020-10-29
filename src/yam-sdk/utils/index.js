import {ethers} from 'ethers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import request from "request";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  }
};


const knownSnapshots = {
  "0x110f2263e5adf63ea82514bbec3440762edefed1bdf4f0ee06a9458fc3e7e2e7": "https://snapshot.page/#/yamv2/proposal/QmTCXW2bhETiwHoDqeyxoDA4CwjURyfc6T4fAJLGz3yKj9",
  "0xad13b6cc77c781ee81529b3bcac2c2e81f588eede376fc9b2c75879cd20ffdc7" : "https://snapshot.page/#/yam/proposal/QmVzvqJwnnEhnJGxDoKZNNkeRXvrmscrhwpLbZrQxw1mkf",
  "0xd00307c2982b4fba5790f238ff8df9faab975794dd4144eddbd30ac67eb873ed" : "https://snapshot.page/#/yam/proposal/QmQxMTQkz7fW3AXma69ueEwhq5Sf8HNdUYseEFQFw3uKEx",
  "0xe4e06aae747e811b8de892c0c8b1ca78238b437a2893e78a3b1be91db608f75e" : "https://snapshot.page/#/yam/proposal/Qmf6ECSwrmWqHNq6CRTtnFR66ZFhth4kBXTbRy24wcVzLg"

}

export const getPoolStartTime = async (poolContract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (yam, amount, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  // const gas = GAS_LIMIT.STAKING[tokenName.toUpperCase()] || GAS_LIMIT.STAKING.DEFAULT;
  const gas = GAS_LIMIT.STAKING.DEFAULT
  if (now >= 1597172400) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
      .send({ from: account, gas }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Staking error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Staking transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (yam, amount, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
      .send({ from: account, gas: 200000 }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Unstaking error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Unstaking transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (yam, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .getReward()
      .send({ from: account, gas: 200000 }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Harvest error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Harvest transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (yam, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .exit()
      .send({ from: account, gas: 400000 }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Redeem error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Redeem transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gas: 80000 })
}

export const getPoolContracts = async (yam) => {
  const pools = Object.keys(yam.contracts)
    .filter(c => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = yam.contracts[cur]
      return newAcc
    }, {})
  return pools
}

export const getEarned = async (yam, pool, account) => {
  const scalingFactor = new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call())
  const earned = new BigNumber(await pool.methods.earned(account).call())
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)))
}

export const getStaked = async (yam, pool, account) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call())
}

export const getCurrentPrice = async (yam) => {
  // FORBROCK: get current YAM price
  return new BigNumber(await yam.contracts.rebaser.methods.getCurrentTWAP().call())
}

export const getTargetPrice = async (yam) => {
  return yam.toBigN(1).toFixed(2);
}

export const getProjectedRebase = async (yam) => {
  let projected_rebase_perc = await getProjectedRebasePercent(yam);
  if(projected_rebase_perc==0)
    return 0;
  let total_supply = new BigNumber(await getMaxSupply());
  return total_supply.dividedBy(100).times(projected_rebase_perc).toNumber();
}

export const getProjectedRebasePercent = async (yam) =>{
  let BASE = new BigNumber(10).pow(18);
  let twap = (await getCurrentPrice(yam)).dividedBy(BASE);
  if(twap.isGreaterThanOrEqualTo(0.95) && twap.isLessThanOrEqualTo(1.05))
    return 0;
  let target_price = await getTargetPrice(yam);
  let rebase_lag = await getRebaseLag(yam);
  let deviation = twap.minus(target_price).dividedBy(target_price);
  return deviation.dividedBy(rebase_lag).times(100).toNumber();
}

export const getProjectedMint = async (yam) => {
  let rebase = await getProjectedRebase(yam);
  let mint_percent = await getProjectedMintPercent(yam);
  return rebase<=0? 0:(rebase * mint_percent/100);
}

export const getProjectedMintPercent = async (yam, rebaseType) => {
  let BASE = new BigNumber(10).pow(18);
  if(!rebaseType) {
    return 0;
  }
  return new BigNumber(await yam.contracts.rebaser.methods.rebaseMintPerc().call()).div(BASE).times(100).toNumber();
}

export const getRebaseLag = async(yam) =>{
  return await yam.contracts.rebaser.methods.rebaseLag().call();
}

export const getCirculatingSupply = async (yam) => {
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.yamV3.methods.yamsScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.eth_pool.methods.starttime().call()).toNumber();
  let timePassed = now["timestamp"] - starttime;
  if (timePassed < 0) {
    return 0;
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  let starttimePool2 = yam.toBigN(await yam.contracts.ycrv_pool.methods.starttime().call()).toNumber();
  timePassed = now["timestamp"] - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).dividedBy(10**36).toFixed(2)
  return circulating
}

export const getLastRebaseTimestamp = async (yam) => {
  try {
    const lastTimestamp = yam.toBigN(await yam.contracts.rebaser.methods.lastRebaseTimestampSec().call()).toNumber()
    return lastTimestamp
  } catch (e) {
    console.log(e)
  }
}

export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock('latest').then(res => res.timestamp);
    let interval = 43200; // 12 hours
    let offset = 28800; // 8am/8pm utc
    let secondsToRebase = 0;
    if (await yam.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
          secondsToRebase = (interval - (now % interval)) + offset;
       } else {
          secondsToRebase = offset - (now % interval);
      }
    }
    return secondsToRebase
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (yam) => {
  return await yam.contracts.yam.methods.totalSupply().call();
}

export const getStats = async (yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply
  }
}

export const delegate = async (yam, account, onTxHash) => {
  return yam.contracts.yamV3.methods.delegate(account).send({from: account, gas: 150000 }, async (error, txHash) => {
    if (error) {
        onTxHash && onTxHash('')
        console.log("Delegate error", error)
        return false
    }
    onTxHash && onTxHash(txHash)
    const status = await waitTransaction(yam.web3.eth, txHash)
    if (!status) {
      console.log("Delegate transaction failed.")
      return false
    }
    return true
  })
}

export const didDelegate = async (yam, account) => {
  return await yam.contracts.yamV3.methods.delegates(account).call() === account
}

export const vote = async (yam, proposal, side, account, onTxHash) => {
  return yam.contracts.gov2
    .methods
    .castVote(proposal, side).send(
      {from: account, gas: 130000 },
      async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Vote error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Vote transaction failed.")
          return false
        }
        return true
      })
}

const stateMap = {
  0: "Pending",
  1: "Active",
  2: "Canceled",
  3: "Defeated",
  4: "Succeeded",
  5: "Queued",
  6: "Expired",
  7: "Executed"
}

export const getProposals = async (yam) => {
  let BASE24 = new BigNumber(10).pow(24);

  const v1Proposals = await yam.contracts.gov.getPastEvents("ProposalCreated", {fromBlock: 10887059, toBlock: 10926022})
  let proposals = [];
  let v1Descriptions = [];
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
      let abi_types = v1Proposals[i]["returnValues"]["signatures"][j].split("(")[1].split(")").slice(0,-1)[0].split(",");
      let result = yam.web3.eth.abi.decodeParameters(abi_types, v1Proposals[i]["returnValues"]["calldatas"][j]);
      let fr = []
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
      more = knownSnapshots[v1Proposals[i]["transactionHash"]]
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
      more: more
    });
  }
  const v2Proposals = await yam.contracts.gov2.getPastEvents("ProposalCreated", {fromBlock: 10926022, toBlock: 'latest'})
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
      let abi_types = v2Proposals[i]["returnValues"]["signatures"][j].split("(")[1].split(")").slice(0,-1)[0].split(",");
      if (abi_types[0] != "") {
        let result = yam.web3.eth.abi.decodeParameters(abi_types, v2Proposals[i]["returnValues"]["calldatas"][j]);
        let fr = []
        for (let k = 0; k < result.__length__; k++) {
          fr.push(result[k.toString()]);
        }
        ins.push(fr);
      }

    }


    let proposal = await yam.contracts.gov2.methods.proposals(id).call();
    let fv = new BigNumber(proposal["forVotes"]).div(BASE24);
    let av = new BigNumber(proposal["againstVotes"]).div(BASE24);

    let more;
    if (knownSnapshots[v2Proposals[i]["transactionHash"]]) {
      more = knownSnapshots[v2Proposals[i]["transactionHash"]]
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
      more: more
    });
  }
  // proposals[1].state = "Active"
  // proposals[0].state = "Active"
  return proposals;
}

export const getVotingPowers = async (yam, proposals, account) => {
  let BASE24 = new BigNumber(10).pow(24);
  let powers = []
  for (let i = 0; i < proposals.length; i++) {
    if (proposals[i].gov == "gov") {
      let receipt = await
          yam.contracts.gov.methods.getReceipt(proposals[i].id, account).call();
      let power = new BigNumber(receipt[2]).div(BASE24).toNumber();
      if (power == 0) {
        power =  new BigNumber(await
                  yam.contracts.yamV3.methods.getPriorVotes(account, proposals[i].start).call()
                ).div(BASE24).toNumber();
      }
      powers.push({
        hash: proposals[i].hash,
        power: power,
        voted: receipt[0],
        side: receipt[1]
      })
    } else {
      let receipt = await
          yam.contracts.gov2.methods.getReceipt(proposals[i].id, account).call();
      let power = new BigNumber(receipt[2]).div(BASE24).toNumber();
      if (power == 0) {
        power =  new BigNumber(await
                  yam.contracts.yamV3.methods.getPriorVotes(account, proposals[i].start).call()
                ).div(BASE24).toNumber();
      }
      powers.push({
        hash: proposals[i].hash,
        power: power,
        voted: receipt[0],
        side: receipt[1]
      })
    }
  }
  return powers;
}

export const getCurrentVotingPower = async (yam, account) => {
  let BASE24 = new BigNumber(10).pow(24);
  return new BigNumber(await yam.contracts.yamV3.methods.getCurrentVotes(account).call()).dividedBy(BASE24).toNumber()
}

export const getVotes = async (yam) => {
  const votesRaw = new BigNumber(await yam.contracts.yam.methods.getCurrentVotes("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").call()).dividedBy(10**24)
  return votesRaw
}

export const getScalingFactor = async (yam) => { return new BigNumber(await
  yam.contracts.yamV3.methods.yamsScalingFactor().call())
}

export const getDelegatedBalance = async (yam, account) => {
  return new BigNumber(await yam.contracts.yam.methods.balanceOfUnderlying(account).call()).dividedBy(10**24)
}

export const migrate = async (yam, account) => {
  return yam.contracts.yamV2migration.methods.migrate().send({ from: account, gas: 320000 })
}

export const getMigrationEndTime = async (yam) => {
  return yam.toBigN(await yam.contracts.yamV2migration.methods.startTime().call()).plus(yam.toBigN(86400*3)).toNumber()
}

export const getV2Supply = async (yam) => {
  return new BigNumber(await yam.contracts.yamV2.methods.totalSupply().call())
}

export const migrationStarted = async (yam) => {
  let now = new Date().getTime() / 1000; // get current time
  let startTime = await yam.contracts.migrator.methods.startTime().call();
  let token_initialized = await yam.contracts.migrator.methods.token_initialized().call();
  let delegatorRewardsSet = await yam.contracts.migrator.methods.delegatorRewardsSet().call();
  if (now >= startTime && token_initialized && delegatorRewardsSet) {
    return true;
  }
  return false;
}

const yamToFragment = async (yam, amount) => {
  let BASE24 = new BigNumber(10).pow(24);
  let scalingFactor = new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call());

  return amount.multipliedBy(scalingFactor).dividedBy(BASE24);
}

export const currVested = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);

  let vested = new BigNumber(await yam.contracts.migrator.methods.vested(account).call());
  let amt = await yamToFragment(yam, vested);
  return amt.dividedBy(BASE);
}

export const currUnclaimedDelegatorRewards = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);
  let BASE24 = new BigNumber(10).pow(24);

  let start = new BigNumber(1600444800);
  let duration = new BigNumber(90 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1)
  }
  let totalVesting = new BigNumber(await yam.contracts.migrator.methods.delegator_vesting(account).call());
  let claimed = new BigNumber(await yam.contracts.migrator.methods.delegator_claimed(account).call());
  let unclaimed = ((totalVesting.multipliedBy(percDone)).minus(claimed));
  let amt = await yamToFragment(yam, unclaimed);
  return amt.dividedBy(BASE);
}

export const currUnclaimedMigratorVesting = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);
  let BASE24 = new BigNumber(10).pow(24);

  let start = new BigNumber(1600444800);
  let duration = new BigNumber(30 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1)
  }
  let totalVesting = new BigNumber(await yam.contracts.migrator.methods.vesting(account).call());
  let claimed = new BigNumber(await yam.contracts.migrator.methods.claimed(account).call());
  let unclaimed = ((totalVesting.multipliedBy(percDone)).minus(claimed));
  let amt = await yamToFragment(yam, unclaimed);
  return amt.dividedBy(BASE);
}

export const delegatorRewards = async (yam, account) => {
  let BASE = new BigNumber(10).pow(18);
  let BASE24 = new BigNumber(10).pow(24);

  let rewards = new BigNumber(await yam.contracts.migrator.methods.delegator_vesting(account).call());
  let amt = await yamToFragment(yam, rewards);
  return amt.dividedBy(BASE);
}

export const migrateV3 = async (yam, account, onTxHash) => {
    return await yam.contracts.migrator.methods.migrate()
      .send({from: account, gas: 200000}, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Migration error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Migration transaction failed.")
          return false
        }
        return true
      })
}

export const claimVested = async (yam, account, onTxHash) => {
  return await yam.contracts.migrator.methods.claimVested().send({from: account, gas: 140000});
}

export const scalingFactors = async (curPage) => {

  let scalingFactors = [];
  let timestamps = [];
  let dataset = await getHistoricalScaling(10886913,'latest',curPage);
  let currentPage = dataset.current_page;
  let totalPages = dataset.last_page;
  let rebases = dataset.data;
  for (let i = 0; i < rebases.length; i++) {
      scalingFactors.push(
          rebases[i].scaling_factor
      );
     timestamps.push(rebases[i].timestamp);
  }
  return {factors: scalingFactors, timestamps: timestamps,currentPage:currentPage,totalPages:totalPages};
}

export const yamSold = async (curPage)=>{

  let yamSolds = [];
  let timestamps = [];
  let dataset = await getYamSoldHistoricalData(10886913,'latest',curPage);
  let currentPage = dataset.current_page;
  let totalPages = dataset.last_page;
  let rebases = dataset.data;
  for (let i = 0; i < rebases.length; i++) {
     yamSolds.push(
        rebases[i].yams_sold
    );
    timestamps.push(rebases[i].timestamp);
  }
  return {yamSolds: yamSolds, timestamps: timestamps,currentPage:currentPage,totalPages:totalPages};

}

export const yamMinted = async (curPage)=>{

  let yamMinted = [];
  let timestamps = [];
  let dataset = await getYamMintedHistoricalData(10886913,'latest',curPage);
  let currentPage = dataset.current_page;
  let totalPages = dataset.last_page;
  let rebases = dataset.data;
  for (let i = 0; i < rebases.length; i++) {
    yamMinted.push(
        rebases[i].yams_minted
    );
    timestamps.push(rebases[i].timestamp);
  }
  return {yamMint: yamMinted, timestamps: timestamps,currentPage:currentPage,totalPages:totalPages};

}

export const reservesHistory = async (curPage)=>{

  let reserves = [];
  let timestamps = [];
  let dataset = await getReservesHistoricalData(10886913,'latest',curPage);
  let currentPage = dataset.current_page;
  let totalPages = dataset.last_page;
  let rebases = dataset.data;
  for (let i = 0; i < rebases.length; i++) {
    reserves.push(
        rebases[i].reserves
    );
    timestamps.push(rebases[i].timestamp);
  }
  return {reserves: reserves, timestamps: timestamps,currentPage:currentPage,totalPages:totalPages};

}

export const getRebaseType = async (rebaseValue) => {
  return Math.sign(rebaseValue) === 1;
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const waitTransaction = async (provider, txHash) => {
  const web3 = new Web3(provider)
  let txReceipt = null
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash)
    txReceipt = r
    await sleep(2000)
  }
  return (txReceipt.status)
}

const requestYam = () => {
  return new Promise((resolve, reject) => {
    request({
        url: "https://api.coingecko.com/api/v3/coins/yam-2",
        json: true,
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
};

export const getMarketCap = async () => {
  const data = await requestYam();
  return data.market_data.market_cap.usd;
};

export const getMaxSupply = async () => {
  const data = await requestYam();
  return data.market_data.max_supply;
};

export const getHistoricalData = async(from,to) =>{

  return new Promise((resolve, reject) => {
    request({
          url: "https://treasury.vision/api/v1/history?from="+from+"&to="+to,
          json: true,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
    );
  });
};

export const getReservesHistoricalData = async(from,to,curPage) =>{

  return new Promise((resolve, reject) => {
    let url = "https://treasury.vision/api/v1/reserves-history?from="+from+"&to="+to;
    if(curPage)
      url += "&page="+curPage;
    request({
          url: url,
          json: true,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
    );
  });

};

export const getYamMintedHistoricalData = async(from,to,curPage) =>{

  return new Promise((resolve, reject) => {
    let url = "https://treasury.vision/api/v1/yam-minted-history?from="+from+"&to="+to;
    if(curPage)
      url += "&page="+curPage;
    request({
          url: url,
          json: true,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
    );
  });

};

export const getYamSoldHistoricalData = async(from,to,curPage) =>{

  return new Promise((resolve, reject) => {
    let url = "https://treasury.vision/api/v1/yam-sold-history?from="+from+"&to="+to;
    if(curPage)
      url += "&page="+curPage;
    request({
          url: url,
          json: true,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
    );
  });

};

export const getHistoricalScaling = async(from,to,curPage) =>{

  return new Promise((resolve, reject) => {
    let url = "https://treasury.vision/api/v1/scaling-history?from="+from+"&to="+to;
    if(curPage)
      url += "&page="+curPage;
    request({
          url: url,
          json: true,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
    );
  });

};

export const pingApi = async() =>{
  return new Promise((resolve, reject) => {
    let url = "https://treasurdy.vision/api/v1/scaling-history";

    request({
          url: url,
          json: true,
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        }
    );
  });
}

export const treasuryEvents = async (yam) => {
  let BASE = new BigNumber(10).pow(18);
  let BASE24 = new BigNumber(10).pow(24);

  let rebases = await yam.contracts.rebaser.getPastEvents('TreasuryIncreased', {fromBlock: 10886913, toBlock: 'latest'});
  let reservesAdded = [];
  let yamsSold = [];
  let yamsFromReserves = [];
  let yamsToReserves = [];
  let blockNumbers = [];
  for (let i = 0; i < rebases.length; i++) {
    reservesAdded.push(
        Math.round(
            new BigNumber(rebases[i]["returnValues"]["reservesAdded"]).div(BASE).toNumber() * 100
        ) / 100
    );
    yamsSold.push(
        Math.round(
            new BigNumber(rebases[i]["returnValues"]["yamsSold"]).div(BASE).toNumber() * 100
        ) / 100
    );
    yamsFromReserves.push(
        Math.round(
            new BigNumber(rebases[i]["returnValues"]["yamsFromReserves"]).div(BASE).toNumber() * 100
        ) / 100
    );
    yamsToReserves.push(
        Math.round(
            new BigNumber(rebases[i]["returnValues"]["yamsToReserves"]).div(BASE).toNumber() * 100
        ) / 100
    );
    blockNumbers.push(rebases[i]["blockNumber"]);
  }
  return {
    reservesAdded: reservesAdded,
    yamsSold: yamsSold,
    yamsFromReserves: yamsFromReserves,
    yamsToReserves: yamsToReserves,
    blockNumbers: blockNumbers
  };
}

export const fallbackScalingFactors = async (yam) => {
  let BASE = new BigNumber(10).pow(18);
  let BASE24 = new BigNumber(10).pow(24);

  let rebases = await yam.contracts.yamV3.getPastEvents('Rebase', {fromBlock: 10886913, toBlock: 'latest'});
  let scalingFactors = [];
  let blockNumbers = [];
  for (let i = 0; i < rebases.length; i++) {
    scalingFactors.push(
        Math.round(
            new BigNumber(rebases[i]["returnValues"]["prevYamsScalingFactor"]).div(BASE).toNumber() * 100
        ) / 100
    );
    blockNumbers.push(rebases[i]["blockNumber"]);
  }
  return {factors: scalingFactors, blockNumbers: blockNumbers};
}
