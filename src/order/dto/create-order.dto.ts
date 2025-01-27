import {
  IsString,
  IsOptional,
  IsEnum,
  IsDecimal,
  IsArray,
  ValidateNested,
  IsUUID,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsJSON,
} from "class-validator"
import { Type } from "class-transformer"
import { OrderFinancialStatus, OrderFulfillmentStatus, ShippingStatus } from "@prisma/client"
 

class CreateOrderItemDto {
  @IsUUID()
  productId: string

  @IsOptional()
  @IsUUID()
  variantId?: string

  @IsString()
  title: string

  @IsDecimal()
  @Type(() => Number)
  quantity: number

  @IsDecimal()
  @Type(() => Number)
  price: number

  @IsOptional()
  @IsDecimal()
  @Type(() => Number)
  totalDiscount?: number
}

export class CreateOrderDto {
  @IsOptional()
  @IsUUID()
  customerId?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsPhoneNumber()
  phone?: string

  @IsOptional()
  @IsEnum(OrderFinancialStatus)
  financialStatus?: OrderFinancialStatus

  @IsOptional()
  @IsEnum(OrderFulfillmentStatus)
  fulfillmentStatus?: OrderFulfillmentStatus

  @IsUUID()
  currencyId: string

  @IsDecimal()
  @Type(() => Number)
  totalPrice: number

  @IsDecimal()
  @Type(() => Number)
  subtotalPrice: number

  @IsDecimal()
  @Type(() => Number)
  totalTax: number

  @IsDecimal()
  @Type(() => Number)
  totalDiscounts: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  lineItems: CreateOrderItemDto[]

  @IsOptional()
  @IsUUID()
  shippingAddressId?: string

  @IsOptional()
  @IsUUID()
  billingAddressId?: string

  @IsOptional()
  @IsUUID()
  couponId?: string

  @IsOptional()
  @IsUUID()
  paymentProviderId?: string

  @IsOptional()
  @IsString()
  paymentStatus?: string

  @IsOptional()
  @IsJSON()
  paymentDetails?: Record<string, any>

  @IsOptional()
  @IsUUID()
  shippingMethodId?: string

  @IsOptional()
  @IsEnum(ShippingStatus)
  shippingStatus?: ShippingStatus

  @IsOptional()
  @IsString()
  trackingNumber?: string

  @IsOptional()
  @IsString()
  trackingUrl?: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  estimatedDeliveryDate?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  shippedAt?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deliveredAt?: Date

  @IsOptional()
  @IsString()
  customerNotes?: string

  @IsOptional()
  @IsString()
  internalNotes?: string

  @IsOptional()
  @IsString()
  source?: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  preferredDeliveryDate?: Date
}

