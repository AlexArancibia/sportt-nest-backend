import { IsString, IsOptional, IsBoolean, IsDate, IsDecimal, IsArray, ValidateNested, IsUUID } from "class-validator"
import { Type } from "class-transformer"

class CreateRefundLineItemDto {
  @IsUUID()
  orderItemId: string

  @IsDecimal()
  @Type(() => Number)
  quantity: number

  @IsDecimal()
  @Type(() => Number)
  amount: number

  @IsOptional()
  @IsBoolean()
  restocked?: boolean
}

export class CreateRefundDto {
  @IsUUID()
  orderId: string

  @IsDecimal()
  @Type(() => Number)
  amount: number

  @IsOptional()
  @IsString()
  note?: string

  @IsOptional()
  @IsBoolean()
  restock?: boolean

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  processedAt?: Date

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRefundLineItemDto)
  lineItems: CreateRefundLineItemDto[]
}

