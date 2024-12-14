import { IsString, IsInt, IsEmail, IsUUID } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsInt()
  phone: number;

  @IsString()
  address: string;

  @IsUUID()
  storeId: string;  // Relación con la tienda
}
