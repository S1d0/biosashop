-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('pickup', 'standard', 'express', 'parcel');

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
