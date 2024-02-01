import { DELAY_BETWEEN_RETRIES_IN_SECONDS, SIGNATURE_HEADER, WEBHOOK_RETRIES } from "@/config/default";
import { Logger } from "@/config/logger";
import { ReceivedWebhookPayload, SentWebhookPayload } from "@/types/webhook";
import { generateDigitalSignature, validateDigitalSignature } from "./signature";
import axios from "axios";
import { NextRequest } from "next/server";

export const constructNewPayload = (receivedPayload: ReceivedWebhookPayload, txHash: string) => {
  return {...receivedPayload, data: {...receivedPayload.data, txHash}} as SentWebhookPayload;
}

export const verifyWebhookSignature = async (request: NextRequest) => {
  const receivedSignature = request.headers.get(SIGNATURE_HEADER) ?? ""
  const requestbody = (await request.json()) as ReceivedWebhookPayload
  const data = JSON.stringify(requestbody.data)
  return validateDigitalSignature(data, receivedSignature)
}

export const sendUpdateToCallback = async (data: SentWebhookPayload, callbackUrl: string, retries = WEBHOOK_RETRIES) => {
  const signature = generateDigitalSignature(JSON.stringify(data.data))

  const res = await axios.post(callbackUrl, data, {
    headers: {
      [SIGNATURE_HEADER]: signature
    }
  })
  console.log("res ", res.status)
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