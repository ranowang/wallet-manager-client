import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface VerifyTransactionRequest {

    merchant_id: BigNumber;
    batch_id:string;
    chain_type: ChainType;
    chain_id: BigNumber;
    operation_type: string;
    status: string;
    
}