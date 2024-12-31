import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, ValidateNested, IsArray, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateCustomerAddressDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsString()
  address1?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateCustomerDto extends PartialType(OmitType(CreateCustomerDto, ['password', 'addresses'] as const)) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCustomerAddressDto)
  addresses?: UpdateCustomerAddressDto[];
}

