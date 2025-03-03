-- CreateTable
CREATE TABLE "Testimony" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Testimony_pkey" PRIMARY KEY ("id")
);
