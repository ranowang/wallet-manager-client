import { loadConfig } from "wallet-manager-client-utils";
import { MerchantConfig } from "../src/entities/MerchantConfig";
const CONFIG = loadConfig<MerchantConfig>("config");
import { ChainType, ChainId,WalletType} from '../src/entities/Enums';
import BigNumber from "bignumber.js";

import { WalletManagerClient } from "../src/WalletManagerClient";
import { GetAddressReqeust } from "../src/entities/GetAddressRequest";
import { BatchWithdrawRequest,WithdrawOrder} from "../src/entities/BatchWithdrawRequest";
import { BatchSweepRequest } from "../src/entities/BatchSweepRequest";
import { GetDepositByAddressRequest } from "../src/entities/GetDepositByAddressRequest";
import { GetDepositByHashRequest } from "../src/entities/GetDepositByHashRequest";
import { GetDepositByRefNoRequest } from "../src/entities/GetDepositByRefNoRequest";
import { GetWithdrawByOrderIdRequest } from "../src/entities/GetWithdrawByOrderIdRequest";
import { GetWithdrawByBatchIdRequest } from "../src/entities/GetWithdrawByBatchIdRequest";
import { VerifyTransactionRequest } from "../src/entities/VerifyTransactionRequest";
import { GetAllLatestBlocksRequest } from "../src/entities/GetAllLatestBlocksRequest";

import { expect } from "chai";

const clientConfig = CONFIG.clientConfig;
const { privateKey } = CONFIG.identity;

let orderSeq = new Date().getTime();

const chain_type = ChainType.BTC;
const chain_id = ChainId.Default;
const merchant_id = new BigNumber(CONFIG.merchantId);
const wallet_type = WalletType.HotWallet;

const client = new WalletManagerClient(privateKey, clientConfig);

describe("Test Access API BTC", async function () {
  it("Get Address", async function () {
    const request: GetAddressReqeust = {
      chain_type,
      chain_id,
      merchant_id,
      client_id: new Date().getTime().toFixed(),
      wallet_type,
      wallet_name:""
    };

    const response = await client.getAddress(request);
    console.info(JSON.stringify(response));

    expect(response.result).to.be.not.undefined;
    expect(response.result).to.be.not.null;
    expect(response.result?.address).to.be.not.undefined;
    expect(response.result?.address).is.an("string");
  });

  it("Batch withdraw", async function () {
    const order1: WithdrawOrder = {
      merchant_order_id: "W" + orderSeq++,
      amount: new BigNumber("20"),
      decimals: 8,
      to_address: "mkYzFPSTEvVcBPfRhCjW6HVuZLzREt1tF8",
    };

    const order2: WithdrawOrder = {
      merchant_order_id: "W" + orderSeq++,
      amount: new BigNumber("20"),
      decimals: 8,
      to_address: "mua5is4apJDAXRZwFV6Z4Qudp3CyKLFrpr", // to a client wallet address
    };

    const request: BatchWithdrawRequest = {
      merchant_id,
      wallet_type,
      chain_type,
      chain_id,
      asset_name: "BTC",
      orders: [order1, order2],
      client_data: "test",
    };

    const response = await client.batchWithdraw(request);
    //{"error":null,"result":{"batch_id":63,"request_time":1661528769}}
    console.info(JSON.stringify(response));

    expect(response.result).to.be.not.undefined;
    expect(response.result).to.be.not.null;
    expect(response.result?.batch_id).to.be.not.undefined;
    expect(response.result?.request_time).to.be.not.undefined;
  });

  it("Preview batch sweep", async function () {
    const request: BatchSweepRequest = {
      merchant_id,
      merchant_order_id: "S" + orderSeq++,
      chain_type,
      chain_id,
      asset_name: "BTC",
      threshold: new BigNumber("5000"),
      decimals: 8,
      gether_address: "2N1WctuSCt6DrYYzHpr1NwK9zNk6Gc47vsC", // hot wallet address
      invoker_address: "",
      client_data: "ranotest",
      preview: true,
    };

    const response = await client.batchSweep(request);

    console.info(JSON.stringify(response));
  });

  it("Batch sweep", async function () {
    const request: BatchSweepRequest = {
      merchant_id,
      merchant_order_id: "S" + orderSeq++,
      chain_type,
      chain_id,
      asset_name: "BTC",
      threshold: new BigNumber("5000"),
      decimals: 8,
      gether_address: "2N1WctuSCt6DrYYzHpr1NwK9zNk6Gc47vsC", // hot wallet address
      invoker_address: "",
      client_data: "ranotest",
      preview: false,
    };

    const response = await client.batchSweep(request);

    console.info(JSON.stringify(response));
  });

  it("getDepositByAddress", async function () {
    const request: GetDepositByAddressRequest = {
      chain_type,
      chain_id,
      address: "mmgG9P7JBvb9TXHuGcyTgx41eyPGvbHRve",
      asset_name: "BTC",
      offset: 0,
      limit: 10,
    };
    const response = await client.getDepositByAddress(request);

    console.info(JSON.stringify(response));
  });

  it("getDepositByHash", async function () {
    const request: GetDepositByHashRequest = {
      chain_type,
      chain_id,
      tx_hash:
        "26b1776a4a13a89f0053d6e4d14d9425b8e95ebd369e4da9cb5a7ae8d0b8c633",
      offset: 0,
      limit: 10,
    };
    const response = await client.getDepositByHash(request);

    console.info(JSON.stringify(response));
  });

  it("getDepositByRefNo", async function () {
    const request: GetDepositByRefNoRequest = {
      chain_type,
      chain_id,
      ref_no: "52BD5ZK4F5U6TR2AWA6ZAER6CYETS2DQGV3K77DAFCQIYQXN4XZQ",
      offset: 0,
      limit: 10,
    };

    const response = await client.getDepositByRefNo(request);

    console.info(JSON.stringify(response));
  });

  it("getWithdrawByOrderId", async function () {
    const request: GetWithdrawByOrderIdRequest = {
      merchant_order_id: "EU11_WD_202211041739",
      offset: 0,
      limit: 10,
    };
    const response = await client.getWithdrawByOrderId(request);

    console.info(JSON.stringify(response));
  });

  it("getWithdrawByBatchId", async function () {
    const request: GetWithdrawByBatchIdRequest = {
      batch_id: "196",
      offset: 0,
      limit: 10,
    };
    const response = await client.getWithdrawByBatchId(request);

    console.info(JSON.stringify(response, null, 2));
  });

  it("GetAllLatestBlocks", async function () {
    const request: GetAllLatestBlocksRequest = {
      chain_type,
      chain_id
    };

    const response = await client.getAllLatestBlocks(request);
    console.info(JSON.stringify(request));
    console.info(JSON.stringify(response));

    expect(response.result).to.be.not.undefined;
    expect(response.result).to.be.not.null;
  });

  it("VerifyTransaction", async function () {
    const request: VerifyTransactionRequest = {
      merchant_id,
      batch_id: "225",
      chain_type,
      chain_id,
      operation_type: "1",
      status: "1",
    };

    const response = await client.verifyTransaction(request);
    console.info(JSON.stringify(response));
  });
});
