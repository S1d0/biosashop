-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESPONDED', 'RESOLVED', 'SPAM');

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

-- CreateIndex
CREATE INDEX "CustomerEnquiry_email_idx" ON "CustomerEnquiry"("email");

-- CreateIndex
CREATE INDEX "CustomerEnquiry_status_idx" ON "CustomerEnquiry"("status");

-- CreateIndex
CREATE INDEX "CustomerEnquiry_createdAt_idx" ON "CustomerEnquiry"("createdAt");
