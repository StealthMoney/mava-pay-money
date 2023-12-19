import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  RepositoryError,
  UnknownRepositoryError,
  parseErrorMessageFromUnknown,
} from "@/domain/error";
import { Logger } from "@/config/logger";

export const OrderRepository = () => {
  const create = async (order: Prisma.OrderCreateInput) => {
    try {
      const newOrder = await prisma.order.create({ data: order });
      if (!newOrder) {
        return new RepositoryError("Could not create order");
      }

      return newOrder;
    } catch (error) {
      const err = error as unknown as Error;
      switch (err.name) {
        case "SequelizeUniqueConstraintError":
          return new RepositoryError("Order already exists");
        default:
          break;
      }
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const updateOrder = async ({
    order,
    orderId,
  }: {
    order: Prisma.OrderUpdateInput;
    orderId: string;
  }) => {
    try {
      const updatedOrder = await prisma.order.update({
        where: { orderId: orderId },
        data: order,
      });
      if (!updatedOrder.id) {
        return new RepositoryError("Could not update order");
      }
      return true;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getOrderById = async (transactionId: number) => {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: transactionId,
        },
      });
      if (!order) {
        return new RepositoryError("Order not found");
      }
      return order;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };

  const getOrderByOrderId = async (orderId: string) => {
    try {
      const order = await prisma.order.findUnique({
        where: {
          orderId: orderId,
        },
      });
      if (!order) {
        return new RepositoryError("Order not found");
      }
      return order;
    } catch (error) {
      Logger.error(error);
      const errMsg = parseErrorMessageFromUnknown(error);
      return new UnknownRepositoryError(errMsg);
    }
  };


  return {
    create,
    updateOrder,
    getOrderById,
    getOrderByOrderId,
  };
};
