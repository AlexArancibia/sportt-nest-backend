import { IsString, IsUUID, IsInt, IsDecimal } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  orderId: string;  // Relación con la orden

  @IsUUID()
  productId: string;  // Relación con el producto

  @IsInt()
  quantity: number;  // Cantidad del producto en la orden

  @IsDecimal()
  price: number;  // Precio del producto
}
