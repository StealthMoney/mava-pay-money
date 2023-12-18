import { type NextRequest } from "next/server";
import { validateLNAddress } from "@/domain/lnAddress/validation";
import { UserRepository } from "@/services/prisma/repository/user";

export async function GET(request: NextRequest, context: { params: any }) {
  const lnAddress = context.params?.username
  const validateAddress = validateLNAddress(lnAddress)
  if (validateAddress instanceof Error) {
    return new Response(stringifyError(validateAddress), {
      status: 500,
      statusText: validateAddress?.message
    })
  }
  
  try {
    const user = await UserRepository().getUserBylnAddress(lnAddress)
    console.log({user})
    return new Response("sd", {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (err: any) {
    const errorMessage = "Internal Server Error"
    return new Response(stringifyError(err, errorMessage), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
      statusText: err?.message ?? "Error generating feed"
    })
  }
}

const stringifyError = (err: any, customMessage: string = "Something went wrong") => {
  let errMessage
  if (err instanceof Error) errMessage = err.message
  else errMessage = customMessage 
  return JSON.stringify({message: errMessage})
}
