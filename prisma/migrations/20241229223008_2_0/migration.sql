/*
  Warnings:

  - You are about to drop the column `isPaid` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingMethodId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `phone` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'PARTIALLY_PAID', 'REFUNDED');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('NOT_FULFILLED', 'PARTIALLY_FULFILLED', 'FULFILLED', 'CANCELED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "type" "DiscountType" NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isPaid",
ADD COLUMN     "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'NOT_FULFILLED',
ADD COLUMN     "note" TEXT,
ADD COLUMN     "orderNumber" SERIAL NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "shippingMethodId" TEXT NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL,
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isArchived",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sku" TEXT;

-- CreateTable
CREATE TABLE "ShippingMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "estimatedDeliveryTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_sku_key" ON "Variant"("sku");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "ShippingMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
