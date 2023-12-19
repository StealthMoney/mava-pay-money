import { type NextRequest } from "next/server";
import { validateAmount, validateLNAddress } from "@/domain/lnAddress/validation";
import { UserRepository } from "@/services/prisma/repository/user";
import { MAVAPAY_MONEY_DOMAIN } from "@/config/process";

export async function POST(request: NextRequest, context: { params: any }) {
  const username = context.params?.username;
  const searchParams = request.nextUrl.searchParams;
  const amount = searchParams.get("amount");

  console.log("a request came through", request.body)
  return new Response("success", {
    status: 200,
  });
  
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

