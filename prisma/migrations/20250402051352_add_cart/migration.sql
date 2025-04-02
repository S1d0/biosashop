-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL,
    "userId" TEXT,
    "sessionCartId" TEXT NOT NULL,
    "items" JSON[] DEFAULT ARRAY[]::JSON[],
    "itemsPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "shippingPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "Cart_sessionCartId_idx" ON "Cart"("sessionCartId");
