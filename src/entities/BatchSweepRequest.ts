import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";

export interface BatchSweepRequest {
    merchant_id: BigNumber;
    merchant_order_id?: string;
    chain_type: ChainType
    chain_id: number
    asset_name: string
    threshold: BigNumber
    decimals: number
    gether_address: string
    invoker_address?: string
    client_data?: unknown;
    preview: boolean;
}