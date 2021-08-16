export class Account {
  constructor(contracts, address) {
    this.contracts = contracts;
    this.accountInfo = address;
    this.type = "";
    this.allocation = [];
    this.balances = {};
    this.status = "";
    this.approvals = {};
    this.walletInfo = {};
  }
/** Fetching Yam balance of user  */
  async getYAMWalletBalance() {
    this.walletInfo["DAI"] = await this.contracts.yam.methods.balanceOf(this.accountInfo).call();
    return this.walletInfo["DAI"];
  }

/** Fetching YCRV balance of user  */
  async getYCRVWalletBalance() {
    this.walletInfo["YCRV"] = await this.contracts.ycrv.methods.balanceOf(this.accountInfo).call();
    return this.walletInfo["YCRV"];
  }

/** Fetching YFI balance of user  */
  async getYFIWalletBalance() {
    this.walletInfo["YFI"] = await this.contracts.yfi.methods.balanceOf(this.accountInfo).call();
    return this.walletInfo["YFI"];
  }

/** Fetching UNIAmpl balance of user  */
  async getUNIAmplWalletBalance() {
    this.walletInfo["UNIAmpl"] = await this.contracts.UNIAmpl.methods.balanceOf(this.accountInfo).call();
    return this.walletInfo["UNIAmpl"];
  }

/** Fetching WETH balance of user  */
  async getWETHWalletBalance() {
    this.walletInfo["WETH"] = await this.contracts.weth.methods.balanceOf(this.accountInfo).call();
    return this.walletInfo["WETH"];
  }

/** Fetching ETH balance of user  */
  async getETHWalletBalance() {
    this.walletInfo["ETH"] = await this.contracts.web3.eth.getBalance(this.accountInfo);
    return this.walletInfo["ETH"];
  }
}
