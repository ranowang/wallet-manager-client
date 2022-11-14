import BigNumber from "bignumber.js";
import { ChainType } from "./Enums";
import { WalletType } from "./Enums";

export interface WithdrawOrder{
    
    merchant_order_id: string;
    amount: BigNumber;
    decimals: number;
    to_address: string;
    to_wallet_tag?: string;
}

export interface BatchWithdrawRequest{

    merchant_id:BigNumber;
    wallet_type?: WalletType;
    chain_type: ChainType;
    chain_id: number;
    asset_name: string;
    hot_wallet_address?: string;
    orders:WithdrawOrder[];
    client_data?: string;

}