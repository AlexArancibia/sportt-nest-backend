import { IsString, IsOptional, IsBoolean, IsEnum, IsJSON, IsUUID } from "class-validator"
import { PaymentProviderType } from "@prisma/client"

export class CreatePaymentProviderDto {
  @IsString()
  name: string

  @IsEnum(PaymentProviderType)
  type: PaymentProviderType

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsJSON()
  credentials?: Record<string, any>

  @IsUUID()
  currencyId: string
}

