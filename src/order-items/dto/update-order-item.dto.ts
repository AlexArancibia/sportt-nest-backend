import { IsOptional, IsUUID, IsInt, IsDecimal } from 'class-validator';

export class UpdateOrderItemDto {
  @IsOptional()
  @IsUUID()
  orderId?: string;  // Actualizar relación con la orden

  @IsOptional()
  @IsUUID()
  productId?: string;  // Actualizar relación con el producto

  @IsOptional()
  @IsInt()
  quantity?: number;  // Actualizar cantidad del producto en la orden

  @IsOptional()
  @IsDecimal()
  price?: number;  // Actualizar precio del producto
}
