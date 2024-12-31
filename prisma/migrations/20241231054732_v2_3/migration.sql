/*
  Warnings:

  - You are about to drop the column `imageId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_imageId_fkey";

-- DropIndex
DROP INDEX "Collection_imageId_key";

-- DropIndex
DROP INDEX "ProductVariant_imageId_key";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "id" SET DEFAULT 'addr_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT 'cat_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "id" SET DEFAULT 'col_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "id" SET DEFAULT 'cont_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Currency" ALTER COLUMN "id" SET DEFAULT 'curr_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "id" SET DEFAULT 'cu_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "CustomerAddress" ALTER COLUMN "id" SET DEFAULT 'addr_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "ExchangeRate" ALTER COLUMN "id" SET DEFAULT 'exr_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Fulfillment" ALTER COLUMN "id" SET DEFAULT 'ful_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "FulfillmentLineItem" ALTER COLUMN "id" SET DEFAULT 'fli_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT 'loc_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT 'ord_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "OrderDiscountCode" ALTER COLUMN "id" SET DEFAULT 'odc_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "id" SET DEFAULT 'oi_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "OrderItemDiscountAllocation" ALTER COLUMN "id" SET DEFAULT 'oida_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "OrderItemTaxLine" ALTER COLUMN "id" SET DEFAULT 'oitl_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "OrderTaxLine" ALTER COLUMN "id" SET DEFAULT 'otl_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "PaymentProvider" ALTER COLUMN "id" SET DEFAULT 'pp_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrls" TEXT[],
ALTER COLUMN "id" SET DEFAULT 'prod_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "ProductPrice" ALTER COLUMN "id" SET DEFAULT 'pp_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "imageId",
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "id" SET DEFAULT 'var_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "Refund" ALTER COLUMN "id" SET DEFAULT 'ref_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "RefundLineItem" ALTER COLUMN "id" SET DEFAULT 'rli_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "ShippingMethod" ALTER COLUMN "id" SET DEFAULT 'sm_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "ShopSettings" ALTER COLUMN "id" SET DEFAULT 'shop_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT 'user_' || substr(gen_random_uuid()::text, 1, 13);

-- AlterTable
ALTER TABLE "VariantPrice" ALTER COLUMN "id" SET DEFAULT 'vp_' || substr(gen_random_uuid()::text, 1, 13);

-- DropTable
DROP TABLE "Image";
