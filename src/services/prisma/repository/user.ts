import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  RepositoryError,
  UnknownRepositoryError,
  parseErrorMessageFromUnknown,
} from "@/domain/error";
import { Logger } from "@/config/logger";

type UserType = Prisma.UserCreateInput;
// type HLK = Prisma.User
type UserWithAccount = Prisma.UserInclude["account"]
type AccountType = Prisma.AccountCreateArgs["data"];
type KycInfoType = Prisma.KYCInfoCreateArgs["data"];

interface IUserRepository {
  create: (user: UserType) => Promise<UserType | RepositoryError>;
  updateUser: ({
    user,
    userId,
  }: {
    user: UserType;
    userId: number;
  }) => Promise<true | RepositoryError>;
  getUserById: (userId: number) => Promise<(UserType & {id: number}) | RepositoryError>;
  getUserBylnAddress: (userId: number) => Promise<UserType | RepositoryError>;
  getUserByEmail: (email: string) => Promise<UserType | RepositoryError>;
  getUserByAccountId: (
    accountId: number
  ) => Promise<UserType | RepositoryError>;
}

export const UserRepository = (): IUserRepository => {
  const create = async (user: UserType) => {
    try {
      const newUser = await prisma.user.create({ data: user });
      if (!newUser) {
        return new RepositoryError("Could not create user");
      }

      return newUser;
    } catch (error) {
      const err = error as unknown as Error;
      switch (err.name) {
        case "SequelizeUniqueConstraintError":
          return new RepositoryError("User already exists");
        default:
          break;
      }
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const updateUser = async ({
    user,
    userId,
  }: {
    user: UserType;
    userId: number;
  }) => {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: user,
      });
      if (!updatedUser.id) {
        return new RepositoryError("Could not update user");
      }
      return true;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getUserById = async (userId: number) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          account: true,
        },
      });
      if (!user) {
        return new RepositoryError("User not found");
      }
      return user;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getUserByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          account: true,
        },
      });
      if (!user) {
        return new RepositoryError("User not found");
      }
      return user;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getUserBylnAddress = async (lnAddress: string) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          account: {
            lnAddress: lnAddress
          },
        },
        include: {
          account: true,
        },
      });
      if (!user) {
        return new RepositoryError("User not found");
      }
      return user;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getUserByAccountId = async (accountId: number) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          account: {
            id: accountId
          },
        },
        include: {
          account: true,
        },
      });
      if (!user) {
        return new RepositoryError("User not found");
      }
      return user;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  return {
    create,
    updateUser,
    getUserById,
    getUserBylnAddress,
    getUserByEmail,
    getUserByAccountId,
  };
};
