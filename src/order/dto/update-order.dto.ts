import { IsOptional, IsUUID, IsBoolean, IsInt, IsDecimal, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;  // Actualizar si la orden está pagada o no

  @IsOptional()
  @IsString()
  phone?: string;  // Actualizar teléfono del cliente (opcional)

  @IsOptional()
  @IsString()
  address?: string;  // Actualizar dirección del cliente (opcional)

  @IsOptional()
  @IsDecimal()
  discount?: number;  // Actualizar descuento aplicado a la orden (opcional)

  @IsOptional()
  @IsUUID()
  customerId?: string;  // Actualizar cliente asociado a la orden
}
