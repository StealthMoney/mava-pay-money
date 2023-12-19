import { type NextRequest } from "next/server";
import { validateLNAddress } from "@/domain/lnAddress/validation";
import { UserRepository } from "@/services/prisma/repository/user";
import { MAX_SPENDABLE, MIN_SPENDABLE } from "@/config/default";

export async function GET(request: NextRequest, context: { params: any }) {
  const lnAddress = context.params?.username;
  const validateAddress = validateLNAddress(lnAddress);
  if (validateAddress instanceof Error) {
    return new Response(stringifyError(validateAddress), {
      status: 500,
      statusText: validateAddress?.message,
    });
  }

  try {
    const user = await UserRepository().getUserBylnAddress(`${lnAddress}@mavapay.money`);

    if (user instanceof Error) {
      return new Response(stringifyError(user), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const hostname = "https://mavapay.money";
    
    const responseJson = buildResponse(hostname, validateAddress.addressName, lnAddress)

    return new Response(JSON.stringify(responseJson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    const errorMessage = "Internal Server Error";
    return new Response(stringifyError(err, errorMessage), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      statusText: err?.message ?? "Error getting address",
    });
  }
}

const stringifyError = (
  err: any,
  customMessage: string = "Something went wrong"
) => {
  let errMessage;
  if (err instanceof Error) errMessage = err.message;
  else errMessage = customMessage;
  return JSON.stringify({
    status: "Error",
    reason: errMessage,
  });
};

const buildResponse = (
  hostname: string,
  addressName: string,
  lnAddress: string
) => {
  return {
    callback: `${hostname}/lnurlpay/${addressName}`,
    maxSendable: MAX_SPENDABLE,
    minSendable: MIN_SPENDABLE,
    metadata: `[[\"text/plain\",\"Payment to ${addressName}\"],[\"text/identifier\",\"${lnAddress}\"]]`,
    tag: "payRequest",
  };
};
