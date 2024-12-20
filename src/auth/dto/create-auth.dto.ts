import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';  // Asegúrate de que el tipo UserRole está importado correctamente

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;  // Validación para asegurarse de que el rol es uno de los valores definidos en el enum UserRole
}