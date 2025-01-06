import { IsString, IsOptional, IsNumber, IsEnum, IsArray, ValidateNested, IsUUID, Min, IsJSON } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '@prisma/client';

export class CreateProductPriceDto {
  @IsUUID()
  currencyId: string;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateProductVariantDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  inventoryQuantity: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightValue?: number;

  @IsOptional()
  @IsString()
  weightUnit?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductPriceDto)
  prices: CreateProductPriceDto[];


  @IsJSON()
  attributes: Record<string, any>;
}

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  collectionIds?: string[];

  @IsOptional()
  @IsString()
  sku?: string;

  @IsNumber()
  @Min(0)
  inventoryQuantity: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightValue?: number;

  @IsOptional()
  @IsString()
  weightUnit?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductPriceDto)
  prices: CreateProductPriceDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];
}

