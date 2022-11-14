import { ChainType } from "./Enums";

export interface GetDepositByHashRequest {

    chain_type: ChainType;
    chain_id: number;
    tx_hash: string;
    offset?: number;
    limit?: number;
    block_hash?: string;
    tx_status?: boolean;
    valid?: boolean;
}