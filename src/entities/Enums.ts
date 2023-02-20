export enum ChainType{
    BTC = 1,
    ETH = 2,
    TRON = 3,
    XRP = 4,
    SOL = 5,
    BCH = 6,
    LTC = 7,
    ADA = 8
    ,
}

export class ChainId{
    static readonly Default = 1;
    static readonly Ethereum = 1;
    static readonly RippleTestnet = 2;
    static readonly Rinkeby = 4;
    static readonly BSC = 56;
    static readonly BSCtest = 97;
    static readonly Sepolia = 11155111;
    static readonly OKXChainTestnet = 65;
    static readonly Mumbai = 80001;
    static readonly BitcoinCashTestnet = 2;
    static readonly LTCTestnet = 2;
    static readonly CardanoADA = 2;
}

export enum OperationBatchStatus{
    SignFailed = -3,
    Failed = -2,
    Rejected = -1,
    Requested = 1,
    Submitted = 2,
    Signed = 6,
    Executing = 3,
    Completed = 4,
    PartialCompleted = 5
}

export enum OperationStatus{
    SignFailed = -3,
    Failed = -2,
    Rejected = -1,
    Requested = 1,
    Submitted = 2,
    Signed = 6,
    Executing = 3,
    Completed = 4
}

export enum OperationType{
    Withdraw = 1,
    Sweep = 2
}

export enum OperationTransactionStatus{
    BroadcastFailed = -2,
    ConfirmedFail  = -1,
    Signed = 1,
    Broadcasted = 2,
    Unconfirmed = 3,
    ConfirmedSuccess = 4
}

export enum Direction{
    In = 1,
    Out = 2
}

export enum TransactionStatus{
    ConfirmedFail = -1,
    Unconfirmed = 1,
    ConfirmedSuccess = 2,
    Invoid = 3
}

export enum TransactionType{
    ClientDeposit = 1,
    HotWalletDeposit = 2,
    InvokerDeposit = 3,
    MerchantDeposit = 4,
    LOSS10 = 10,
    CAUTION = 11,
    SweepToHotWallet = 12,
    CAUTION13 = 13,
    Sweep = 14,
    SweepFee = 19,
    Withdraw = 20,
    WithdrawDeposit = 21,
    HotWalletTransfer = 22,
    CAUTION23 = 23,
    CAUTION24 = 24,
    WithdrawFee = 29,
    LOSS30 = 30,
    ClientWalletTopup = 31,
    HotWalletTopup = 32,
    InvokerTransfer = 33,
    CAUTION34 = 34,
    TopupFee = 39,
    MerchantWithdraw = 40,
    CAUTION41 = 41,
    ProvisionForWithdraw = 42,
    CAUTION43 = 43,
    MerchantTransfer = 44,
    MerchantWithdrawFee = 49
    
}
export enum WalletType{
    ExternalWallet = 0,
    ClientWallet = 1,
    HotWallet = 2,
    InvokerWallet = 3,
    SweepDestWallet = 4,
    Adjustment = 8,
    MinerFee = 9

}