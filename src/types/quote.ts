export type acceptQuoteProps = {
  id: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankCode: string;
  descriptionHash: string;
  memo?: string;
};

export type Quote = {
  success: boolean;
  message?: string;
  data?: {
    id: "string";
    exchangeRate: "number";
    sourceCurrency: "string";
    targetCurrency: "string";
    transactionFeesInSourceCurrency: "number";
    transactionFeesInTargetCurrency: "string";
    amountInSourceCurrency: "number";
    amountInTargetCurrency: "string";
    paymentMethod: "string";
    expiry: "string";
    isValid: "boolean";
  };
};