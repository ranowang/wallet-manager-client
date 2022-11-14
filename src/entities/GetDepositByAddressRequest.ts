import { ChainType } from "./Enums";

export interface GetDepositByAddressRequest {
    
    chain_type: ChainType;
    chain_id: number;
    address: string;
    asset_name?: string;
    offset?: number;
    limit?: number;
    block_hash?: string;
    tx_status?: boolean;
    valid?: boolean;
}