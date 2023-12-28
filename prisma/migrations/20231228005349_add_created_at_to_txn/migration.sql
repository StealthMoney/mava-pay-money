/*
  Warnings:

  - Added the required column `createdAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "createdAt" TEXT NOT NULL;
