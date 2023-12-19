-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionMetadata" (
    "id" SERIAL NOT NULL,
    "TransactionId" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "quote" TEXT NOT NULL,
    "invoice" TEXT NOT NULL,
    "ref" TEXT NOT NULL,

    CONSTRAINT "TransactionMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_accountId_key" ON "Transaction"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionMetadata_TransactionId_key" ON "TransactionMetadata"("TransactionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionMetadata" ADD CONSTRAINT "TransactionMetadata_TransactionId_fkey" FOREIGN KEY ("TransactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
