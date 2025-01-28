import { OrderFinancialStatus, OrderFulfillmentStatus, ShippingStatus } from '@prisma/client';
import { IsString, IsOptional, IsNumber, IsDecimal, IsDate, IsArray, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsNumber()
  orderNumber: number;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
  
  @IsEnum(OrderFinancialStatus)
  financialStatus: OrderFinancialStatus

  @IsEnum(OrderFulfillmentStatus)
  fulfillmentStatus: OrderFulfillmentStatus

  @IsOptional()
  @IsString()
  currencyId?: string;

  @IsDecimal()
  totalPrice: number;

  @IsDecimal()
  subtotalPrice: number;

  @IsDecimal()
  totalTax: number;

  @IsDecimal()
  totalDiscounts: number;

  @IsArray()
  lineItems: any[]; // Replace with `OrderItemDto[]` if the `OrderItem` DTO is defined

  @IsOptional()
  @IsString()
  shippingAddressId?: string;

  @IsOptional()
  @IsString()
  billingAddressId?: string;

  @IsOptional()
  @IsString()
  couponId?: string;

  @IsOptional()
  @IsString()
  paymentProviderId?: string;

  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  paymentDetails?: object;

  @IsOptional()
  @IsString()
  shippingMethodId?: string;

  @IsEnum(ShippingStatus)
  shippingStatus: ShippingStatus

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsString()
  trackingUrl?: string;

  @IsOptional()
  @IsDate()
  estimatedDeliveryDate?: Date;

  @IsOptional()
  @IsDate()
  shippedAt?: Date;

  @IsOptional()
  @IsDate()
  deliveredAt?: Date;

  @IsOptional()
  @IsString()
  customerNotes?: string;

  @IsOptional()
  @IsString()
  internalNotes?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsDate()
  preferredDeliveryDate?: Date;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
