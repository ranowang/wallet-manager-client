import { ChainType } from "./Enums";

export interface GetAllLatestBlocksRequest {

    chain_type?: ChainType;
    chain_id?: number;

}