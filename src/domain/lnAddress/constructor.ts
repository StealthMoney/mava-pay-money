import { MAX_SPENDABLE, MIN_SPENDABLE } from "@/config/default";

export const buildResponse = (
  hostname: string,
  addressName: string,
  lnAddress: string
) => {
  return {
    callback: `${hostname}/lnurlpay/${addressName}`,
    maxSendable: MAX_SPENDABLE,
    minSendable: MIN_SPENDABLE,
    metadata: `[[\"text/plain\",\"Payment to ${addressName}\"],[\"text/identifier\",\"${addressName}@mavapay.money\"]]`,
    tag: "payRequest",
  };
};