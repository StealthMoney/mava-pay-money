import { type NextRequest } from "next/server";
import { validateAmount, validateLNAddress } from "@/domain/lnAddress/validation";
import { UserRepository } from "@/services/prisma/repository/user";
import { MAVAPAY_MONEY_DOMAIN } from "@/config/process";
import { acceptQuote, getQuote } from "@/services/mavapay";

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
  
  const user = await UserRepository().getUserBylnAddress(lnAddress);

  if (user instanceof Error) {
    return new Response(stringifyError(user), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const quote = await getQuote({amount: validatedAmount})
    
    if (!quote.success || !quote.data) {
      return new Response(stringifyError(quote, quote.message), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const quoteId = quote.data.id

    const metadataString = buildResponse("", username, lnAddress).metadata;

    const order = await acceptQuote({
      id: quoteId,
      bankAccountName: user.account?.accountName ?? "",
      bankAccountNumber: user.account?.accountNumber ?? "",
      bankCode: user.account?.bankCode.toString() ?? "",
      descriptionHash: metadataString
    })

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
