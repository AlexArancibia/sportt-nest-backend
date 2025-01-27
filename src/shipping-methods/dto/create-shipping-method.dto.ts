import { IsString, IsNumber, IsOptional, IsBoolean, Min } from "class-validator"

export class CreateShippingMethodDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  @Min(0)
  price: number

  @IsOptional()
  @IsString()
  estimatedDeliveryTime?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}

