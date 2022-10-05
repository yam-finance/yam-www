Yam software development kit.

## Installation
```
npm install yam-sdk
yarn add yam-sdk
```

## Use

```ts
import Yam from "yam-sdk";
import { ethers } from "ethers";

// Create provider
const provider = new ethers.providers.Web3Provider(web3Provider);

// Create an instance of the Yam SDK
const yamSdk = await new Yam({
  provider,
});

// Check your network id
const chainId = await yamSdk.getChainId();

// Select the contract(s) for interactions
const yam = await yamSdk.contracts.token;
const governor = await yamSdk.contracts.governor;

// Check your Yam balance
const myYamTokens = await yam.balance();
console.log("My YAM tokens", myYamTokens);

// Check the governor delay period
const governorVotingPeriod = await governor.votingPeriod();
console.log("The governor voting period", governorVotingPeriod);
```