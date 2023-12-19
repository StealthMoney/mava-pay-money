import { WalletCurrencyType } from "./wallet";

export type PaymentStatus = "INACTIVE" | "PENDING" | "PAID" | "EXPIRED";

export type Transaction = {
  amount: number;
  autopayout: boolean;
  createdAt: string;
  currency: WalletCurrencyType;
  fees: number;
  hash: string;
  id: string;
  ref: string;
  status: PaymentStatus;
  transactionMetadata: TransactionMetadata;
  type: "DEPOSIT" | "WITHDRAWAL";
  updatedAt: string;
};

type TransactionMetadata = {
  id: string;
  orderId: string;
  tyrusRef: null;
  bankCode: string;
  bankName: string;
};
