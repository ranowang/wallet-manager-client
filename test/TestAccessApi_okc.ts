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

const chain_type = ChainType.ETH;
const chain_id = ChainId.OKXChainTestnet;
const wallet_type = WalletType.HotWallet;
const merchant_id = new BigNumber(CONFIG.merchantId);

const client = new WalletManagerClient(privateKey, clientConfig);

describe("Test Access API OKC", async function () {
  it("Get Address", async function () {
    const request: GetAddressReqeust = {
      chain_type,
      chain_id,
      merchant_id,
      client_id: new Date().getTime().toFixed(),
      wallet_type,
      wallet_name:"1668159293078",
    };

    const response = await client.getAddress(request);
    console.info(JSON.stringify(response));

    expect(response.result).to.be.not.undefined;
    expect(response.result).to.be.not.null;
    expect(response.result?.address).to.be.not.undefined;
    expect(response.result?.address).is.an("string");
  });

  it("Batch withdraw", async function () {
    const order:WithdrawOrder = {
      merchant_order_id: "W" + orderSeq++,
      amount: new BigNumber("200000000000000000"),
      decimals: 18,
      to_address: "0x3bB86AF74140649Cb6F97e98D800aC581EA97E31"
  };

  const request:BatchWithdrawRequest = {
      merchant_id,
      wallet_type,
      chain_type,
      chain_id,
      asset_name: "OKT",
      orders: [order],
      client_data: "rano_test004"
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
      asset_name: "WMT",
      threshold: new BigNumber("1000000000"),
      decimals: 18,
      gether_address: "0x93B6b0f8ca6eC6B162d2fFDE776a5639A1d1b35a", // hot wallet address
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
      asset_name: "WMT",
      threshold: new BigNumber("1000000000"),
      decimals: 18,
      gether_address: "0x93B6b0f8ca6eC6B162d2fFDE776a5639A1d1b35a", // hot wallet address
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
      address: "0x93B6b0f8ca6eC6B162d2fFDE776a5639A1d1b35a",
      asset_name: "OKT",
      offset: 0,
      limit: 10,
    };
    const response = await client.getDepositByAddress(request);
    console.info(JSON.stringify(request));

    console.info(JSON.stringify(response));
  });

  it("getDepositByHash", async function () {
    const request: GetDepositByHashRequest = {
      chain_type,
      chain_id,
      tx_hash:
        "0xde7873ab3665e67af68129d144a7d51522e4c5a68d402bc93dca57e0009501d1",
      offset: 0,
      limit: 10,
    };
    const response = await client.getDepositByHash(request);
    console.info(JSON.stringify(request));

    console.info(JSON.stringify(response));
  });

  it("getDepositByRefNo", async function () {
    const request: GetDepositByRefNoRequest = {
      chain_type,
      chain_id,
      ref_no: "Q36TA2UFRY43JT5GC5HEGNTPOUNI3LFEUEGRW7FT23F6GBBO4QLA",
      offset: 0,
      limit: 10,
    };
    const response = await client.getDepositByRefNo(request);
    console.info(JSON.stringify(request));

    console.info(JSON.stringify(response));
  });

  it("getWithdrawByOrderId", async function () {
    const request: GetWithdrawByOrderIdRequest = {
      merchant_order_id: "W1668581350872",
      offset: 0,
      limit: 10,
    };
    const response = await client.getWithdrawByOrderId(request);
    console.info(JSON.stringify(request));
    
    console.info(JSON.stringify(response));
  });

  it("getWithdrawByBatchId", async function () {
    const request: GetWithdrawByBatchIdRequest = {
      batch_id: "286",
      offset: 0,
      limit: 10,
    };
    const response = await client.getWithdrawByBatchId(request);
    console.info(JSON.stringify(request));

    console.info(JSON.stringify(response, null, 2));
  });

  it("GetAllLatestBlocks", async function () {
    const request: GetAllLatestBlocksRequest = {
      chain_type,
      chain_id
    };

    const response = await client.getAllLatestBlocks(request);
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
