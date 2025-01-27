import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, ValidateNested, IsArray, IsString, IsBoolean, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateAddressDto {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean

  @IsOptional()
  @IsString()
  company?: string

  @IsOptional()
  @IsString()
  address1?: string

  @IsOptional()
  @IsString()
  address2?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  province?: string

  @IsOptional()
  @IsString()
  zip?: string

  @IsOptional()
  @IsString()
  country?: string

  @IsOptional()
  @IsString()
  phone?: string
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsBoolean()
  acceptsMarketing?: boolean

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  addresses?: UpdateAddressDto[]
}
