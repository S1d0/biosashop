/*
  Warnings:

  - You are about to drop the column `itemsPrice` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `sessionCartId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPrice` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cart_sessionCartId_idx";

-- DropIndex
DROP INDEX "Cart_userId_idx";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "itemsPrice",
DROP COLUMN "sessionCartId",
DROP COLUMN "shippingPrice",
DROP COLUMN "totalPrice",
DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "Cart_createdAt_idx" ON "Cart"("createdAt");
