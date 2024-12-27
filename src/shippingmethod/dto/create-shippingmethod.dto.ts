import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateShippingMethodDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  estimatedDeliveryTime: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}