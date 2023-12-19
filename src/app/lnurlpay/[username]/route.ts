import { type NextRequest } from "next/server";
import { validateAmount, validateLNAddress } from "@/domain/lnAddress/validation";
import { UserRepository } from "@/services/prisma/repository/user";
import { MAVAPAY_MONEY_DOMAIN } from "@/config/process";

export async function GET(request: NextRequest, context: { params: any }) {
  const username = context.params?.username;
  const searchParams = request.nextUrl.searchParams;
  const amount = searchParams.get("amount");

  const validatedAmount = validateAmount(amount)
  
  if (validatedAmount instanceof Error) {
    return new Response(stringifyError(validatedAmount), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const lnAddress = `${username}@${MAVAPAY_MONEY_DOMAIN}`
  const validateAddress = validateLNAddress(lnAddress);
  if (validateAddress instanceof Error) {
    return new Response(stringifyError(validateAddress), {
      status: 500,
      statusText: validateAddress?.message,
    });
  }

  try {
    const user = await UserRepository().getUserBylnAddress(lnAddress);

    if (user instanceof Error) {
      return new Response(stringifyError(user), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const hostname = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : request.nextUrl.origin;
    
    const responseJson = buildResponse(hostname, validateAddress.addressName, lnAddress)

    // return new Response(JSON.stringify(responseJson), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  } catch (err: any) {
    const errorMessage = "Internal Server Error";
    return new Response(stringifyError(err, errorMessage), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      statusText: err?.message ?? "Error generating feed",
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
    maxSendable: 100000000,
    minSendable: 10000,
    metadata: `[[\"text/plain\",\"Payment to ${addressName}\"],[\"text/identifier\",\"${lnAddress}\"]]`,
    tag: "payRequest",
  };
};
