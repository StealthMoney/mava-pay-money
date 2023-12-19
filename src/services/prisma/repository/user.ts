import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  RepositoryError,
  UnknownRepositoryError,
  parseErrorMessageFromUnknown,
} from "@/domain/error";
import { Logger } from "@/config/logger";

type UserType = Prisma.UserCreateInput;

// interface IUserRepository {
//   create: (user: UserType) => Promise<UserType | RepositoryError>;
//   updateUser: ({
//     user,
//     userId,
//   }: {
//     user: UserType;
//     userId: number;
//   }) => Promise<true | RepositoryError>;
//   getUserById: (userId: number) => Promise<(UserType & {id: number}) | RepositoryError>;
//   getUserBylnAddress: (lnAddress: string) => Promise<UserType | RepositoryError>;
//   getUserByEmail: (email: string) => Promise<UserType | RepositoryError>;
//   getUserByAccountId: (
//     accountId: number
//   ) => Promise<UserType | RepositoryError>;
// }

export const UserRepository = () => {
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
        select: {
          id: true,
          name: true,
          email: true,
          verified: true,
          account: true,
        }
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
        select: {
          id: true,
          name: true,
          email: true,
          verified: true,
          account: true,
        }
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
        select: {
          id: true,
          name: true,
          email: true,
          verified: true,
          account: true,
        }
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
        select: {
          id: true,
          name: true,
          email: true,
          verified: true,
          account: true,
        }
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
