import {
  IsString,
  IsInt,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsUUID,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentStatus, FulfillmentStatus } from '@prisma/client';

export class CreateOrderItemDto {
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsUUID()
  variantId?: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
}

export class CreateOrderDto {
  @IsUUID()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsEnum(FulfillmentStatus)
  fulfillmentStatus: FulfillmentStatus;

  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  phone: number;

  @IsString()
  address: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discount?: number;

  @IsOptional()
  @IsUUID()
  couponId?: string;

  @IsUUID()
  shippingMethodId: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
