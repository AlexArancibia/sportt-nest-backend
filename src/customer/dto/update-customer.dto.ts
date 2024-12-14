import { IsOptional, IsString, IsInt, IsEmail, IsUUID } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  phone?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUUID()
  storeId?: string;  // Relación con la tienda
}
