import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  UserRepository,
  AccountRepository,
  // add KYCInfoRepository
} from "@/services/prisma/repository";
import axiosInstance from "@/services/rest/axios";
import { getAccountName, getBankCode } from "@/services/mavapay/bank";

type RequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bvn: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  username: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const requestBody = (await req.json()) as RequestBody;
  const {
    firstName,
    lastName,
    email,
    password,
    bvn,
    bankName,
    bankAccountNumber,
    bankAccountName,
    username,
  } = requestBody;
  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !bvn ||
    !bankName ||
    !bankAccountNumber ||
    !bankAccountName ||
    !username
  ) {
    return new Response("Missing required fields", { status: 400 });
  }

  const userExists = await UserRepository(prisma).getUserByEmail(email);
  if (!(userExists instanceof Error)) {
    return new Response("User already exists", { status: 400 });
  }

  // check bank details are correct
  const bankCode = await getBankCode();
  if (!bankCode.success) {
    return new Response("incorrect bank details", { status: 400 });
  }
  const bankCodeData = bankCode.data;
  const bankCodeDataFiltered = bankCodeData.filter(
    (bank: any) => bank.name.toLowercase() === bankName.toLowerCase()
  );
  if (bankCodeDataFiltered.length === 0) {
    return new Response("incorrect bank details", { status: 400 });
  }
  const accountName = await getAccountName(
    bankAccountNumber,
    bankCodeDataFiltered[0].nipBankCode
  );
  if (!accountName.success) {
    return new Response("incorrect bank details", { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await UserRepository(prisma).create({
        email,
        name: `${firstName} ${lastName}`,
        password,
        verified: false,
      });
      if (user instanceof Error) {
        throw new Error(user.message);
      }

      // Create account
      const account = await AccountRepository(prisma).create({
        userId: user.id,
        bankCode: bankCodeDataFiltered[0].nipBankCode,
        accountNumber: bankAccountNumber,
        accountName: accountName.data.accountName,
        lnAddress: username,
        user: {
          connect: { id: user.id },
        },
      });
      if (account instanceof Error) {
        throw new Error(account.message);
      }

      // Todo: Create KYCInfo
      // const kycInfo = await KYCInfoRepository(prisma).create({ ... });
      // if (kycInfo instanceof Error) {
      //   throw new Error(kycInfo.message);
      // }

      return user;
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while creating user and account", {
      status: 500,
    });
  }
}
