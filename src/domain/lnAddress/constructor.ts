import { MAX_SPENDABLE, MIN_SPENDABLE } from "@/config/default";
import { MAVAPAY_MONEY_DOMAIN } from "@/config/process";

export const buildResponse = (
  hostname: string,
  addressName: string,
) => {
  return {
    callback: `${hostname}/lnurlpay/${addressName}`,
    maxSendable: MAX_SPENDABLE,
    minSendable: MIN_SPENDABLE,
    metadata: `[[\"text/plain\",\"Payment to ${addressName}\"],[\"text/identifier\",\"${addressName}@${MAVAPAY_MONEY_DOMAIN}\"]]`,
    tag: "payRequest",
  };
};