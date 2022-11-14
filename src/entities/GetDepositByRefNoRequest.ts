import { ChainType } from "./Enums";

export interface GetDepositByRefNoRequest {
    
    chain_type: ChainType;
    chain_id: number;
    ref_no: string;
    offset?: number;
    limit?: number;
    block_hash?: string;
    tx_status?: boolean;
    valid?: boolean;

}