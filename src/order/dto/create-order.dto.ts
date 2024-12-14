import { IsString, IsUUID, IsBoolean, IsOptional, IsInt, IsDecimal } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  storeId: string;  // Relación con la tienda

  @IsUUID()
  customerId: string;  // Relación con el cliente

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;  // Si la orden está pagada o no

  @IsOptional()
  @IsString()
  phone?: string;  // Teléfono del cliente (opcional)

  @IsOptional()
  @IsString()
  address?: string;  // Dirección del cliente (opcional)

  @IsOptional()
  @IsDecimal()
  discount?: number;  // Descuento aplicado a la orden (opcional)
}
