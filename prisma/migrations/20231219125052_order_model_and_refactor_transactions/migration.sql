/*
  Warnings:

  - The values [PENDING] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `TransactionMetadata` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[txHash]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txHash` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'EXPIRED', 'PAYMENT_RECEIVED', 'PAYMENT_SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('NGN', 'BTC', 'USD');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BTC', 'LIGHTNING');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionStatus_new" AS ENUM ('SUCCESS', 'FAILED');
ALTER TABLE "Transaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "TransactionStatus_new" USING ("status"::text::"TransactionStatus_new");
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "TransactionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "TransactionMetadata" DROP CONSTRAINT "TransactionMetadata_TransactionId_fkey";

-- DropIndex
DROP INDEX "Transaction_accountId_key";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "ref" TEXT NOT NULL,
ADD COLUMN     "txHash" TEXT NOT NULL,
ADD COLUMN     "type" "TransactionType" NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- DropTable
DROP TABLE "TransactionMetadata";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "amount" BIGINT NOT NULL,
    "targetAmount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "isValid" BOOLEAN NOT NULL,
    "invoice" TEXT NOT NULL,
    "expiryTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_accountId_key" ON "Order"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txHash_key" ON "Transaction"("txHash");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
