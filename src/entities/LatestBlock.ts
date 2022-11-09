import { ChainType } from "./Enums"

export interface LatestBlock {
    chain_id: string,
    chain_type: ChainType,
    chain_code: string,
    native_asset_name: string,
    latest_block_number: string,
    latest_pending_block_number: string,
}