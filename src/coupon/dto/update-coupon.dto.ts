import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { IsOptional, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  conditions?: Record<string, any>;
}

