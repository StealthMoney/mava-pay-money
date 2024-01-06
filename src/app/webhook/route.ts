import { type NextRequest } from "next/server";
import { Transaction } from "@/types/transaction";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { OrderRepository } from "@/services/prisma/repository/order";
import { Logger } from "@/config/logger";

export async function POST(request: NextRequest, context: { params: any }) {
  const requestbody = (await request.json()) as {
    event: string;
    data: Transaction;
  };
  console.log("a request came through", requestbody);

  if (requestbody.event === "ping") {
    return new Response("success", {
      status: 200,
    });
  }

  const order = await OrderRepository().getOrderByOrderId(
    requestbody.data.transactionMetadata.orderId
  );

  if (order instanceof Error) {
    Logger.error(order.message);
    return new Response(parseResponseBody({
      message: order.message
    }), {
      status: 404,
    });
  }

  const txHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(requestbody.data))
    .digest("hex");

  const { ref, amount, id, type, status, createdAt, updatedAt } = requestbody.data;
  await prisma.transaction.upsert({
    where: { txId: id },

    update: {
      txId: id,
      txHash,
      orderId: order.orderId,
      ref,
      amount,
      type,
      status,
      createdAt,
      updatedAt,
    },
    create: {
      txId: id,
      txHash,
      orderId: order.orderId,
      ref,
      amount,
      type,
      status,
      createdAt,
      updatedAt,
    },
  });

  if (status === "FAILED") {
    await OrderRepository().updateOrder({
      order: { status: "FAILED" },
      orderId: order.orderId,
    });
    return new Response("success", {
      status: 200,
    });
  }

  switch (requestbody.event) {
    case "payment.received":
      if (type === "DEPOSIT" && status === "SUCCESS") {
        await OrderRepository().updateOrder({
          order: { status: "PAYMENT_RECEIVED" },
          orderId: order.orderId,
        });
      }
      break;
    case "payment.sent":
      if (type === "WITHDRAWAL" && status === "SUCCESS") {
        await OrderRepository().updateOrder({
          order: { status: "PAYMENT_SENT" },
          orderId: order.orderId,
        });
      }
      break;
    default:
      break;
  }
  return new Response("success", {
    status: 200,
  });
}

const parseResponseBody = (data: any) => {
  return JSON.stringify(data)
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
