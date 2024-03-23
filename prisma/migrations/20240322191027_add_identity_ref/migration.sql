-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NULL');

-- AlterEnum
ALTER TYPE "KYCStatus" ADD VALUE 'NOT_SUBMITTED';

-- AlterTable
ALTER TABLE "KYCInfo" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'NULL',
ADD COLUMN     "identityRef" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "status" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ExternalAccountKeys" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExternalAccountKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExternalAccountKeys_name_key" ON "ExternalAccountKeys"("name");
