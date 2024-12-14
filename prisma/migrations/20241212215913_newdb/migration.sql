/*
  Warnings:

  - You are about to drop the column `storeId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `phone` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `attributes` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CUSTOMER', 'SELLER');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "storeId",
DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "storeId",
ADD COLUMN     "couponId" TEXT,
ALTER COLUMN "phone" SET DEFAULT ' ',
ALTER COLUMN "address" SET DEFAULT ' ';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isFeatured",
DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "color",
DROP COLUMN "name",
DROP COLUMN "size",
ADD COLUMN     "attributes" JSONB NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "conditions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
