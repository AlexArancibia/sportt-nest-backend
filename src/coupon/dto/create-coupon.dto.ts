import { IsString, IsOptional, IsEnum, IsDecimal, IsInt, IsBoolean, IsDate, IsUUID, Min } from "class-validator"
import { Type } from "class-transformer"
import { DiscountType } from "@prisma/client"

export class CreateCouponDto {
  @IsString()
  code: string

  @IsOptional()
  @IsString()
  description?: string

  @IsEnum(DiscountType)
  type: DiscountType

  @IsDecimal()
  @Type(() => Number)
  value: number

  @IsOptional()
  @IsDecimal()
  @Type(() => Number)
  minPurchase?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  maxUses?: number

  @IsDate()
  @Type(() => Date)
  startDate: Date

  @IsDate()
  @Type(() => Date)
  endDate: Date

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsUUID(4, { each: true })
  applicableProductIds?: string[]

  @IsOptional()
  @IsUUID(4, { each: true })
  applicableCategoryIds?: string[]

  @IsOptional()
  @IsUUID(4, { each: true })
  applicableCollectionIds?: string[]
}

