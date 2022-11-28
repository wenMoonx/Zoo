import Web3 from "web3";
import { addresses } from "./constants";
import ZooToken from "./contracts/ZooToken";
import Usdt from "./contracts/Usdt";
import Sale from "./contracts/Sale";

export default class Web3Wrapper {
  web3: Web3;
  chainId: number;
  account: string;
  wrapperOptions: any;

  // Contracts
  zooToken: ZooToken;
  usdt: Usdt;
  sale: Sale;

  constructor(web3, chainId, account, options = {}) {
    this.web3 = web3;
    this.chainId = chainId;
    this.account = account;

    this.wrapperOptions = {
      web3,
      chainId,
      account,
      ...options,
    };
    this.zooToken = new ZooToken(
      this.wrapperOptions,
      addresses.zooToken[this.chainId]
    );
    this.usdt = new Usdt(this.wrapperOptions, addresses.usdt[this.chainId]);
    this.sale = new Sale(this.wrapperOptions, addresses.sale[this.chainId]);
  }

  async getUsdtBalance() {
    let usdtBalance: any = await this.usdt.call("balanceOf", this.account);
    return this.web3.utils.fromWei(usdtBalance.toString(), "mwei");
  }
  async getUSDTApproval(amount) {
    let usdtApproval: any = await this.usdt.call("allowance", this.account, addresses.sale[this.chainId])
    return this.web3.utils.fromWei(usdtApproval.toString(), "mwei") >= amount
  }
  async approveUSDT() {
    let amountApprove = Math.pow(2, 53) - 1;
    await this.usdt.send(
        "approve",
        {},
        addresses.sale[this.chainId],
        // this.web3.utils.toWei(amountApprove.toString(), "mwei")
        this.web3.utils.toWei(amountApprove.toString())
        // Math.pow(2, 256)
    );
  }
  async mintToken(_amount, _referral1, _referral2) {
    // let amountApprove = _amount * 8;
    await this.sale.send(
      "mintByUSDT",
      {},
      this.web3.utils.toWei(_amount.toString(), "mwei"),
      _referral1,
      _referral2
    );
  }
  async checkMintable(_amount) {
    let mintable = await this.sale.call(
      "checkMintable",
      this.account,
      this.web3.utils.toWei(_amount.toString(), "mwei")
    );
    return mintable === "Mintable";
  }
  async getTotalSaledToken() {
    let totalSaled: any = await this.sale.call("totalSale");
    return this.web3.utils.fromWei(totalSaled.toString(), "mwei");
  }
}
