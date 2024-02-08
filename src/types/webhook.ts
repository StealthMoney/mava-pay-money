import { Transaction } from "./transaction"

export type ReceivedWebhookPayload = {
    event: string
    data: Transaction
}

export type SentWebhookPayload = {
    event: string
    data: Transaction & {
        txHash: string
    }
}
