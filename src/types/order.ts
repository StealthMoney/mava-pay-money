import { Quote } from "./quote"
import { WalletCurrencyType } from "./wallet"

export type Order = {
    createdAt: string
    currency: WalletCurrencyType
    displayAmount: string
    isValid: true
    orderId: string
    paymentBtcDetail: string
    paymentCollectionMethod: string
    status: string
    quote: Quote["data"]
}
