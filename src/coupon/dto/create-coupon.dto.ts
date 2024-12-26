import { IsString, IsNumber, IsDateString, IsBoolean, IsOptional, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsNumber()
  discount: number;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  conditions?: Record<string, any>;
}

