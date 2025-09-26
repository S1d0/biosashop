-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "userId" UUID,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "stripeCustomerId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "public"."Order"("userId");
