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

export type IdentityWebhookPayload = {
    status: boolean
    detail: string
    message?: string
    response_code: string
    data?: Record<string, any>
    widget_info: {
        email: string
        last_name: string
        first_name: string
        user_ref: string
        metadata: Record<string, any> | null
        payload: Record<string, any> | null
    }
}
