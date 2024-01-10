import { DELAY_BETWEEN_RETRIES_IN_SECONDS, WEBHOOK_RETRIES } from "@/config/default";
import { Logger } from "@/config/logger";
import type { Transaction } from "@/types/transaction";
import { ReceivedWebhookPayload, SentWebhookPayload } from "@/types/webhook";
import axios from "axios";

export const constructNewPayload = (receivedPayload: ReceivedWebhookPayload, txHash: string) => {
  return {...receivedPayload, data: {...receivedPayload.data, txHash}} as SentWebhookPayload;
}

export const sendUpdateToCallback = async (data: SentWebhookPayload, callbackUrl: string, retries = WEBHOOK_RETRIES) => {
  const res = await axios.post(callbackUrl, data)
  if (res.status < 200 || res.status >= 300) {
    Logger.error(`Webhook retry-${retries} failed`)
    if (retries === 0) {
      Logger.error("All webhook retries failed")
      return
    }
    return setTimeout(() => {
      sendUpdateToCallback(data, callbackUrl, retries-= 1)
    }, DELAY_BETWEEN_RETRIES_IN_SECONDS);
  }
}