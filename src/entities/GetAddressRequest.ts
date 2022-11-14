import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";
import { WalletType } from "./Enums";

export interface GetAddressReqeust {

    merchant_id: BigNumber;
    client_id: string;
    wallet_name: string;
    wallet_type: WalletType;
    chain_type: ChainType;
    chain_id: number;
}