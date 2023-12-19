import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  RepositoryError,
  UnknownRepositoryError,
  parseErrorMessageFromUnknown,
} from "@/domain/error";
import { Logger } from "@/config/logger";

export const AccountRepository = () => {
  const create = async (account: Prisma.AccountCreateInput) => {
    try {
      const newAccount = await prisma.account.create({ data: account });
      if (!newAccount) {
        return new RepositoryError("Could not create account");
      }

      return newAccount;
    } catch (error) {
      const err = error as unknown as Error;
      switch (err.name) {
        case "SequelizeUniqueConstraintError":
          return new RepositoryError("Account already exists");
        default:
          break;
      }
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const updateAccount = async ({
    account,
    userId,
  }: {
    account: Prisma.AccountUpdateInput;
    userId: number;
  }) => {
    try {
      const updatedAccount = await prisma.account.update({
        where: { id: userId },
        data: account,
      });
      if (!updatedAccount.id) {
        return new RepositoryError("Could not update account");
      }
      return true;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getAccountById = async (accountId: number) => {
    try {
      const account = await prisma.account.findUnique({
        where: {
          id: accountId,
        },
      });
      if (!account) {
        return new RepositoryError("Account not found");
      }
      return account;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getAccountBylnAddress = async (lnAddress: string) => {
    try {
      const account = await prisma.account.findFirst({
        where: {
          lnAddress: lnAddress,
        },
      });
      if (!account) {
        return new RepositoryError("Account not found");
      }
      return account;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  return {
    create,
    updateAccount,
    getAccountById,
    getAccountBylnAddress,
  };
};
