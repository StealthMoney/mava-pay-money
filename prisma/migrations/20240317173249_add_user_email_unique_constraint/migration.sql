/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `KYCInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userEmail` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userEmail` on table `KYCInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userEmail` on table `Verification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "KYCInfo" DROP CONSTRAINT "KYCInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_userId_fkey";

-- DropIndex
DROP INDEX "Account_userId_key";

-- DropIndex
DROP INDEX "KYCInfo_userId_key";

-- DropIndex
DROP INDEX "Verification_userId_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "userEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "KYCInfo" ALTER COLUMN "userEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Verification" ALTER COLUMN "userEmail" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_userEmail_key" ON "Account"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "KYCInfo_userEmail_key" ON "KYCInfo"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_userEmail_key" ON "Verification"("userEmail");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KYCInfo" ADD CONSTRAINT "KYCInfo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
