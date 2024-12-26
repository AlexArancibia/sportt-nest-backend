import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';

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
  password: string;

  @IsString()
  address: string;
}