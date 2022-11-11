import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";
import { WalletType } from "./Enums";

export interface WithdrawOrder{
    
    merchant_order_id: string;
    amount: BigNumber;
    decimals: number;
    to_address: string;
}

export interface BatchWithdrawRequest{

    merchant_id:BigNumber;
    wallet_type: WalletType;
    chain_type: ChainType;
    chain_id: BigNumber;
    asset_name: string;
    orders:WithdrawOrder[];
    client_data?: string;

}