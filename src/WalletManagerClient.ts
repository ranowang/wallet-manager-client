import { WalletManagerUtils} from 'wallet-manager-client-utils';
import { Response} from 'wallet-manager-client-utils/dist/src/entities/Response';
import { ClientConfig } from 'wallet-manager-client-utils/dist/src/entities/Config'

import { GetDepositByAddressRequest } from './entities/GetDepositByAddressRequest';
import { GetDepositByAddressResult } from './entities/GetDepositByAddressResult';

import { GetDepositByHashRequest } from './entities/GetDepositByHashRequest';
import { GetDepositByHashResult } from './entities/GetDepositByHashResult';

import { GetDepositByRefNoRequest } from './entities/GetDepositByRefNoRequest';
import { GetDepositByRefNoResult } from './entities/GetDepositByRefNoResult';

import { GetWithdrawByOrderIdRequest } from './entities/GetWithdrawByOrderIdRequest';
import { Operation } from './entities/Operation';

import { GetWithdrawByBatchIdRequest } from './entities/GetWithdrawByBatchIdRequest';
import { OperationBatch } from './entities/OperationBatch';

import { GetAddressReqeust } from "./entities/GetAddressRequest";
import { GetAddressResult } from './entities/GetAddressResult';

import { BatchWithdrawRequest} from "./entities/BatchWithdrawRequest";
import { BatchWithdrawResult } from './entities/BatchWithdrawResult';

import { BatchSweepRequest } from './entities/BatchSweepRequest';
import { BatchSweepResult } from './entities/BatchSweepResult';

import { GetAllLatestBlocksRequest } from './entities/GetAllLatestBlocksRequest';
import { GetAllLatestBlocksResult } from './entities/GetAllLatestBlocksResult';

import { VerifyTransactionRequest } from "./entities/VerifyTransactionRequest";
import { VerifyTransactionResult } from './entities/VerifyTransactionResult';

import { AxiosInstance } from 'axios';

export class WalletManagerClient{

    readonly instance:AxiosInstance;
    readonly utils:WalletManagerUtils;

    constructor(privateKey:string, clientConfig:ClientConfig){
        this.utils = new WalletManagerUtils(privateKey, clientConfig.instanceId);
        this.instance = this.utils.createAxiosInstance(clientConfig.baseURL, clientConfig.contentTypeJson);
    }

    async getAddress(request:GetAddressReqeust):Promise<Response<GetAddressResult>>{
        const response = await this.instance.post("/get_address", request);
        return response.data;
    }

    async batchWithdraw(request:BatchWithdrawRequest):Promise<Response<BatchWithdrawResult>>{
        const response = await this.instance.post("/batch_withdraw", request);
        return response.data;
    }

    async batchSweep(request:BatchSweepRequest):Promise<Response<BatchSweepResult>>{
        const response = await this.instance.post("/batch_sweep", request);
        return response.data;
    }

    async getDepositByAddress(request:GetDepositByAddressRequest):Promise<Response<GetDepositByAddressResult>>{
        const {chain_type, chain_id, address, asset_name, offset, limit} = request;
        const path = `/${chain_type}/${chain_id}/transfer/addr/${address}/deposit/${asset_name}`;
        const response = await this.instance.get(
                path, {
                    params: {
                        limit: limit,
                        offset: offset,
                    }
                }
            );
        return response.data;
    }

    async getDepositByHash(request:GetDepositByHashRequest):Promise<Response<GetDepositByHashResult>>{
        const {chain_type, chain_id, tx_hash, limit, offset} = request;
        const path = `/${chain_type}/${chain_id}/transfer/hash/${tx_hash}/deposit`;
        const response = await this.instance.get(
                path, {
                    params: {
                        limit: limit,
                        offset: offset,
                    }
                }
            );
        return response.data;
    }

    async getWithdrawByOrderId(request:GetWithdrawByOrderIdRequest):Promise<Response<Operation>>{
        const {merchant_order_id, limit, offset} = request;
        const path = `/withdraw/order/${merchant_order_id}`;
        const response = await this.instance.get(
            path, {
                params: {
                    limit: limit,
                    offset: offset,
                }
            });
        return response.data;
    }

    async getWithdrawByBatchId(request:GetWithdrawByBatchIdRequest):Promise<Response<OperationBatch>>{
        const {batch_id, limit, offset} = request;
        const path = `/withdraw/batch/${batch_id}`;
        const response = await this.instance.get(
            path, {
                params: {
                    limit: limit,
                    offset: offset,
                }
            });
        return response.data;
    }

    async getAllLatestBlocks(request:GetAllLatestBlocksRequest):Promise<Response<GetAllLatestBlocksResult>>{
        const {chain_type, chain_id} = request;
        const path = `/chains/get_all_latest_blocks/`;
        const response = await this.instance.get(
        path, {
            params: {
                chain_type: chain_type,
                chain_id: chain_id,
            }
             });
        return response.data;
    }

    async getDepositByRefNo(request:GetDepositByRefNoRequest):Promise<Response<GetDepositByRefNoResult>>{
        const {chain_type, chain_id, ref_no, limit, offset} = request;
        const path = `/${chain_type}/${chain_id}/transfer/ref_no/${ref_no}/deposit`;
        const response = await this.instance.get(
                path, {
                    params: {
                        limit: limit,
                        offset: offset,
                    }
                }
            );
        return response.data;
    }

    async verifyTransaction(request:VerifyTransactionRequest):Promise<Response<VerifyTransactionResult>>{
        const response = await this.instance.post("verify_transaction", request);
        return response.data;
    }
}