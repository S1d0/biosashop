/*
  Warnings:

  - You are about to alter the column `email` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(254)`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "email" SET DATA TYPE VARCHAR(254);

-- CreateIndex
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");
