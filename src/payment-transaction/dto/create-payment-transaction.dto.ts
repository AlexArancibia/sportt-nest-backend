import { IsString, IsNumber, IsOptional, IsUUID, IsJSON } from "class-validator"
import { Type } from "class-transformer"

export class CreatePaymentTransactionDto {
  @IsUUID()
  orderId: string

  @IsUUID()
  paymentProviderId: string

  @IsNumber()
  @Type(() => Number)
  amount: number

  @IsUUID()
  currencyId: string

  @IsString()
  status: string

  @IsOptional()
  @IsString()
  transactionId?: string

  @IsOptional()
  @IsString()
  paymentMethod?: string

  @IsOptional()
  @IsString()
  errorMessage?: string

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>
}

