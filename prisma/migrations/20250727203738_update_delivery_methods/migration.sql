/*
  Warnings:

  - The values [parcel] on the enum `DeliveryMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryMethod_new" AS ENUM ('pickup', 'standard', 'express', 'parcel_locker', 'company');
ALTER TABLE "DeliveryOption" ALTER COLUMN "method" TYPE "DeliveryMethod_new" USING ("method"::text::"DeliveryMethod_new");
ALTER TYPE "DeliveryMethod" RENAME TO "DeliveryMethod_old";
ALTER TYPE "DeliveryMethod_new" RENAME TO "DeliveryMethod";
DROP TYPE "DeliveryMethod_old";
COMMIT;
