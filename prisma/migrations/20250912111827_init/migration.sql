-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESPONDED', 'RESOLVED', 'SPAM');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('pickup', 'standard', 'express', 'parcel_locker', 'company');

-- CreateTable
CREATE TABLE "ProductFamily" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "features" TEXT[],
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "price" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "size" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cldImage" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerEnquiry" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerEnquiry_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "customerId" UUID,
    "orderNumber" INTEGER,
    "shippingAddress" JSON,
    "items" JSON NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "deliveryInfo" JSON,
    "paymentInfo" JSON,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOption" (
    "id" UUID NOT NULL,
    "method" "DeliveryMethod" NOT NULL,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetail" (
    "email" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_family_idx" ON "ProductFamily"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_variant_idx" ON "ProductVariant"("slug");

-- CreateIndex
CREATE INDEX "ProductVariant_familyId_idx" ON "ProductVariant"("familyId");

-- CreateIndex
CREATE INDEX "CustomerEnquiry_email_idx" ON "CustomerEnquiry"("email");

-- CreateIndex
CREATE INDEX "CustomerEnquiry_status_idx" ON "CustomerEnquiry"("status");

-- CreateIndex
CREATE INDEX "CustomerEnquiry_createdAt_idx" ON "CustomerEnquiry"("createdAt");

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "Cart_sessionCartId_idx" ON "Cart"("sessionCartId");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Order_customerId_orderNumber_key" ON "Order"("customerId", "orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_email_key" ON "UserDetail"("email");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "ProductFamily"("id") ON DELETE CASCADE ON UPDATE CASCADE;
