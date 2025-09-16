/*
  Warnings:

  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `UserDetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email,orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_customerId_idx";

-- DropIndex
DROP INDEX "Order_customerId_orderNumber_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId",
ADD COLUMN     "email" UUID;

-- DropTable
DROP TABLE "UserDetail";

-- CreateIndex
CREATE INDEX "Order_email_idx" ON "Order"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_email_orderNumber_key" ON "Order"("email", "orderNumber");
