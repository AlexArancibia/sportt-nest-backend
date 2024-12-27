import { IsString, IsNumber, IsEnum, IsDate, IsBoolean, IsOptional, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { DiscountType } from '@prisma/client';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsNumber()
  discount: number;

  @IsEnum(DiscountType)
  type: DiscountType;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsObject()
  conditions: Record<string, any>;
}