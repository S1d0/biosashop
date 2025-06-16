/*
  Warnings:

  - You are about to drop the column `delivered` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payed` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentResult` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `items` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivered",
DROP COLUMN "deliveredAt",
DROP COLUMN "payed",
DROP COLUMN "payedAt",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentResult",
DROP COLUMN "shippingPrice",
ADD COLUMN     "deliveryInfo" JSON,
ADD COLUMN     "items" JSON NOT NULL,
ADD COLUMN     "paymentInfo" JSON,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "OrderItem";

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
