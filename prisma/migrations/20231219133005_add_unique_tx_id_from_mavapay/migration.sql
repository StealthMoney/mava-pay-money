/*
  Warnings:

  - A unique constraint covering the columns `[txId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `txId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "txId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txId_key" ON "Transaction"("txId");
