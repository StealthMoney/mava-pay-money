import { type NextRequest } from "next/server";
import { validateAmount, validateLNAddress } from "@/domain/lnAddress/validation";
import { UserRepository } from "@/services/prisma/repository/user";
import { MAVAPAY_MONEY_DOMAIN } from "@/config/process";
import { acceptQuote, getQuote } from "@/services/mavapay";
import { TransactionRepository } from "@/services/prisma/repository/transaction";
import { milliSatsToSats } from "@/utils/conversion";
import { prisma } from "@/lib/prisma";
import { AccountRepository } from "@/services/prisma/repository/account";
import { buildResponse } from "@/domain/lnAddress/constructor";
import { Quote } from "@/types/quote";
import { Order } from "@/types/order";
import { MAX_SPENDABLE, MIN_SPENDABLE } from "@/config/default";

export async function GET(request: NextRequest, context: { params: any }) {
  const reqUsername = context.params?.username;
  const username = reqUsername?.toLowerCase()
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

  const sats = milliSatsToSats(validatedAmount)

  if (sats instanceof Error) {
    return new Response(stringifyError(sats), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const lnAddress = username
  const validateAddress = validateLNAddress(lnAddress);
  if (validateAddress instanceof Error) {
    return new Response(stringifyError(validateAddress), {
      status: 500,
      statusText: validateAddress?.message,
    });
  }
  
  const user = await UserRepository().getUserBylnAddress(`${lnAddress}@mavapay.money`);

  if (user instanceof Error) {
    return new Response(stringifyError(user), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const account = await AccountRepository().getAccountByUserId(user.id)

  if (account instanceof Error) {
    return new Response(stringifyError(account), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const quote = await getQuote({amount: sats})
    
    if (!quote.success || !quote.data) {
      return new Response(stringifyError(quote, quote.message), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("quote", quote.data)

    const quoteId = quote.data.id

    const metadataString = buildResponse("", username, lnAddress).metadata;

    const order = await acceptQuote({
      id: quoteId,
      bankAccountName: account.accountName,
      bankAccountNumber: account.accountNumber,
      bankCode: account.bankCode.toString(),
      descriptionHash: metadataString
    })

    if (!order.success || !order.data) {
      return new Response(stringifyError(order, order.message), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("order", order.data)

    const newOrder = await prisma.order.create({data: {
      accountId: account.id,
      orderId: order.data.orderId,
      quoteId: order.data.quoteId,
      paymentMethod: "LIGHTNING",
      amount: Number(quote.data.amountInSourceCurrency),
      targetAmount: quote.data.amountInTargetCurrency,
      status: "PENDING",
      isValid: order.data.isValid,
      invoice: order.data.paymentBtcDetail,
      createdAt: order.data.createdAt,
      expiryTime: quote.data.expiry,
    }})
    console.log({newOrder})

    const lnResponse = buildLnResponse(quote.data, order.data)
    return new Response(JSON.stringify(lnResponse), {
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


const buildLnResponse = (quote: Quote["data"], order: Order) => {
  const {id, isValid, ...rest } = quote!
  return {
    routes: [],
    pr: order.paymentBtcDetail,
    data: {...rest},
    minSpendable: MIN_SPENDABLE,
    maxSpendable: MAX_SPENDABLE
  }
}