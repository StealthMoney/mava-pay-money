-- DropIndex
DROP INDEX "Account_accountNumber_key";

-- DropIndex
DROP INDEX "Account_lnAddress_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "userEmail" TEXT DEFAULT '';

-- UpdateData
UPDATE "Account" SET "userEmail" = "User"."email" FROM "User" WHERE "Account"."userId" = "User"."id";

-- AlterTable
ALTER TABLE "KYCInfo" ADD COLUMN     "userEmail" TEXT DEFAULT '';

-- UpdateData
UPDATE "KYCInfo" SET "userEmail" = "User"."email" FROM "User" WHERE "KYCInfo"."userId" = "User"."id";

-- AlterTable
ALTER TABLE "Verification" ADD COLUMN     "userEmail" TEXT DEFAULT '';

-- UpdateData
UPDATE "Verification" SET "userEmail" = "User"."email" FROM "User" WHERE "Verification"."userId" = "User"."id";

-- CreateTable
CREATE TABLE "LnAddress" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LnAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LnAddress_userEmail_key" ON "LnAddress"("userEmail");
CREATE UNIQUE INDEX "LnAddress_address_key" ON "LnAddress"("address");

-- AddForeignKey
ALTER TABLE "LnAddress" ADD CONSTRAINT "LnAddress_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- UpdateData
UPDATE "LnAddress" SET "userEmail" = "User"."email" FROM "User" WHERE "LnAddress"."userEmail" = "User"."email";

-- get the lnAddresses from Account table using the userId and insert them into the LnAddress table
INSERT INTO "LnAddress" ("userEmail", "address", "createdAt", "updatedAt")
SELECT "User"."email", "Account"."lnAddress", "Account"."createdAt", "Account"."updatedAt"
FROM "Account"
JOIN "User" ON "Account"."userEmail" = "User"."email";

